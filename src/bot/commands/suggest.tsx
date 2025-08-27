import { ActionRow, CommandInteraction, TextInput } from "@dressed/react";
import { CommandConfig } from "dressed";

export const config: CommandConfig = {
  description: "Suggest a trivia question",
};

export default function suggest(interaction: CommandInteraction) {
  return interaction.showModal(
    <>
      <ActionRow>
        <TextInput
          custom_id="question"
          label="What is the trivia question?"
          required
          max_length={100}
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="explanation"
          label="Explanation for the true answer"
          style="Paragraph"
          required
          max_length={500}
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="true"
          label="True answer"
          required
          max_length={50}
        />
      </ActionRow>
      <ActionRow>
        <TextInput
          custom_id="false"
          label="3 false answers"
          style="Paragraph"
          required
          max_length={200}
        />
      </ActionRow>
    </>,
    {
      custom_id: "suggestTrivia",
      title: "Suggest a trivia question",
    },
  );
}
