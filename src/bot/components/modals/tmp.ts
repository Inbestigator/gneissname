import type { ModalSubmitInteraction } from "@dressed/react";

export default function tmpModal(interaction: ModalSubmitInteraction) {
  return interaction.deferUpdate();
}
