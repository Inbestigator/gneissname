import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({
  entries,
}: Readonly<{
  entries: { credit: number | ""; id: string; name: string | Promise<string> }[];
}>) {
  return entries.map(({ credit, id, name }, i) => (
    <TextDisplay key={id}>
      {i + 1} <Suspense>**{name}**</Suspense>
      {"\n"}
      {credit.toLocaleString()}
    </TextDisplay>
  ));
}

export default async function leaderboard(interaction: CommandInteraction) {
  const rankPromise = cache.getRank(interaction.user.id);
  const ranksPromise = cache.getTopUsers();
  const userPromises = ranksPromise.then((r) => r.map(({ id }) => cache.getUser(id).then((u) => u.global_name ?? "")));
  interaction.reply(
    <Container>
      ## Leaderboard{"\n"}
      Members with the highest social credit You&apos;re #<Suspense>{rankPromise}</Suspense>
      <Suspense
        fallback={
          <Leaderboard entries={Array.from({ length: 10 }, (_, i) => ({ credit: "", id: `${i}`, name: "" }))} />
        }
      >
        {ranksPromise.then((r) => (
          <Leaderboard entries={r.map((u, i) => ({ ...u, name: userPromises.then((p) => p[i]) }))} />
        ))}
      </Suspense>
    </Container>,
    { ephemeral: true },
  );
  return procrastinate(rankPromise, ...(await userPromises));
}
