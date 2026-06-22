import type { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

export const config = {
  description: "View your current social credit score",
} satisfies CommandConfig;

export default function credit(interaction: CommandInteraction) {
  const userPromise = cache.getDBUser(interaction.user.id);
  return procrastinate(
    userPromise,
    interaction.reply(
      <>
        Your current social credit is **
        <Suspense fallback="…">{userPromise.then((u) => u.credit.toLocaleString())}</Suspense>**!
      </>,
      { ephemeral: true },
    ),
  );
}
