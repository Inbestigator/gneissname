import {
  ActionRow,
  Button,
  editMessage,
  MessageComponentInteraction,
  Separator,
  TextDisplay,
} from "dressed";
import { redis } from "@/db";
import {
  markArchived,
  getResponsesSection,
  getTriviaSession,
  ResponsesSection,
  TriviaResponse,
} from "@/bot/commands/trivia";
import { createHash } from "node:crypto";
import { MessageFlags } from "discord-api-types/v10";

export const pattern = "guess-(:depAnswerId,:depHashed|:hashed-:answerId)";

export default async function guess(
  interaction: MessageComponentInteraction,
  args:
    | { answerId: string; hashed: string }
    | { depAnswerId: string; depHashed: string },
) {
  console.log(args, "answerId" in args);
  const { answerId, hashed } =
    "answerId" in args
      ? args
      : { answerId: args.depAnswerId, hashed: args.depHashed };
  const [{ session: triviaSession, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({
      ephemeral: true,
      flags: MessageFlags.IsComponentsV2,
    }),
  ]);
  const isCorrect =
    createHash("sha1")
      .update(answerId)
      .digest("hex")
      .slice(0, hashed.length) === hashed;

  if (
    triviaSession &&
    triviaSession.messageId === interaction.message.id &&
    triviaSession.expiresAt > Date.now()
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

    let updatedComponents = interaction.message.components ?? [];

    if (updatedComponents[0] && updatedComponents[0].type === 17) {
      const responseSection = getResponsesSection(updatedComponents);
      const newSection = ResponsesSection(responses, triviaSession.answerIds);
      responseSection.components = newSection.components;
      responseSection.accessory = newSection.accessory;
    }

    if (responses.length >= 15) {
      updatedComponents = markArchived(updatedComponents);
    }

    await Promise.all([
      editMessage(interaction.channel.id, interaction.message.id, {
        components: updatedComponents,
      }),
      interaction.editReply({
        content: `## ${isCorrect ? "Correct" : "Nice try"}!\n>>> ${
          !isCorrect ? `### Answer:\n${triviaSession.correct.text}\n` : ""
        }### Explanation:\n${triviaSession.explanation}`,
        components:
          triviaSession.explanation ===
          "This question has no explanation yet, please suggest one!"
            ? [
                ActionRow(
                  Button({
                    custom_id: `ticket-open-Answer suggestion-For "${triviaSession.correct.id}"`,
                    label: "Suggest",
                    emoji: {
                      name: "💡",
                    },
                  }),
                ),
              ]
            : [],
      }),
      redis.set(
        `trivia-response:${interaction.user.id}`,
        JSON.stringify(newResponse),
        { expiration: { type: "PXAT", value: triviaSession.expiresAt } },
      ),
    ]);
  } else {
    await Promise.all([
      interaction.editReply({
        components: [
          ...("depAnswerId" in args
            ? [
                TextDisplay(
                  "## This version of trivia is being phased out and will not work soon!",
                ),
                Separator(),
              ]
            : []),
          TextDisplay(`## ${isCorrect ? "Correct" : "Nice try"}!`),
          TextDisplay(
            "-# This trivia has expired, so your answer isn't counted",
          ),
        ],
      }),
      editMessage(interaction.channel.id, interaction.message.id, {
        components: markArchived(interaction.message.components ?? []),
      }),
    ]);
  }
}
