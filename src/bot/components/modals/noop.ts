import type { ModalInteraction } from "@dressed/react";

export default function tmpModal(interaction: ModalInteraction) {
  return interaction.deferUpdate();
}
