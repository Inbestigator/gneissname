import type { Params } from "@dressed/matcher";
import { Container, type MessageComponentInteraction, TextDisplay } from "@dressed/react";
import { createMessage, modifyChannel } from "dressed";
import { openTicket } from "../selects/ticket-open";

export const pattern = "ticket-:action(close|open){-:ticketName{-:message}{-:staff((&?\\d+,?)*)}}";

export default async function ticketButton(interaction: MessageComponentInteraction, args: Params<typeof pattern>) {
  if (args.action === "open") {
    const { ticketName = "Unknown", message, staff } = args;
    const thread = await openTicket(ticketName, message, staff?.split(","), interaction.user);
    await interaction.reply(`<#${thread.id}>`, { ephemeral: true });
  } else if (args.action === "close") {
    interaction.update(
      <Container>
        <TextDisplay>### Ticket closed</TextDisplay>
        Closed by {interaction.user.username}
      </Container>,
    );
    await createMessage(interaction.channel.id, `> Closed by ${interaction.user.username}`);
    await modifyChannel(interaction.channel.id, {
      name: `[Solved] ${interaction.channel.name}`,
      archived: true,
      locked: true,
    });
  }
}
