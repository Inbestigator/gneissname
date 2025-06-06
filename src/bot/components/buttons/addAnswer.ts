import { ActionRow, MessageComponentInteraction, TextInput } from "dressed";
import type { Params } from "@dressed/matcher";

export const pattern = "addAnswer-:isTrue-:questionId";

export default async function addAnswer(
  interaction: MessageComponentInteraction,
  args: Params<typeof pattern>,
) {
  await interaction.showModal({
    custom_id: `addAnswer-${interaction.message.id}-${args.isTrue}-${args.questionId}`,
    title: `Add ${args.isTrue} answer`,
    components: [
      ActionRow(
        TextInput({
          custom_id: "text",
          label: "Text",
          required: true,
        }),
      ),
      ActionRow(
        TextInput({
          custom_id: "emoji",
          label: "Emoji (only 1)",
          required: true,
        }),
      ),
    ],
  });
}
