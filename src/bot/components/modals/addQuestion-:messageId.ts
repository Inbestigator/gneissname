import { prisma } from "@/db";
import {
  ActionRow,
  Button,
  editMessage,
  ModalSubmitInteraction,
} from "dressed";

export default async function addQuestion(
  interaction: ModalSubmitInteraction,
  args: {
    messageId: string;
  },
) {
  await interaction.deferUpdate();
  const triviaQ = await prisma.trivia.create({
    data: {
      question: interaction.getField("question", true),
      explanation: interaction.getField("explanation", true),
    },
  });
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
          custom_id: `addAnswer-true-${triviaQ.id}`,
          label: "Add true answer",
          style: "Primary",
        }),
        Button({
          custom_id: "destroy",
          label: "Done",
          disabled: true,
          style: "Secondary",
        }),
      ),
    ],
  });
}
