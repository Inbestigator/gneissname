import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { whitelist } from "@/app/dashboard/whitelist";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await fetch(
      "https://discord.com/api/v9/guilds/750062409364013159/threads/active",
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      },
    ).then((res) =>
      res
        .json()
        .then((data) =>
          (data.threads as any[]).filter(
            (thread: any) => thread.parent_id === "1225971091344982128",
          ),
        ),
    );

    return NextResponse.json(tickets);
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching tickets" },
      { status: 500 },
    );
  }
}
