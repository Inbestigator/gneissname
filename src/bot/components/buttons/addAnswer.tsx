import type { Params } from "@dressed/matcher";
import { Label, type MessageComponentInteraction, TextInput } from "@dressed/react";
import abseil from "abseil";

export const pattern = "addAnswer-:isCorrect-:questionId";

export default function addAnswer(interaction: MessageComponentInteraction, args: Params<typeof pattern>) {
  const isCorrect = args.isCorrect === "true";
  let correct = abseil(interaction.message.components ?? [])
    .initial("TextDisplay") //  Sgt
    .sibling("TextDisplay") //  Qtn
    .sibling("TextDisplay") //  Exp
    .sibling("TextDisplay"); // Cor
  if (!isCorrect) correct = correct.sibling("TextDisplay").sibling("TextDisplay");
  return interaction.showModal(
    <>
      <Label label="Text">
        <TextInput
          custom_id="text"
          value={correct.value.content.replace(isCorrect ? /^Correct: / : /^\d+?\. /, "")}
          required
        />
      </Label>
      <Label label="Emoji (only 1)">
        <TextInput custom_id="emoji" required />
      </Label>
    </>,
    {
      custom_id: `addAnswer-${args.isCorrect}-${args.questionId}`,
      title: `Add ${args.isCorrect ? "the " : "an in"}correct answer`,
    },
  );
}
