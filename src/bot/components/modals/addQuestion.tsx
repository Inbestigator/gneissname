import { prisma } from "@/db";
import { ActionRow, Button, ModalSubmitInteraction } from "@dressed/react";
import { APIMessageTopLevelComponent } from "discord-api-types/v10";

export default async function addQuestion(interaction: ModalSubmitInteraction) {
  const [triviaQ] = await Promise.all([
    prisma.trivia.create({
      data: {
        question: interaction.getField("question", true),
        explanation: interaction.getField("explanation", true),
      },
    }),
    interaction.deferUpdate(),
  ]);
  await interaction.editReply(
    <ProposalStage
      components={interaction.message?.components}
      id={triviaQ.id}
      isCorrect
      stage="addAnswer"
    />,
  );
}

export function ProposalStage({
  id,
  isCorrect,
  stage,
  components,
}: {
  stage: "addQuestion" | "addAnswer" | "done";
  isCorrect: boolean;
  id: number | string;
  components?: APIMessageTopLevelComponent[];
}) {
  return (
    <>
      {components?.[0].type === 10 && components[0].content}
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
