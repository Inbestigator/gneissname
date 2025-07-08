import { CommandConfig, CommandOption } from "dressed";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { CommandInteraction, Container, TextDisplay } from "@dressed/react";
import { cache } from "@/db";

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
  const [user] = await Promise.all([
    cache.getDBUser(interaction.getOption("user", true).user().id ?? "0"),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply(
    <Container>
      ## {interaction.getOption("user", true).user().global_name + "'"}s data
      <TextDisplay>### Credit</TextDisplay>
      {user.credit.toLocaleString()}
    </Container>,
  );
}
