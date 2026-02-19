import type { MessageComponentInteraction } from "@dressed/react";
import { ProposalStage } from "../modals/addQuestion";

export default function acceptTrivia(interaction: MessageComponentInteraction) {
  return interaction.update(
    <ProposalStage components={interaction.message.components} id="null" isCorrect stage="addQuestion" />,
  );
}
