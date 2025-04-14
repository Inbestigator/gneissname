import { getUser } from "@/bot/utils";
import {
  CommandConfig,
  CommandInteraction,
  CommandOption,
} from "@dressed/dressed";
import { PermissionFlagsBits } from "discord-api-types/v10";

export const config: CommandConfig = {
  description: "Snoop a user",
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    CommandOption({
      name: "user",
      description: "User to snoop",
      type: "User",
      required: true,
    }),
  ],
  contexts: ["Guild"],
};

export default async function userData(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });
  const user = await getUser(
    interaction.getOption("user", true).user().id ?? "0",
  );
  const embed = {
    title: `${interaction.getOption("user", true).user().global_name}'s data`,
    fields: [
      {
        name: "Credit",
        value: user.credit.toLocaleString(),
      },
    ],
  };
  await interaction.editReply({
    embeds: [embed],
  });
}
