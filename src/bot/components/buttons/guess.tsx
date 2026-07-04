import { hash } from "node:crypto";
import type { Params } from "@dressed/matcher";
import { Button, editMessage, type MessageComponentInteraction, Section } from "@dressed/react";
import { createAppEmoji } from "dressed";
import { Fragment } from "react";
import startTrivia, { getTriviaSession, markArchived, TriviaGame, type TriviaResponse } from "@/bot/commands/trivia";
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

    const ExplanationWrapper = session.game.explanation.endsWith("please suggest one!") ? Section : Fragment;

    const editPromise = interaction.editReply(
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
        <ExplanationWrapper
          accessory={
            <Button
              custom_id={`ticket-open-Answer suggestion-For "${session.correct.id}"@761777382041714690`}
              label="Suggest"
              emoji={{ name: "💡" }}
            />
          }
        >
          {session.game.explanation}
        </ExplanationWrapper>
      </>,
    );

    const { id: emoji } = await fetch(
      `https://wsrv.nl/?url=https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}&w=128&mask=circle&tint=${isCorrect ? "blue" : "red"}&bg=${isCorrect ? "lightblue" : "lightsalmon"}&encoding=base64`,
    ).then(async (r) =>
      createAppEmoji({ image: await r.text(), name: hash("md5", `${interaction.user.id}:${session.messageId}`) }),
    );

    const newResponse: TriviaResponse = {
      answerId,
      isCorrect,
      userId: interaction.user.id,
      timestamp: Date.now(),
      emoji,
    };

    responses.push(newResponse);

    return Promise.all([
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
      editPromise,
      redis.set(`trivia-response:${interaction.user.id}`, JSON.stringify(newResponse)),
      modCredit(
        interaction.user.id,
        (100 + Math.random() * 100) * (isCorrect ? 1 : -1),
        `trivia:${session.channelId}/${session.messageId}`,
      ),
      // @ts-expect-error
      responses.length >= 10 && startTrivia({ ...interaction, deferReply() {}, editReply() {} }),
    ]);
  } else {
    return Promise.all([
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
