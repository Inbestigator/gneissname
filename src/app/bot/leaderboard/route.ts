import { cache } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(JSON.stringify(await cache.getTopUsers()));
}
