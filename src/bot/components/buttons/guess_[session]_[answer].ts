import { ActionRow, MessageComponentInteraction } from "@dressed/dressed";
import { APIButtonComponentWithCustomId } from "discord-api-types/v10";
import { prisma } from "@/db";

export default async function guess(
  interaction: MessageComponentInteraction,
  { session, answer }: { session: string; answer: string },
) {
  const triviaSession = await prisma.triviaSession.findFirst({
    orderBy: { startedAt: "desc" },
    include: { trivia: { include: { answers: true } }, responses: true },
  });

  if (!triviaSession || triviaSession.messageId !== interaction.message.id) {
    await interaction.reply({
      content: "This question has expired!",
      ephemeral: true,
    });
    return;
  }

  const correctAnswer = triviaSession.trivia.answers.find((a) => a.correct);

  if (triviaSession.responses.some((a) => a.userId === interaction.user.id)) {
    await interaction.reply({
      content: "You have already answered!",
      ephemeral: true,
    });
    return;
  }

  const isCorrect = answer === correctAnswer?.id;

  const newRes = await prisma.triviaResponse.create({
    data: {
      sessionId: session,
      userId: interaction.user.id,
      isCorrect,
    },
  });

  triviaSession.responses.push(newRes);

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

  await interaction.update({
    content: interaction.message.content.replace(
      /[⬛️🟥🟩]+\s\|.+/,
      `${barGraph} | ${numVoted}/15`,
    ),
    components: [ActionRow(...updatedButtons)],
  });

  await interaction.followUp({
    content: `## ${isCorrect ? "Correct" : "Nice try"}!\n>>> ${
      !isCorrect ? `### Answer:\n${correctAnswer?.text}\n` : ""
    }### Explanation:\n${triviaSession.trivia.explanation}`,
    ephemeral: true,
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
