"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import { whitelist } from "./whitelist";
import {
  Container,
  createMessage,
  editMessage,
  listMessages,
  modifyChannel,
  TextDisplay,
} from "dressed";
import { botEnv } from "dressed/server";

export async function updateTicket(data: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return;
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
    });
    return;
  } catch (e) {
    return;
  }
}

export async function deleteTicket(data: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !whitelist.includes(session.user.id)) {
      return;
    }

    const channelId = data.get("ticketId")?.toString() ?? "";
    const messages = await listMessages(channelId, { limit: 100 });
    const messageId = messages.findLast(
      (m) => m.author.id === botEnv.DISCORD_APP_ID && !!m.components?.length,
    )?.id;

    if (!messageId) return;

    await Promise.all([
      editMessage(channelId, messageId, {
        components: [
          Container(
            TextDisplay("## Ticket closed"),
            TextDisplay(`Closed by ${session.user.name}`),
          ),
        ],
      }),
      createMessage(channelId, `> Closed by ${session.user.name}`),
    ]);
    await modifyChannel(channelId, {
      name: `[Solved] ${data.get("name")}`,
      archived: true,
      locked: true,
    });
    return;
  } catch (e) {
    return;
  }
}
