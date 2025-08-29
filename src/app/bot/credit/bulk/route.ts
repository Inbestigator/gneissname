import { prisma } from "@/db";
import { botEnv } from "dressed/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== botEnv.DISCORD_TOKEN) {
    return new NextResponse("Incorrect token", { status: 403 });
  }
  const users = (await req.json()) as { id: string; modifier: number }[];
  try {
    const tx = users.map(({ id, modifier }) =>
      prisma.user.upsert({
        where: { id },
        create: { id, credit: modifier },
        update: { credit: { increment: modifier } },
        select: { id: true, credit: true },
      }),
    );
    const results = await prisma.$transaction(tx);
    const recordTx = results.map((u, i) =>
      prisma.creditRecord.create({
        data: {
          change: users[i].modifier,
          userId: users[i].id,
          currentBalance: u.credit,
          timestamp: new Date(),
        },
      }),
    );
    await prisma.$transaction(recordTx);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
