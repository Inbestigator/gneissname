import {
  ActionRow,
  MessageComponentInteraction,
  TextInput,
} from "@dressed/dressed";

export default async function addQuestion(
  interaction: MessageComponentInteraction,
) {
  await interaction.showModal({
    custom_id: `addQuestion_${interaction.message.id}`,
    title: "Add question",
    components: [
      ActionRow(
        TextInput({
          custom_id: "question",
          label: "What is the trivia question?",
          required: true,
          value: (
            interaction.message.content.split("Question: ")[1] ?? ""
          ).split("\n")[0],
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "explanation",
          label: "Explanation for the true answer",
          required: true,
          value: (
            interaction.message.content.split("Explanation: ")[1] ?? ""
          ).split("\n")[0],
          style: "Paragraph",
        }),
      ),
    ],
  });
}
