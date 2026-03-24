import { ChannelType } from "discord-api-types/v10";
import { listActiveThreads } from "dressed";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { whitelist } from "@/app/dashboard/whitelist";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await listActiveThreads("750062409364013159").then((list) =>
      list.threads.filter((t) => t.type === ChannelType.PrivateThread && t.parent_id === "1225971091344982128"),
    );

    return NextResponse.json(tickets);
  } catch {
    return NextResponse.json({ error: "Error fetching tickets" }, { status: 500 });
  }
}
