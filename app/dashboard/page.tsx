import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/authOptions"
import Tickets from "@/components/tickets"

export const whitelist = [
  "490924235234213929",
  "761777382041714690",
  "352540329871802368",
  "266726331436367887",
  "403703683239510038",
  "290987359825035264",
  "340412047806169088",
  "656552259362095105",
  "403703683239510038",
  "1029120784809078784",
]

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || !whitelist.includes(session.user.id)) {
    redirect("/login")
  }

  return <Tickets />
}
