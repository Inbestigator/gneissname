import {
  ActionRow,
  editMessage,
  MessageComponentInteraction,
} from "@dressed/dressed";
import { APIButtonComponentWithCustomId } from "discord-api-types/v10";
import { prisma } from "@/db";

export default async function guess(
  interaction: MessageComponentInteraction,
  { session, answer }: { session: string; answer: string },
) {
  const [triviaSession] = await Promise.all([
    prisma.triviaSession.findFirst({
      orderBy: { startedAt: "desc" },
      include: { trivia: { include: { answers: true } }, responses: true },
    }),
    interaction.deferReply({ ephemeral: true }),
  ]);

  if (!triviaSession || triviaSession.messageId !== interaction.message.id) {
    return interaction.editReply("This question has expired!");
  }

  const correctAnswer = triviaSession.trivia.answers.find((a) => a.correct);

  if (triviaSession.responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You have already answered!");
  }

  const isCorrect = answer === correctAnswer?.id;

  triviaSession.responses.push({
    id: Math.random().toString(),
    userId: interaction.user.id,
    isCorrect,
    sessionId: session,
  });

  let updatedButtons = interaction.message.components![0]!
    .components as APIButtonComponentWithCustomId[];

  if (triviaSession.responses.length >= 15) {
    prisma.triviaSession.delete({ where: { id: session } });
    updatedButtons = disableButtons(updatedButtons, correctAnswer?.id ?? "");
  }

  const numVoted = triviaSession.responses.length;

  const correctPercentage = (
    (triviaSession.responses.filter((a) => a.isCorrect).length / numVoted) *
    100
  ).toFixed(2);
  const incorrectPercentage = (100 - Number(correctPercentage)).toFixed(2);

  const barGraph =
    "🟩".repeat(Math.round(Number(correctPercentage) / 10)) +
    "🟥".repeat(Math.round(Number(incorrectPercentage) / 10));

  editMessage(interaction.channel.id, interaction.message.id, {
    content: interaction.message.content.replace(
      /[⬛️🟥🟩]+\s\|.+/,
      `${barGraph} | ${numVoted}/15`,
    ),
    components: [ActionRow(...updatedButtons)],
  });

  interaction.editReply(
    `## ${isCorrect ? "Correct" : "Nice try"}!\n>>> ${
      !isCorrect ? `### Answer:\n${correctAnswer?.text}\n` : ""
    }### Explanation:\n${triviaSession.trivia.explanation}`,
  );

  await prisma.triviaResponse.create({
    data: {
      sessionId: session,
      userId: interaction.user.id,
      isCorrect,
    },
  });
}

export function disableButtons(
  buttons: APIButtonComponentWithCustomId[],
  correct: string,
) {
  return buttons.map((button) => ({
    ...button,
    style: button.custom_id.endsWith(correct) ? 3 : 4,
    disabled: true,
    custom_id: (button as { custom_id: string }).custom_id,
  }));
}
