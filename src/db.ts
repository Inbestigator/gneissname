import { createCache, getters, resolveKey } from "@dressed/ws/cache";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { ChannelType } from "discord-api-types/v10";
import { listActiveThreads } from "dressed";
import { createClient, type RedisClientType, type RedisDefaultModules } from "redis";
import { getDBUser } from "./bot/utils";
import type { Video } from "./components/latest-videos";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
export const redis = process.env.REDIS_URL
  ? await createClient({ url: process.env.REDIS_URL }).connect()
  : (null as unknown as RedisClientType<RedisDefaultModules>);

export const cache = createCache(
  {
    ...getters,
    getDBUser,
    async getRank(userId: string) {
      const { credit } = await getDBUser(userId);
      return prisma.user.count({ where: { credit: { gte: credit } } });
    },
    getTopUsers: () => prisma.user.findMany({ take: 10, orderBy: { credit: "desc" } }),
    async listTickets() {
      const { threads } = await listActiveThreads("750062409364013159");
      return threads.filter((t) => t.type === ChannelType.PrivateThread && t.parent_id === "1225971091344982128");
    },
    async listVideos() {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUCk6atPf8zBPd-5C7rgEkRg&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`,
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      return data.items.slice(0, 3).map(
        (
          item: {
            snippet: { thumbnails: { high: { url: string } }; description: string; title: string };
            resourceId: { videoId: string };
          },
          index: number,
        ) =>
          ({
            thumbnail: item.snippet.thumbnails.high.url,
            index,
            description: item.snippet.description,
            id: item.resourceId.videoId,
            title: item.snippet.title,
          }) satisfies Video,
      );
    },
  },
  {
    desiredProps: { getUser: ["global_name", "username"] },
    logic: {
      async get(key) {
        const res = await redis.get(key);
        if (!res) return { state: "miss" };
        const data = JSON.parse(res);
        return {
          state: Date.now() < data.staleAt ? "hit" : "stale",
          ...data,
        };
      },
      set(key, value) {
        redis.set(key, JSON.stringify({ staleAt: Date.now() + 1500 * 1000, value }), {
          expiration: { type: "EX", value: 1800 },
        });
      },
      delete: (k) => redis.del(k),
      resolveKey,
    },
  },
);
