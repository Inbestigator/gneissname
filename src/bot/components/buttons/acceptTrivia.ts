import {
  ActionRow,
  Button,
  MessageComponentInteraction,
} from "@dressed/dressed";

export default async function acceptTrivia(
  interaction: MessageComponentInteraction,
) {
  await interaction.update({
    components: [
      ActionRow(
        Button({
          custom_id: "addQuestion",
          label: "Add the question",
        }),
        Button({
          custom_id: "addAnswer",
          label: "Add true answer",
          disabled: true,
          style: "Secondary",
        }),
        Button({
          custom_id: "destroy",
          label: "Done",
          disabled: true,
          style: "Secondary",
        }),
      ),
    ],
  });
}
