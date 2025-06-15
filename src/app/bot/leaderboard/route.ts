import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const topUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { credit: "desc" },
    cacheStrategy: { swr: 3600, ttl: 3600 },
  });
  return new NextResponse(JSON.stringify(topUsers));
}
