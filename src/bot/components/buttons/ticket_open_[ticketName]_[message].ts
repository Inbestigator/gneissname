import type { MessageComponentInteraction } from "dressed";
import { openTicket } from "../selects/ticket-open";

export default async function openTicketButton(
  interaction: MessageComponentInteraction,
  { ticketName, message }: { ticketName: string; message: string },
) {
  const thread = await openTicket(
    ticketName !== "null" ? ticketName : "Unknown",
    message !== "null" ? message : undefined,
    undefined,
    interaction.user,
  );
  await interaction.reply({ content: `<#${thread.id}>`, ephemeral: true });
}
