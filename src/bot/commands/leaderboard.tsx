import { CommandConfig } from "dressed";
import { cache, prisma } from "@/db";
import { CommandInteraction, Container, TextDisplay } from "@dressed/react";
import { Fragment } from "react";

export const config: CommandConfig = {
  description: "View the users with the highest social credit",
};

function Leaderboard({
  userRank,
  list,
}: {
  userRank?: number;
  list: { name?: string; credit: number }[];
}) {
  return (
    <Container>
      ## Leaderboard
      <TextDisplay>Members with the highest social credit</TextDisplay>
      You&apos;re #{userRank}
      {list.map(({ name, credit }, i) => (
        <Fragment key={i}>
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
    const [topUsers] = await Promise.all([
      cache.getTopUsers(),
      interaction.deferReply({ ephemeral: true }),
    ]);
    const [userRank, _, ...resolvedUsers] = await Promise.all([
      cache.getRank(interaction.user.id),
      interaction.editReply(<Leaderboard list={topUsers} />),
      ...topUsers.map(async (u) => {
        const user = await cache.getUser(u.id);
        return { name: user.global_name ?? undefined, credit: u.credit };
      }),
    ]);

    await interaction.editReply(
      <Leaderboard userRank={userRank} list={resolvedUsers} />,
    );
  } catch {
    await interaction.editReply(
      "An error occurred while fetching the leaderboard.",
    );
  }
}
