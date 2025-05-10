import { prisma, redis } from "@/db";

export async function getCredit(userId: string) {
  try {
    const user = await getUser(userId);
    return user.credit;
  } catch {
    return 0;
  }
}

const userCaps = new Map();
let cap = 256;

setTimeout(
  () => {
    userCaps.clear();
    cap = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
  },
  53 * 59 * 1000,
);

export async function modCredit(
  userId: string,
  modifier: number,
  exemptCap = false,
) {
  try {
    if (!exemptCap) {
      if (!userCaps.has(userId)) userCaps.set(userId, 0);
      if (userCaps.get(userId) > cap) modifier /= 10;
      userCaps.set(userId, userCaps.get(userId) + modifier);
    }
    modifier = Math.round(modifier);
    const user = await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.upsert({
        where: { id: userId },
        create: { id: userId, credit: modifier },
        update: {
          credit: { increment: modifier },
        },
        select: { credit: true },
      });

      await prisma.creditRecord.create({
        data: {
          change: modifier,
          userId,
          currentBalance: updatedUser.credit,
          timestamp: new Date(),
        },
      });

      return updatedUser;
    });
    redis.set(`user:${userId}`, JSON.stringify(user), {
      expiration: { type: "EX", value: 120 },
    });
  } catch {
    return 0;
  }
}

export async function getUser(userId: string): Promise<{ credit: number }> {
  const redisUser = await redis.get(`user:${userId}`);
  if (redisUser) {
    return JSON.parse(redisUser);
  }

  let user = await prisma.user.findFirst({
    where: { id: userId },
    cacheStrategy: { swr: 30, ttl: 30 },
    select: { credit: true },
  });
  if (!user) {
    user = await prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, credit: 0 },
      update: {},
      select: { credit: true },
    });
  }
  redis.set(`user:${userId}`, JSON.stringify({ credit: user.credit }), {
    expiration: { type: "EX", value: 120 },
  });
  return user;
}
