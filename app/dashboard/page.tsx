import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/authOptions"
import BulkCollection from "@/components/bulk-collection"
import Tickets from "@/components/tickets"

import { deleteTicket, opt, updateTicket } from "./actions"
import { whitelist } from "./whitelist"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="grid gap-4">
      {whitelist.includes(session.user.id) && (
        <Tickets updateTicket={updateTicket} deleteTicket={deleteTicket} />
      )}
      <BulkCollection opt={opt} />
    </div>
  )
}
