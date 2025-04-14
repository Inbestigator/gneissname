import { MessageComponentInteraction } from "@dressed/dressed";
import { openTicket } from "./ticket-open";

export default async function suggestType(
  interaction: MessageComponentInteraction,
) {
  if (interaction.data.component_type !== 3) return;
  const ticketName = interaction.data.values[0] ?? "Unknown";
  const relevantStaff = "<@&1225973068141297757>";
  const thread = await openTicket(
    ticketName,
    undefined,
    relevantStaff,
    interaction.user,
  );
  await interaction.update({ content: `<#${thread.id}>`, components: [] });
}
