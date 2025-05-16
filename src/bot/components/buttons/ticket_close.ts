import {
  Container,
  createMessage,
  type MessageComponentInteraction,
  modifyChannel,
  TextDisplay,
} from "dressed";

export default async function closeTicket(
  interaction: MessageComponentInteraction,
) {
  interaction.update({
    components: [
      Container(
        TextDisplay("## Ticket closed"),
        TextDisplay(`Closed by ${interaction.user.username}`),
      ),
    ],
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
