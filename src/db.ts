import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createClient } from "redis";
import { createCache, getters, resolveKey } from "@dressed/ws/cache";
import { getDBUser } from "./bot/utils";

export const prisma = new PrismaClient().$extends(withAccelerate());
export const redis = await createClient({
  url: process.env.REDIS_URL,
}).connect();

export const cache = createCache(
  {
    ...getters,
    getDBUser,
    async getCredit(userId: string) {
      try {
        const user = await getDBUser(userId);
        return user.credit;
      } catch {
        return 0;
      }
    },
  },
  {
    desiredProps: { getUser: ["global_name"] },
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
        redis.set(
          key,
          JSON.stringify({ staleAt: Date.now() + 1500 * 1000, value }),
          {
            expiration: { type: "EX", value: 1800 },
          },
        );
      },
      delete: redis.del,
      resolveKey,
    },
  },
);
