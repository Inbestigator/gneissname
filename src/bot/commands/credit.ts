import { getCredit } from "@/bot/utils";
import { CommandConfig, CommandInteraction } from "@dressed/dressed";

export const config: CommandConfig = {
  description: "View your current social credit score",
};

export default async function credit(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });
  const credit = await getCredit(interaction.user.id);
  await interaction.editReply(
    `Your current social credit is **${credit.toLocaleString()}**!`,
  );
}
