import { CommandConfig, getUser as getDiscordUser } from "dressed";
import { prisma } from "@/db";
import { getUser } from "@/bot/utils";
import {
  CommandInteraction,
  Container,
  Section,
  TextDisplay,
  Thumbnail,
} from "@dressed/react";
import { Fragment } from "react";

export const config: CommandConfig = {
  description: "View the users with the highest social credit",
};

export default async function leaderboard(interaction: CommandInteraction) {
  const [[topUsers, userRank]] = await Promise.all([
    prisma.$transaction(async (prisma) => {
      const topUsers = prisma.user.findMany({
        take: 10,
        orderBy: { credit: "desc" },
        cacheStrategy: { swr: 300, ttl: 300 },
      });

      const currentUser = await getUser(interaction.user.id);
      const userRank = prisma.user.count({
        where: {
          credit: {
            gte: currentUser.credit,
          },
        },
        cacheStrategy: { swr: 300, ttl: 300 },
      });

      return Promise.all([topUsers, userRank]);
    }),
    interaction.deferReply({ ephemeral: true }),
  ]);

  try {
    await interaction.editReply(
      <Container>
        ## Leaderboard
        <TextDisplay>Members with the highest social credit</TextDisplay>
        You{"'"}re #{userRank}
        {await Promise.all(
          topUsers.map(async (entry, index) => {
            const user = await getDiscordUser(entry.id);
            return (
              <Fragment key={entry.id}>
                <TextDisplay>
                  ### {index + 1} - {user.global_name}
                </TextDisplay>
                {entry.credit.toLocaleString()}
              </Fragment>
            );
          }),
        )}
      </Container>,
    );
  } catch {
    await interaction.editReply(
      "An error occurred while fetching the leaderboard.",
    );
  }
}
