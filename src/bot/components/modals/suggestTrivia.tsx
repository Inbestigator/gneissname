import {
  ActionRow,
  Button,
  createMessage,
  ModalSubmitInteraction,
} from "@dressed/react";

export default async function suggestTrivia(
  interaction: ModalSubmitInteraction,
) {
  const message = `Suggester: <@${interaction.user.id}>\nQuestion: ${interaction
    .getField("question", true)
    .textInput()}\nExplanation: ${interaction
    .getField("explanation", true)
    .textInput()}\nCorrect: ${interaction.getField("true", true)}\nIncorrect:\n${interaction
    .getField("false", true)
    .textInput()
    .split("\n")
    .map((i) => `> ${i}`)
    .join("\n")}`;
  await createMessage(
    "1205195359572328519",
    <>
      {message}
      <ActionRow>
        <Button custom_id="destroy" label="Deny" style="Danger" />
        <Button custom_id="acceptTrivia" label="Accept" style="Success" />
      </ActionRow>
    </>,
  );
  await interaction.reply("Thank you", { ephemeral: true });
}
