import { ActionRow, MessageComponentInteraction, TextInput } from "dressed";

export default async function addAnswer(
  interaction: MessageComponentInteraction,
  args: {
    isTrue: string;
    questionId: string;
  },
) {
  await interaction.showModal({
    custom_id: `addAnswer_${interaction.message.id}_${args.isTrue}_${args.questionId}`,
    title: `Add ${args.isTrue} answer`,
    components: [
      ActionRow(
        TextInput({
          custom_id: "text",
          label: "Text",
          required: true,
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "emoji",
          label: "Emoji (only 1)",
          required: true,
        }),
      ),
    ],
  });
}
