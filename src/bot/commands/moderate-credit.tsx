import type { CommandInteraction } from "@dressed/react";
import { type CommandConfig, CommandOption } from "dressed";
import { modCredit } from "@/bot/utils";

export const config = {
  description: "Moderate some credit",
  default_member_permissions: ["Administrator"],
  options: [
    CommandOption({ type: "User", name: "user", description: "Who're we moderating today?", required: true }),
    CommandOption({ type: "Integer", name: "amount", description: "Amount to modify by", required: true }),
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
    CommandOption({ type: "String", name: "reason", description: "Why?", required: true }),
  ],
  contexts: ["Guild"],
} satisfies CommandConfig;

export default async function moderateCredit(interaction: CommandInteraction<typeof config>) {
  const { amount, modification, user, reason } = interaction.options;
  await Promise.all([
    modCredit(user.id, (modification === "add" ? 1 : -1) * amount, reason, true),
    interaction.deferReply({ ephemeral: true }),
  ]);
  return interaction.editReply("Done");
}
