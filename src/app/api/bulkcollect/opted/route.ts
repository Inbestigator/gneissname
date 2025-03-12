import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(user?.optedOut);
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching opted" },
      {
        status: 500,
      },
    );
  }
}
