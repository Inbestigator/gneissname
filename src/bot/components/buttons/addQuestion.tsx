import { ActionRow, type MessageComponentInteraction, TextInput } from "@dressed/react";
import abseil from "abseil";

export default function addQuestion(interaction: MessageComponentInteraction) {
  const question = abseil(interaction.message.components ?? [])
    .initial("TextDisplay")
    .sibling("TextDisplay");
  return interaction.showModal(
    <>
      <ActionRow>
        <TextInput
          custom_id="question"
          label="What is the trivia question?"
          required
          value={question.value.content.replace(/^Question: /, "")}
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="explanation"
          label="Explanation for the true answer"
          required
          value={question.sibling("TextDisplay").value.content.replace(/^Explanation: /, "")}
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
