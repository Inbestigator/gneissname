import {
  CommandConfig,
  CommandInteraction,
  getUser as getDiscordUser,
} from "@dressed/dressed";
import { prisma } from "@/db";
import { getUser } from "@/bot/utils";
import { APIEmbed } from "discord-api-types/v10";

export const config: CommandConfig = {
  description: "View the users with the highest social credit",
};

export default async function leaderboard(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  try {
    const [topUsers, userRank] = await prisma.$transaction(async (prisma) => {
      const topUsers = prisma.user.findMany({
        take: 10,
        orderBy: { credit: "desc" },
        cacheStrategy: { swr: 120, ttl: 120 },
      });

      const currentUser = await getUser(interaction.user.id);

      const userRank = prisma.user.count({
        where: {
          credit: {
            gte: currentUser.credit,
          },
        },
        cacheStrategy: { swr: 60, ttl: 60 },
      });

      return Promise.all([topUsers, userRank]);
    });

    const embed: APIEmbed = {
      title: "Leaderboard",
      description: `Members with the highest social credit\n> You're #${userRank}`,
      fields: await Promise.all(
        topUsers.map(async (entry, index) => {
          const user = await getDiscordUser(entry.id);
          return {
            name: `#${index + 1} - ${user.global_name}`,
            value: `> $${entry.credit.toLocaleString()}`,
          };
        }),
      ),
    };

    await interaction.editReply({
      embeds: [embed],
    });
  } catch {
    await interaction.editReply(
      "An error occurred while fetching the leaderboard.",
    );
  }
}
