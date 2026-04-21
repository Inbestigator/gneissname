import { type CommandInteraction, Label, TextInput } from "@dressed/react";
import type { CommandConfig } from "dressed";

export const config = {
  description: "Suggest a trivia question",
} satisfies CommandConfig;

export default function suggest(interaction: CommandInteraction) {
  return interaction.showModal(
    <>
      <Label label="What is the trivia question?">
        <TextInput custom_id="question" max_length={100} required />
      </Label>
      <Label label="Explanation for the true answer">
        <TextInput custom_id="explanation" style="Paragraph" max_length={500} required />
      </Label>
      <Label label="True answer">
        <TextInput custom_id="true" max_length={50} required />
      </Label>
      <Label label="3 false answers">
        <TextInput custom_id="false" placeholder={"Foo\nBar\nBaz"} style="Paragraph" max_length={200} required />
      </Label>
    </>,
    { custom_id: "suggestTrivia", title: "Suggest a trivia question" },
  );
}
