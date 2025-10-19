import { cache } from "@/db";
import { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";

export const config: CommandConfig = {
  description: "View your current social credit score",
};

export default async function credit(interaction: CommandInteraction) {
  const [credit] = await Promise.all([
    cache.getCredit(interaction.user.id),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply(
    `Your current social credit is **${credit.toLocaleString()}**!`,
  );
}
