import { createCache, getters, resolveKey } from "@dressed/ws/cache";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { ChannelType } from "discord-api-types/v10";
import { listActiveThreads } from "dressed";
import { createClient, RedisClientType, SetOptions } from "redis";
import { getDBUser } from "./bot/utils";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });

//allow for null redis (i'm not setting the server up lol)
let redis: RedisClientType | {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: any, options?: SetOptions) => void;
  del: (key: string) => void;
  decrBy: (key: string, decrement: number) => Promise<number>;
};

if (process.env.REDIS_URL) {
  redis = await createClient({ url: process.env.REDIS_URL }).connect() as RedisClientType;
} else {
  console.warn("REDIS_URL not set. Redis cache will be disabled during build.");
  redis = {
    get: async (key: string) => {
      return null;
    },
    set: (key: string, value: any, options?: SetOptions) => {},
    del: (key: string) => {},
    decrBy: async (key: string, decrement: number) => {
      return 0;
    },
  };
}

export { redis };

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