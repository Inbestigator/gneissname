import { modCredit } from "@/bot/utils";
import { CommandConfig, CommandOption } from "dressed";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { CommandInteraction } from "@dressed/react";

export const config = {
  description: "Moderate some credit",
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    CommandOption({
      type: "User",
      name: "user",
      description: "Who're we moderating today?",
      required: true,
    }),
    CommandOption({
      type: "Integer",
      name: "amount",
      description: "Amount to modify by",
      required: true,
    }),
    CommandOption({
      type: "String",
      name: "modification",
      description: "What to do",
      required: true,
      choices: [
        { name: "Add", value: "add" },
        { name: "Remove", value: "remove" },
      ],
    }),
    CommandOption({
      type: "String",
      name: "reason",
      description: "Why?",
      required: true,
    }),
  ],
  contexts: ["Guild"],
} satisfies CommandConfig;

export default async function moderateCredit(
  interaction: CommandInteraction<typeof config>,
) {
  if (!("options" in interaction.data) || !interaction.data.options) return;
  const { id } = interaction.getOption("user", true).user();
  if (!id) {
    await interaction.reply("User not found");
    return;
  }
  await Promise.all([
    modCredit(
      id,
      (interaction.getOption("modification", true).string() === "add"
        ? 1
        : -1) * Number(interaction.getOption("amount", true).integer()),
      true,
    ),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply("Done");
}
