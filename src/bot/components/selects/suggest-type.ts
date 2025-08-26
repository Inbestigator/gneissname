import { MessageComponentInteraction } from "@dressed/react";
import { openTicket } from "./ticket-open";

export default async function suggestType(
  interaction: MessageComponentInteraction,
) {
  if (interaction.data.component_type !== 3) return;
  const ticketName = interaction.data.values[0] ?? "Unknown";
  const thread = await openTicket(
    ticketName,
    undefined,
    ["1225973068141297757"],
    interaction.user,
  );
  await interaction.update(`<#${thread.id}>`);
}
