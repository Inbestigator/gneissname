import { modCredit } from "@/bot/utils";
import { CommandConfig, CommandInteraction } from "@dressed/dressed";
import { PermissionFlagsBits } from "discord-api-types/v10";

export const config: CommandConfig = {
  description: "Moderate some credit",
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    {
      name: "user",
      description: "Who're we moderating today?",
      type: 6,
      required: true,
    },
    {
      name: "amount",
      description: "Amount to modify by",
      type: 4,
      required: true,
    },
    {
      name: "modification",
      description: "What to do",
      type: 3,
      required: true,
      choices: [
        { name: "Add", value: "add" },
        { name: "Remove", value: "remove" },
      ],
    },
    {
      name: "reason",
      description: "Why?",
      type: 3,
      required: true,
    },
  ],
  contexts: ["Guild"],
};

export default async function moderateCredit(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });
  if (!("options" in interaction.data) || !interaction.data.options) return;
  const { id } = interaction.getOption("user", true).user();
  if (!id) {
    await interaction.editReply("User not found");
    return;
  }
  await modCredit(
    id,
    (interaction.getOption("modification", true).string() === "add" ? 1 : -1) *
      Number(interaction.getOption("amount", true).integer()),
    true,
  );
  await interaction.editReply("Done");
}
