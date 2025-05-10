import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { whitelist } from "@/app/dashboard/whitelist";
import { listActiveThreads } from "@dressed/dressed";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await listActiveThreads("750062409364013159").then((list) =>
      list.threads.filter(
        (t) => t.type === 10 && t.parent_id === "1225971091344982128",
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
