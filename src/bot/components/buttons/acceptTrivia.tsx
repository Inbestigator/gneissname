import { MessageComponentInteraction } from "@dressed/react";
import { ProposalStage } from "../modals/addQuestion";

export default async function acceptTrivia(
  interaction: MessageComponentInteraction,
) {
  await interaction.update(
    <ProposalStage
      components={interaction.message.components}
      id="null"
      isCorrect
      stage="addQuestion"
    />,
  );
}
