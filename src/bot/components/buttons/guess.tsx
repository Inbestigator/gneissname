import { redis } from "@/db";
import {
  markArchived,
  getTriviaSession,
  TriviaResponse,
  TriviaGame,
} from "@/bot/commands/trivia";
import { createHash } from "node:crypto";
import { Params } from "@dressed/matcher";
import { editMessage as dressedEditMessage } from "dressed";
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
    createHash("sha1")
      .update(answerId)
      .digest("hex")
      .slice(0, hashed.length) === hashed;

  if (
    session &&
    session.messageId === interaction.message.id &&
    session.expiresAt > Date.now()
  ) {
    if (responses.some((a) => a.userId === interaction.user.id)) {
      return interaction.editReply("You have already answered!");
    }

    const newResponse: TriviaResponse = {
      answerId,
      isCorrect,
      userId: interaction.user.id,
    };

    responses.push(newResponse);

    await Promise.all([
      editMessage(
        interaction.channel.id,
        interaction.message.id,
        <TriviaGame
          session={session}
          responses={responses}
          isArchived={responses.length >= 15}
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
        { expiration: { type: "PXAT", value: session.expiresAt } },
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
      dressedEditMessage(interaction.channel.id, interaction.message.id, {
        components: markArchived(interaction.message.components ?? []),
      }),
    ]);
  }
}
