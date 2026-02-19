import { deleteMessage, type MessageComponentInteraction } from "dressed";

export default function destroy(interaction: MessageComponentInteraction) {
  return deleteMessage(interaction.channel.id, interaction.message.id);
}
