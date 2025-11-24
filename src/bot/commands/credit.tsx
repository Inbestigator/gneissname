import type { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { cache } from "@/db";

export const config = {
  description: "View your current social credit score",
} satisfies CommandConfig;

export default async function credit(interaction: CommandInteraction) {
  const [{ credit }] = await Promise.all([
    cache.getDBUser(interaction.user.id),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply(`Your current social credit is **${credit.toLocaleString()}**!`);
}
