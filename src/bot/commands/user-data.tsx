import { type CommandInteraction, Container } from "@dressed/react";
import { type CommandConfig, CommandOption } from "dressed";
import { cache } from "@/db";

export const config = {
  description: "Snoop a user",
  default_member_permissions: ["Administrator"],
  options: [
    CommandOption({
      name: "user",
      description: "User to snoop",
      type: "User",
      required: true,
    }),
  ],
  contexts: ["Guild"],
} satisfies CommandConfig;

export default async function userData(interaction: CommandInteraction) {
  const user = interaction.getOption("user", true).user();
  const [{ credit }] = await Promise.all([cache.getDBUser(user.id), interaction.deferReply({ ephemeral: true })]);
  await interaction.editReply(
    <Container>
      ## {user.global_name}&apos;s data{"\n"}
      ### Credit&nl;
      {credit.toLocaleString()}
    </Container>,
  );
}
