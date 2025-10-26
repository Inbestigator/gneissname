import { botEnv } from "dressed/utils";
import { type NextRequest, NextResponse } from "next/server";
import { modCredit } from "@/bot/utils";
import { prisma } from "@/db";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("u");
  if (userId === null) {
    return new NextResponse("Incorrect params", { status: 400 });
  }
  const user = await prisma.user.findFirst({
    where: { id: userId },
    cacheStrategy: { swr: 30, ttl: 30 },
    select: { credit: true },
  });
  if (!user) return new NextResponse("Unknown user", { status: 404 });
  return new NextResponse(JSON.stringify(user.credit));
}

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bot ${botEnv.DISCORD_TOKEN}`) {
    return new NextResponse("Incorrect token", { status: 403 });
  }
  const userId = req.nextUrl.searchParams.get("u");
  const modifier = req.nextUrl.searchParams.get("m");
  if (userId === null || modifier === null) {
    return new NextResponse("Incorrect params", { status: 400 });
  }
  try {
    await modCredit(userId, Number(modifier));
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
