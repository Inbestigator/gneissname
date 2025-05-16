import { deleteMessage, MessageComponentInteraction } from "dressed";

export default async function destroy(
  interaction: MessageComponentInteraction,
) {
  await deleteMessage(interaction.channel.id, interaction.message.id);
}
