import { type CommandInteraction, Container } from "@dressed/react";
import { type CommandConfig, CommandOption } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

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

export default async function userData(interaction: CommandInteraction<typeof config>) {
  const user = interaction.getOption("user", true).user();
  const userPromise = cache.getDBUser(interaction.user.id);
  interaction.reply(
    <Container>
      ## {user.global_name}&apos;s data{"\n"}
      ### Credit{"\n"}
      <Suspense fallback="…">{userPromise.then((u) => u.credit.toLocaleString())}</Suspense>
    </Container>,
    { ephemeral: true },
  );
  return procrastinate(userPromise);
}
