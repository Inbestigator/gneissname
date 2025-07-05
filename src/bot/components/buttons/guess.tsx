import { redis } from "@/db";
import {
  markArchived,
  getTriviaSession,
  TriviaResponse,
  TriviaGame,
} from "@/bot/commands/trivia";
import { hash } from "node:crypto";
import { Params } from "@dressed/matcher";
import {
  ActionRow,
  Button,
  editMessage,
  MessageComponentInteraction,
  TextDisplay,
} from "@dressed/react";
import { modCredit } from "@/bot/utils";

export const pattern = "guess-:hashed-:answerId";

export default async function guess(
  interaction: MessageComponentInteraction,
  { answerId, hashed }: Params<typeof pattern>,
) {
  const [{ session, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({ ephemeral: true }),
  ]);
  const isCorrect =
    hash("sha1", answerId, "hex").slice(0, hashed.length) === hashed;

  if (
    session &&
    session.messageId === interaction.message.id &&
    session.expiresAt > Date.now() &&
    responses.length < 10
  ) {
    if (responses.some((a) => a.userId === interaction.user.id)) {
      return interaction.editReply("You have already answered!");
    }

    const newResponse: TriviaResponse = {
      answerId,
      isCorrect,
      userId: interaction.user.id,
      timestamp: Date.now(),
    };

    responses.push(newResponse);

    await Promise.all([
      editMessage(
        interaction.channel.id,
        interaction.message.id,
        <TriviaGame
          game={session.game}
          correctHash={hashed}
          responses={responses}
          isArchived={responses.length >= 10}
        />,
      ),
      interaction.editReply(
        <>
          <TextDisplay>## {isCorrect ? "Correct" : "Nice try"}!</TextDisplay>
          {!isCorrect && (
            <>
              <TextDisplay>### Answer:</TextDisplay>
              {session.correct.text}
            </>
          )}
          <TextDisplay>### Explanation:</TextDisplay>
          {session.game.explanation}
          {session.game.explanation.endsWith("please suggest one!") && (
            <ActionRow>
              <Button
                custom_id={`ticket-open-Answer suggestion-For "${session.correct.id}"`}
                label="Suggest"
                emoji={{ name: "💡" }}
              />
            </ActionRow>
          )}
        </>,
      ),
      redis.set(
        `trivia-response:${interaction.user.id}`,
        JSON.stringify(newResponse),
      ),
      modCredit(
        interaction.user.id,
        Math.round(100 + Math.random() * 100) * (isCorrect ? 1 : -1),
      ),
    ]);
  } else {
    await Promise.all([
      interaction.editReply(
        <>
          <TextDisplay>## {isCorrect ? "Correct" : "Nice try"}!</TextDisplay>
          -# This trivia has expired, so your answer isn{"'"}t counted
        </>,
      ),
      markArchived(interaction.message),
    ]);
  }
}
