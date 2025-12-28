import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense, use } from "react";
import { cache } from "@/db";

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({ list }: Readonly<{ list: Promise<{ credit: number; id: string }[]> }>) {
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
  );
}
