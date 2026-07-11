import { type ComponentInteraction, deleteMessage } from "dressed";

export default function destroy(interaction: ComponentInteraction) {
  return deleteMessage(interaction.channel.id, interaction.message.id);
}
