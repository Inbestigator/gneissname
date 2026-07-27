import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { whitelist } from "@/app/dashboard/whitelist";
import { cache } from "@/db";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await cache.listTickets();

    return NextResponse.json(tickets);
  } catch {
    return NextResponse.json({ error: "Error fetching tickets" }, { status: 500 });
  }
}
