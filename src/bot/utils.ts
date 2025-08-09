import { prisma, redis } from "@/db";

export async function modCredit(
  userId: string,
  modifier: number,
  exemptCap?: boolean,
) {
  try {
    if (!exemptCap) {
      const key = `credit-cap:${userId}`;
      await redis.set(key, 256, {
        expiration: { type: "EX", value: 53 * 60 },
        condition: "NX",
      });
      if ((await redis.decrBy(key, modifier)) <= 0) {
        modifier /= 10;
      }
    }
    modifier = Math.round(modifier);
    await prisma.$transaction(async (prisma) => {
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
  } catch (e) {
    console.error(e);
    throw new Error("Failed to update credit");
  }
}

export async function getDBUser(userId: string): Promise<{ credit: number }> {
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
  return user;
}
