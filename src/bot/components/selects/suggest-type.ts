import type { ComponentInteraction } from "@dressed/react";
import { openTicket } from "./ticket-open";

export default async function suggestType(interaction: ComponentInteraction<"StringSelect">) {
  const ticketName = interaction.values[0];
  const thread = await openTicket(
    interaction.user,
    ticketName,
    undefined,
    ticketName === "Video idea" ? ["490924235234213929"] : undefined,
  );
  await interaction.update(`<#${thread.id}>`);
}
