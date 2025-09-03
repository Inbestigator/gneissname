import { prisma } from "@/db";
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
    const records = users.flatMap(({ id, entries }, idx) =>
      entries.map((e) =>
        prisma.creditRecord.create({
          data: {
            change: e.amount,
            userId: id,
            currentBalance: updatedUsers[idx].credit,
            timestamp: new Date(e.time),
          },
        }),
      ),
    );
    await prisma.$transaction(records);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
