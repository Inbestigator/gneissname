import { NextResponse } from "next/server"
import { readField } from "@/firebaseUtils"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/authOptions"
import { whitelist } from "@/app/dashboard/whitelist"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !whitelist.includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const optOuts = await readField("misc/site", "optouts")

    return NextResponse.json(optOuts.includes(session.user.id))
  } catch (e) {
    return NextResponse.json({ error: "Error fetching opted" }, { status: 500 })
  }
}
