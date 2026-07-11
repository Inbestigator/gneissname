import type { ComponentInteraction } from "@dressed/react";
import { ProposalStage } from "../modals/addQuestion";

export default function acceptTrivia(interaction: ComponentInteraction) {
  return interaction.update(
    <ProposalStage components={interaction.message.components} id="null" isCorrect stage="addQuestion" />,
  );
}
