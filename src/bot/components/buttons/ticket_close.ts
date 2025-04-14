import {
  createMessage,
  type MessageComponentInteraction,
  modifyChannel,
} from "@dressed/dressed";

export default async function closeTicket(
  interaction: MessageComponentInteraction,
) {
  await interaction.update({
    embeds: [
      {
        title: "Ticket closed",
        description: `Closed by ${interaction.user.username}`,
      },
    ],
    components: [],
  });
  await createMessage(
    interaction.channel.id,
    `> Closed by ${interaction.user.username}`,
  );
  await modifyChannel(interaction.channel.id, {
    name: `[Solved] ${interaction.channel.name}`,
    archived: true,
    locked: true,
  });
}
