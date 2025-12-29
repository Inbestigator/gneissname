import { type CommandInteraction, Container } from "@dressed/react";
import { type CommandConfig, CommandOption } from "dressed";
import { Suspense } from "react";
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
  await interaction.reply(
    <Container>
      ## {user.global_name}&apos;s data{"\n"}
      ### Credit{"\n"}
      <Suspense fallback="…">{cache.getDBUser(user.id).then((u) => u.credit.toLocaleString())}</Suspense>
    </Container>,
    { ephemeral: true },
  );
}
