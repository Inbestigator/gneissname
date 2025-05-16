import {
  ActionRow,
  CommandConfig,
  CommandInteraction,
  TextInput,
} from "dressed";

export const config: CommandConfig = {
  description: "Suggest a trivia question",
};

export default async function suggest(interaction: CommandInteraction) {
  await interaction.showModal({
    custom_id: "suggestTrivia",
    title: "Suggest a trivia question",
    components: [
      ActionRow(
        TextInput({
          custom_id: "question",
          label: "What is the trivia question?",
          required: true,
          max_length: 100,
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "explanation",
          label: "Explanation for the true answer",
          style: "Paragraph",
          required: true,
          max_length: 500,
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "true",
          label: "True answer",
          max_length: 50,
          required: true,
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "false",
          label: "3 false answers",
          style: "Paragraph",
          max_length: 200,
          required: true,
        }),
      ),
    ],
  });
}
