import { type CommandInteraction, Container, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Fragment } from "react";
import { cache } from "@/db";

export const config = {
  description: "View the users with the highest social credit",
} satisfies CommandConfig;

function Leaderboard({ userRank, list }: { userRank?: number; list: { name?: string; credit: number; id: string }[] }) {
  return (
    <Container>
      ## Leaderboard
      <TextDisplay>Members with the highest social credit</TextDisplay>
      You&apos;re #{userRank}
      {list.map(({ name, credit, id }, i) => (
        <Fragment key={id}>
          <TextDisplay>
            ### {i + 1} {name && `- ${name}`}
          </TextDisplay>
          {credit.toLocaleString()}
        </Fragment>
      ))}
    </Container>
  );
}

export default async function leaderboard(interaction: CommandInteraction) {
  try {
    const [topUsers] = await Promise.all([cache.getTopUsers(), interaction.deferReply({ ephemeral: true })]);
    const [userRank, _, ...resolvedUsers] = await Promise.all([
      cache.getRank(interaction.user.id),
      interaction.editReply(<Leaderboard list={topUsers} />),
      ...topUsers.map(async (u) => {
        const user = await cache.getUser(u.id);
        return { ...u, name: user.global_name ?? undefined };
      }),
    ]);

    await interaction.editReply(<Leaderboard userRank={userRank} list={resolvedUsers} />);
  } catch {
    await interaction.editReply("An error occurred while fetching the leaderboard.");
  }
}
