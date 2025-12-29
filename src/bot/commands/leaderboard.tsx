import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import * as React from "react";
import { Suspense, use } from "react";
import { cache } from "@/db";

// @ts-expect-error
React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ??= { // NOSONAR
  H: null,
  A: null,
  T: null,
  S: null,
  V: null,
};

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({ list }: Readonly<{ list: Promise<{ credit: number; id: string }[]> }>) {
  console.log(use);
  const ranks = use(list);
  return ranks.map(({ credit, id }, i) => (
    <TextDisplay key={id}>
      {i + 1} <Suspense>**{cache.getUser(id).then((u) => u.global_name ?? "")}**</Suspense>
      {"\n"}
      {credit.toLocaleString()}
    </TextDisplay>
  ));
}

export default function leaderboard(interaction: CommandInteraction) {
  return interaction.reply(
    <Container>
      ## Leaderboard{"\n"}
      Members with the highest social credit You&apos;re #<Suspense>{cache.getRank(interaction.user.id)}</Suspense>
      <Suspense>
        <Leaderboard list={cache.getTopUsers()} />
      </Suspense>
    </Container>,
    { ephemeral: true },
  );
}
