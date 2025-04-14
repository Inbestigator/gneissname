import {
  ActionRow,
  Button,
  createMessage,
  ModalSubmitInteraction,
} from "@dressed/dressed";

export default async function suggestTrivia(
  interaction: ModalSubmitInteraction,
) {
  await interaction.deferReply({ ephemeral: true });
  const message = `Suggester: <@${interaction.user.id}>\nQuestion: ${interaction.getField(
    "question",
    true,
  )}\nExplanation: ${interaction.getField(
    "explanation",
    true,
  )}\nCorrect: ${interaction.getField("true", true)}\nIncorrect:\n${interaction
    .getField("false", true)
    .split("\n")
    .map((i) => `> ${i}`)
    .join("\n")}`;
  await createMessage("1205195359572328519", {
    content: message,
    components: [
      ActionRow(
        Button({
          custom_id: "destroy",
          label: "Deny",
          style: "Danger",
        }),
        Button({
          custom_id: "acceptTrivia",
          label: "Accept",
          style: "Success",
        }),
      ),
    ],
  });
  await interaction.editReply({ content: "Thank you" });
}
