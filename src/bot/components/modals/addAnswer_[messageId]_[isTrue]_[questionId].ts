import { prisma } from "@/db";
import {
  ActionRow,
  Button,
  editMessage,
  ModalSubmitInteraction,
} from "@dressed/dressed";

export default async function addAnswer(
  interaction: ModalSubmitInteraction,
  args: {
    isTrue: string;
    questionId: string;
    messageId: string;
  },
) {
  await interaction.deferUpdate();
  const triviaQ = await prisma.trivia.findUnique({
    where: {
      id: Number(args.questionId),
    },
    include: {
      answers: true,
    },
  });

  if (!triviaQ) return;

  await prisma.trivia.update({
    where: {
      id: Number(args.questionId),
    },
    data: {
      answers: {
        create: {
          text: interaction.getField("text", true),
          emoji: interaction.getField("emoji", true),
          correct: args.isTrue == "true",
        },
      },
    },
  });

  const isLast = triviaQ.answers.length === 3;

  await editMessage(interaction.channel?.id ?? "", args.messageId, {
    content: interaction.message?.content,
    components: [
      ActionRow(
        Button({
          custom_id: "addQuestion",
          label: "Add the question",
          disabled: true,
          style: "Secondary",
        }),
        Button({
          custom_id: `addAnswer_false_${args.questionId}`,
          label: "Add false answer",
          disabled: isLast,
          style: isLast ? "Secondary" : "Primary",
        }),
        Button({
          custom_id: "destroy",
          label: "Done",
          disabled: !isLast,
          style: isLast ? "Success" : "Secondary",
        }),
      ),
    ],
  });
}
