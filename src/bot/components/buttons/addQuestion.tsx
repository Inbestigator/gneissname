import {
  ActionRow,
  MessageComponentInteraction,
  TextInput,
} from "@dressed/react";

export default async function addQuestion(
  interaction: MessageComponentInteraction,
) {
  const content =
    interaction.message.components?.[0].type === 10
      ? interaction.message.components[0].content
      : "";
  await interaction.showModal(
    <>
      <ActionRow>
        <TextInput
          custom_id="question"
          label="What is the trivia question?"
          required
          value={(content.split("Question: ")[1] ?? "").split("\n")[0]}
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="explanation"
          label="Explanation for the true answer"
          required
          value={(content.split("Explanation: ")[1] ?? "").split("\n")[0]}
          style="Paragraph"
        />
      </ActionRow>
    </>,
    {
      custom_id: "addQuestion",
      title: "Add question",
    },
  );
}
