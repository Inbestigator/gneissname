import {
  type MessageComponentInteraction,
  Container,
  createMessage,
  modifyChannel,
  TextDisplay,
} from "dressed";
import { openTicket } from "../selects/ticket-open";
import { Params } from "@dressed/matcher";

export const pattern = "ticket-:action(close|open){-:ticketName{-:message}}";

export default async function ticketButton(
  interaction: MessageComponentInteraction,
  args: Params<typeof pattern>,
) {
  if (args.action === "open") {
    const { ticketName = "Unknown", message } = args;
    const thread = await openTicket(
      ticketName,
      message,
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
