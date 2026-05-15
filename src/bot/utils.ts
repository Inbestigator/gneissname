import type { User } from "@prisma/client";
import { prisma, redis } from "@/db";

export async function modCredit(userId: string, modifier: number, reason: string, exemptCap?: boolean) {
  try {
    modifier = Math.round(modifier);
    if (!exemptCap) {
      const key = `credit-cap:${userId}`;
      await redis.set(key, 256, { expiration: { type: "EX", value: 53 * 60 }, condition: "NX" });
      if ((await redis.decrBy(key, modifier)) <= 0) {
        modifier /= 10;
      }
    }
    modifier = Math.round(modifier);
    await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.upsert({
        where: { id: userId },
        create: { id: userId, credit: modifier },
        update: { credit: { increment: modifier } },
        select: { credit: true },
      });

      await prisma.creditRecord.create({
        data: { change: modifier, userId, currentBalance: updatedUser.credit, reason, timestamp: new Date() },
      });

      return updatedUser;
    });
  } catch (cause) {
    throw new Error("Failed to update credit", { cause });
  }
}

export async function getDBUser<T extends boolean = true>(
  userId: string,
  upsert?: T,
): Promise<T extends false ? User | undefined : User> {
  let user = await prisma.user.findFirst({ where: { id: userId }, select: { credit: true } });
  if (!user && upsert !== false) {
    user = await prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, credit: 0 },
      update: {},
      select: { credit: true },
    });
  }
  return user as User;
}

export async function procrastinate<T extends Promise<unknown>[]>(...promises: T): ReturnType<typeof Promise.all<T>> {
  return Promise.all(promises).then((...v) => new Promise((r) => setTimeout(() => r(...v), 1500)));
}
