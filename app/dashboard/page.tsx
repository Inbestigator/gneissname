import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/authOptions"
import Tickets from "@/components/tickets"

import { whitelist } from "./whitelist"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || !whitelist.includes(session.user.id)) {
    redirect("/login")
  }

  return <Tickets />
}
