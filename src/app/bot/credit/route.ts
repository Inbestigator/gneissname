import { modCredit } from "@/bot/utils";
import { cache } from "@/db";
import { botEnv } from "dressed/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("u");
  if (userId === null) {
    return new NextResponse("Incorrect params", { status: 400 });
  }
  return new NextResponse(JSON.stringify(await cache.getCredit(userId)));
}

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== botEnv.DISCORD_TOKEN) {
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
