import { modCredit } from "@/bot/utils";
import { botEnv } from "dressed/utils";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (e) {
    console.error(e);
    return new NextResponse(null, { status: 500 });
  }
}
