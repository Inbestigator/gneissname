import { prisma } from "@/db";
import { PrismaPromise } from "@prisma/client";
import { botEnv } from "dressed/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== botEnv.DISCORD_TOKEN) {
    return new NextResponse("Incorrect token", { status: 403 });
  }
  const users = (await req.json()) as {
    id: string;
    entries: { amount: number; time: number }[];
  }[];
  try {
    const upserts = users.map(({ id, entries }) => {
      const totalAmount = entries.reduce((sum, e) => sum + e.amount, 0);
      return prisma.user.upsert({
        where: { id },
        create: { id, credit: totalAmount },
        update: { credit: { increment: totalAmount } },
        select: { id: true, credit: true },
      });
    });
    const updatedUsers = await prisma.$transaction(upserts);
    const records: PrismaPromise<unknown>[] = [];
    for (const { id, entries } of users) {
      let credit = updatedUsers.find((u) => u.id === id)!.credit;
      for (const { amount, time } of entries.sort((a, b) => b.time - a.time)) {
        records.push(
          prisma.creditRecord.create({
            data: {
              change: amount,
              userId: id,
              currentBalance: credit,
              timestamp: new Date(time),
            },
          }),
        );
        credit -= amount;
      }
    }
    await prisma.$transaction(records);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
