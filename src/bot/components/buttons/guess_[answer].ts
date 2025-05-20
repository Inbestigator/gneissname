import {
  ActionRow,
  Button,
  editMessage,
  MessageComponentInteraction,
} from "dressed";
import { redis } from "@/db";
import {
  disableButtons,
  getTriviaSession,
  ResponsesSection,
  TriviaResponse,
} from "@/bot/commands/trivia";

export default async function guess(
  interaction: MessageComponentInteraction,
  { answer }: { answer: string },
) {
  const [{ session: triviaSession, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({ ephemeral: true }),
  ]);

  if (
    !triviaSession ||
    triviaSession.messageId !== interaction.message.id ||
    triviaSession.expiresAt < Date.now()
  ) {
    if (
      triviaSession &&
      triviaSession.expiresAt < Date.now() &&
      interaction.message.components
    ) {
      editMessage(interaction.channel.id, interaction.message.id, {
        components: disableButtons(
          interaction.message.components,
          triviaSession.correct.id,
        ),
      });
    }
    return interaction.editReply("This question has expired!");
  }

  if (responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You have already answered!");
  }

  const isCorrect = answer === triviaSession.correct.id;

  const newResponse: TriviaResponse = {
    answerId: answer,
    isCorrect,
    userId: interaction.user.id,
  };

  responses.push(newResponse);

  let updatedComponents = interaction.message.components ?? [];

  if (updatedComponents[0] && updatedComponents[0].type === 17) {
    updatedComponents[0].components.splice(-1, 1, ResponsesSection(responses));
  }

  if (responses.length >= 15) {
    updatedComponents = disableButtons(
      updatedComponents,
      triviaSession.correct.id,
    );
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
                  custom_id: `ticket_open_Answer suggestion_For "${triviaSession.correct.id}"`,
                  label: "Suggest",
                  emoji: {
                    name: "➕",
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
}
