"use server"

import { getServerSession } from "next-auth"
import { whitelist } from "./whitelist"
import { authOptions } from "@/lib/authOptions"

export async function updateTicket(data: FormData) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !whitelist.includes(session.user.id)) {
      return
    }
    
    await fetch(`https://discord.com/api/v9/channels/${data.get("ticketId")}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: (data.get("tags") as string) + data.get("user"),
      }),
    })
    return
  } catch (e) {
    return
  }
}

export async function deleteTicket(data: FormData) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !whitelist.includes(session.user.id)) {
      return
    }
    
    const response = await fetch(
      `https://discord.com/api/v9/channels/${data.get("ticketId")}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      }
    )

    if (!response.ok) return

    const messageId = [...(await response.json())]
      .reverse()
      .find(
        (m: any) => m.author.id === "1202823859930136586" && m.embeds[0]?.title
      ).id

    if (!messageId) return

    await fetch(
      `https://discord.com/api/v9/channels/${data.get(
        "ticketId"
      )}/messages/${messageId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "**Ticket closed.**",
              color: 0,
            },
          ],
          components: [],
        }),
      }
    )

    await fetch(`https://discord.com/api/v9/channels/${data.get("ticketId")}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `> **\`\`\`Closed by ${session.user.name}\`\`\`**`,
      }),
    })

    await fetch(`https://discord.com/api/v9/channels/${data.get("ticketId")}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `[Solved] ${data.get("name")}`,
        locked: true,
        archived: true,
      }),
    })
    return
  } catch (e) {
    return
  }
}
