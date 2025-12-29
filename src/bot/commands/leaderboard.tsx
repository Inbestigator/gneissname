import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({
  ranks,
  userPromises,
}: Readonly<{ ranks: { credit: number; id: string }[]; userPromises: Promise<ReturnType<typeof cache.getUser>[]> }>) {
  return ranks.map(({ credit, id }, i) => (
    <TextDisplay key={id}>
      {i + 1} <Suspense>**{userPromises.then((p) => p[i].then((u) => u.global_name ?? ""))}**</Suspense>
      {"\n"}
      {credit.toLocaleString()}
    </TextDisplay>
  ));
}

export default async function leaderboard(interaction: CommandInteraction) {
  const rankPromise = cache.getRank(interaction.user.id);
  const ranksPromise = cache.getTopUsers();
  const userPromises = ranksPromise.then((r) => r.map(({ id }) => cache.getUser(id)));
  interaction.reply(
    <Container>
      ## Leaderboard{"\n"}
      Members with the highest social credit You&apos;re #<Suspense>{rankPromise}</Suspense>
      <Suspense>
        {ranksPromise.then((r) => (
          <Leaderboard ranks={r} userPromises={userPromises} />
        ))}
      </Suspense>
    </Container>,
    { ephemeral: true },
  );
  return procrastinate(rankPromise, ...(await userPromises));
}
