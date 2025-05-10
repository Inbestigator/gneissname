import {
  editMessage,
  MessageComponentInteraction,
  TextDisplay,
} from "@dressed/dressed";
import { redis } from "@/db";
import {
  disableButtons,
  getTriviaSession,
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
    triviaSession.startedAt < Date.now() - 5 * 60 * 1000
  ) {
    return interaction.editReply("This question has expired!");
  }

  if (responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You have already answered!");
  }

  const isCorrect = answer === triviaSession.correct.id;

  responses.push({
    userId: interaction.user.id,
    isCorrect,
  });

  let updatedComponents = interaction.message.components ?? [];

  if (responses.length >= 15) {
    const { components } = interaction.message;
    if (!components) throw new Error("No components");
    updatedComponents = disableButtons(components, triviaSession.correct.id);
  }

  const numVoted = responses.length;

  const correctPercentage = (
    (responses.filter((a) => a.isCorrect).length / numVoted) *
    100
  ).toFixed(2);
  const incorrectPercentage = (100 - Number(correctPercentage)).toFixed(2);

  const barGraph = "🟩".repeat(Math.round(Number(correctPercentage) / 10)) +
    "🟥".repeat(Math.round(Number(incorrectPercentage) / 10));

  if (updatedComponents[0] && updatedComponents[0].type === 17) {
    updatedComponents[0].components.splice(
      -1,
      1,
      TextDisplay(`## ${barGraph} | ${numVoted}/15`),
    );
  }

  editMessage(interaction.channel.id, interaction.message.id, {
    components: updatedComponents,
  });

  interaction.editReply(
    `## ${isCorrect ? "Correct" : "Nice try"}!\n>>> ${
      !isCorrect ? `### Answer:\n${triviaSession.correct.text}\n` : ""
    }### Explanation:\n${triviaSession.explanation}`,
  );

  const newResponse: TriviaResponse = {
    userId: interaction.user.id,
    isCorrect,
  };

  await redis.set(
    `trivia-response:${interaction.user.id}`,
    JSON.stringify(newResponse),
    { expiration: { type: "EX", value: 300 } },
  );
}
