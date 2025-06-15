import type { Params } from "@dressed/matcher";
import {
  ActionRow,
  MessageComponentInteraction,
  TextInput,
} from "@dressed/react";

export const pattern = "addAnswer-:isTrue-:questionId";

export default async function addAnswer(
  interaction: MessageComponentInteraction,
  args: Params<typeof pattern>,
) {
  await interaction.showModal(
    <>
      <ActionRow>
        <TextInput custom_id="text" label="Text" required />
      </ActionRow>
      <ActionRow>
        <TextInput custom_id="emoji" label="Emoji (only 1)" required />
      </ActionRow>
    </>,
    {
      custom_id: `addAnswer-${args.isTrue}-${args.questionId}`,
      title: `Add ${args.isTrue} answer`,
    },
  );
}
