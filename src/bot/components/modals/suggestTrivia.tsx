import { ActionRow, Button, createMessage, type ModalInteraction, TextDisplay } from "@dressed/react";

export default async function suggestTrivia(interaction: ModalInteraction) {
  await createMessage(
    "1205195359572328519",
    <>
      <TextDisplay>{interaction.user.id ? `Suggester: <@${interaction.user.id}>` : "Origin: API"}</TextDisplay>
      <TextDisplay>Question: {interaction.getField("question", true).textInput()}</TextDisplay>
      <TextDisplay>Explanation: {interaction.getField("explanation", true).textInput()}</TextDisplay>
      <TextDisplay>Correct: {interaction.getField("true", true).textInput()}</TextDisplay>
      Incorrect:
      {interaction
        .getField("false", true)
        .textInput()
        .split("\n")
        .map((i, n) => (
          <TextDisplay key={i}>
            {n + 1}. {i}
          </TextDisplay>
        ))}
      <ActionRow>
        <Button custom_id="destroy" label="Deny" style="Danger" />
        <Button custom_id="acceptTrivia" label="Accept" style="Success" />
      </ActionRow>
    </>,
  );
  await interaction.reply("Thank you", { ephemeral: true });
}
