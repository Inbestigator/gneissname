import { ActionRow, Button, type ModalSubmitInteraction, reconstructElementTree } from "@dressed/react";
import abseil from "abseil";
import type { APIMessageTopLevelComponent } from "discord-api-types/v10";
import { prisma } from "@/db";

export default async function addQuestion(interaction: ModalSubmitInteraction) {
  const components = interaction.message?.components ?? [];
  let button = abseil(components).find("addQuestion", "Button");
  while (button) {
    button.update({ disabled: true });
    button = button.next("Button");
  }
  const [triviaQ] = await Promise.all([
    prisma.trivia.create({
      data: {
        question: interaction.getField("question", true).textInput(),
        explanation: interaction.getField("explanation", true).textInput(),
      },
    }),
    interaction.update(reconstructElementTree(components)),
  ]);
  await interaction.editReply(
    <ProposalStage components={interaction.message?.components} id={triviaQ.id} isCorrect stage="addAnswer" />,
  );
}

export function ProposalStage({
  id,
  isCorrect,
  stage,
  components = [],
}: Readonly<{
  stage: "addQuestion" | "addAnswer" | "done";
  isCorrect: boolean;
  id: number | string;
  components?: APIMessageTopLevelComponent[];
}>) {
  return (
    <>
      {reconstructElementTree(components.slice(0, -1))}
      <ActionRow>
        <Button
          custom_id="addQuestion"
          label="Add the question"
          disabled={stage !== "addQuestion"}
          style={stage === "addQuestion" ? "Primary" : "Secondary"}
        />
        <Button
          custom_id={`addAnswer-${isCorrect}-${id}`}
          label={`Add ${isCorrect} answer`}
          style={stage === "addAnswer" ? "Primary" : "Secondary"}
          disabled={stage !== "addAnswer"}
        />
        <Button
          custom_id="destroy"
          label="Done"
          disabled={stage !== "done"}
          style={stage === "done" ? "Success" : "Secondary"}
        />
      </ActionRow>
    </>
  );
}
