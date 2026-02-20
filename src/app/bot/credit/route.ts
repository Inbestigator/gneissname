import { botEnv } from "dressed/utils";
import { type NextRequest, NextResponse } from "next/server";
import { modCredit } from "@/bot/utils";
import { cache } from "@/db";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("u");
  if (userId === null) {
    return new NextResponse("Incorrect params", { status: 400 });
  }
  const user = await cache.getDBUser(userId, false);
  if (!user) return new NextResponse("Unknown user", { status: 404 });
  return NextResponse.json(user.credit);
}

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bot ${botEnv.DISCORD_TOKEN}`) {
    return new NextResponse("Incorrect token", { status: 403 });
  }
  const userId = req.nextUrl.searchParams.get("u");
  const modifier = req.nextUrl.searchParams.get("m");
  const reason = req.nextUrl.searchParams.get("r") ?? "POST:/credit";
  if (userId === null || modifier === null) {
    return new NextResponse("Incorrect params", { status: 400 });
  }
  try {
    await modCredit(userId, Number(modifier), reason);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
