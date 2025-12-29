import type { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";

export const config = {
  description: "View your current social credit score",
} satisfies CommandConfig;

export default async function credit(interaction: CommandInteraction) {
  const userPromise = cache.getDBUser(interaction.user.id);
  interaction.reply(
    <>
      Your current social credit is **
      <Suspense fallback="…">{userPromise.then((u) => u.credit.toLocaleString())}</Suspense>**!
    </>,
    { ephemeral: true },
  );
  return userPromise.then(() => new Promise((r) => setTimeout(r, 1500)));
}
