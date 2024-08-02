"use server"

export async function updateTicket(data: FormData) {
  try {
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
    console.error(e)
    return
  }
}

export async function deleteTicket(data: FormData) {
  try {
    const response = await fetch(
      `https://discord.com/api/v9/channels/${data.get("ticketId")}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      }
    )

    if (!response.ok) throw new Error("Failed to fetch messages")

    const messageId = [...(await response.json())]
      .reverse()
      .find(
        (m: any) => m.author.id === "1202823859930136586" && m.embeds[0]?.title
      ).id

    if (!messageId) throw new Error("No message found")

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

    await fetch(`https://discord.com/api/v9/channels/${data.get("ticketId")}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locked: true,
        archived: true,
      }),
    })
    return
  } catch (e) {
    console.error(e)
    return
  }
}
