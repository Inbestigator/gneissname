import type { Params } from "@dressed/matcher";
import { Label, type MessageComponentInteraction, TextInput } from "@dressed/react";

export const pattern = "addAnswer-:isTrue-:questionId";

export default function addAnswer(interaction: MessageComponentInteraction, args: Params<typeof pattern>) {
  return interaction.showModal(
    <>
      <Label label="Text">
        <TextInput custom_id="text" required />
      </Label>
      <Label label="Emoji (only 1)">
        <TextInput custom_id="emoji" required />
      </Label>
    </>,
    { custom_id: `addAnswer-${args.isTrue}-${args.questionId}`, title: `Add ${args.isTrue} answer` },
  );
}
