import { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { getCredit } from "../utils";

export const config: CommandConfig = {
  description: "View your current social credit score",
};

export default async function credit(interaction: CommandInteraction) {
  const [credit] = await Promise.all([
    getCredit(interaction.user.id),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply(
    `Your current social credit is **${credit.toLocaleString()}**!`,
  );
}
