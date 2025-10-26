import { NextResponse } from "next/server";
import { cache } from "@/db";

export async function GET() {
  return new NextResponse(JSON.stringify(await cache.getTopUsers()));
}
