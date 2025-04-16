import { prisma } from "@/db";

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
  } catch {
    return 0;
  }
}

export async function getUser(userId: string) {
  let user = await prisma.user.findFirst({
    where: { id: userId },
    cacheStrategy: { swr: 30, ttl: 30 },
  });
  if (!user) {
    user = await prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, credit: 0 },
      update: {},
    });
  }
  return user;
}
