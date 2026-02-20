import { hash } from "node:crypto";
import type { Params } from "@dressed/matcher";
import { ActionRow, Button, editMessage, type MessageComponentInteraction } from "@dressed/react";
import { getTriviaSession, markArchived, TriviaGame, type TriviaResponse } from "@/bot/commands/trivia";
import { modCredit } from "@/bot/utils";
import { redis } from "@/db";

export const pattern = "guess-:hashed-:answerId";

export default async function guess(
  interaction: MessageComponentInteraction,
  { answerId, hashed }: Params<typeof pattern>,
) {
  const [{ session, responses }] = await Promise.all([getTriviaSession(), interaction.deferReply({ ephemeral: true })]);
  const isCorrect = hash("sha1", answerId, "hex").startsWith(hashed);

  if (session?.messageId === interaction.message.id && session.expiresAt > Date.now() && responses.length < 10) {
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
          correctHash={session.correct.hashed}
          responses={responses}
          isArchived={responses.length >= 10}
        />,
      ),
      interaction.editReply(
        <>
          ## {isCorrect ? "Correct" : "Nice try"}!{"\n"}
          {!isCorrect && (
            <>
              ### Answer:{"\n"}
              {session.correct.text}
              {"\n"}
            </>
          )}
          ### Explanation:{"\n"}
          {session.game.explanation}
          {session.game.explanation.endsWith("please suggest one!") && (
            <ActionRow>
              <Button
                custom_id={`ticket-open-Answer suggestion-For "${session.correct.id}"@761777382041714690`}
                label="Suggest"
                emoji={{ name: "💡" }}
              />
            </ActionRow>
          )}
        </>,
      ),
      redis.set(`trivia-response:${interaction.user.id}`, JSON.stringify(newResponse)),
      modCredit(interaction.user.id, (100 + Math.random() * 100) * (isCorrect ? 1 : -1), `trivia:${session.messageId}`),
    ]);
  } else {
    await Promise.all([
      interaction.editReply(
        <>
          ## {isCorrect ? "Correct" : "Nice try"}!{"\n"}
          -# This trivia has expired, so your answer isn&apos;t counted
        </>,
      ),
      markArchived(interaction.message),
    ]);
  }
}
