import type { Params } from "@dressed/matcher";
import { Label, type MessageComponentInteraction, TextInput } from "@dressed/react";
import abseil from "abseil";

const emoReg = /^`(.+?)` /;

export const pattern = "addAnswer-:isCorrect-:questionId";

export default function addAnswer(interaction: MessageComponentInteraction, args: Params<typeof pattern>) {
  const isCorrect = args.isCorrect === "true";
  let answer = abseil(interaction.message.components ?? [])
    .initial("TextDisplay") //  Usr
    .sibling("TextDisplay") //  Qtn
    .sibling("TextDisplay") //  Exp
    .sibling("TextDisplay"); // Cor
  if (!isCorrect) answer = answer.sibling("TextDisplay").next("TextDisplay") ?? ({ value: { content: "" } } as never);
  const text = answer.value.content.replace(isCorrect ? /^Correct: / : /^\d+?\. /, "");
  const emoji = text.match(emoReg) || [];
  return interaction.showModal(
    <>
      <Label label="Text">
        <TextInput custom_id="text" value={text.replace(emoReg, "")} required />
      </Label>
      <Label label="Emoji (only 1)">
        <TextInput custom_id="emoji" value={emoji[1]} required />
      </Label>
    </>,
    {
      custom_id: `addAnswer-${args.isCorrect}-${args.questionId}`,
      title: `Add ${args.isCorrect ? "the " : "an in"}correct answer`,
    },
  );
}
