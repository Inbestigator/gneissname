import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({ entries }: Readonly<{ entries: { credit: number | "‎"; id: string; name: Promise<string> }[] }>) {
  return entries.map(({ credit, id, name }, i) => (
    <TextDisplay key={id}>
      {i + 1}. **<Suspense fallback=" ">{name}</Suspense>**
      {"\n"}
      {credit.toLocaleString()}
    </TextDisplay>
  ));
}

const placeholder = (
  <Leaderboard
    entries={Array.from({ length: 10 }, (_, i) => ({ credit: "‎", id: `${i}`, name: Promise.resolve(" ") }))}
  />
);

export default async function leaderboard(interaction: CommandInteraction) {
  const rankPromise = cache.getRank(interaction.user.id);
  const ranksPromise = cache.getTopUsers();
  const entriesPromise = ranksPromise.then((rows) =>
    rows.map((row) => ({ ...row, name: cache.getUser(row.id).then((u) => u.global_name ?? u.username ?? "") })),
  );
  return procrastinate(
    entriesPromise,
    interaction.reply(
      <Container>
        ## Leaderboard{"\n"}
        Members with the highest social credit You&apos;re #<Suspense>{rankPromise}</Suspense>
        <Suspense fallback={placeholder}>
          {entriesPromise.then((entries) => (
            <Leaderboard entries={entries} />
          ))}
        </Suspense>
      </Container>,
      { ephemeral: true },
    ),
  );
}
