import {
  ActionRow,
  MessageComponentInteraction,
  TextInput,
} from "@dressed/react";

export default async function addQuestion(
  interaction: MessageComponentInteraction,
) {
  await interaction.showModal(
    <>
      <ActionRow>
        <TextInput
          custom_id="question"
          label="What is the trivia question?"
          required
          value={
            (interaction.message.content.split("Question: ")[1] ?? "").split(
              "\n",
            )[0]
          }
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="explanation"
          label="Explanation for the true answer"
          required
          value={
            (interaction.message.content.split("Explanation: ")[1] ?? "").split(
              "\n",
            )[0]
          }
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
