import {
  type MessageComponentInteraction,
  Container,
  createMessage,
  modifyChannel,
  TextDisplay,
} from "dressed";
import { openTicket } from "../selects/ticket-open";

export const pattern = "ticket-:action(close|open){-:ticketname{-:message}}";

export default async function ticketButton(
  interaction: MessageComponentInteraction,
  args:
    | { action: "close" }
    | { action: "open"; ticketname: string; message: string },
) {
  if (args.action === "open") {
    const { ticketname, message } = args;
    const thread = await openTicket(
      ticketname !== "null" ? ticketname : "Unknown",
      message !== "null" ? message : undefined,
      undefined,
      interaction.user,
    );
    await interaction.reply({ content: `<#${thread.id}>`, ephemeral: true });
  } else if (args.action === "close") {
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
}
