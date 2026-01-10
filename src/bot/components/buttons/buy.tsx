import type { MessageComponentInteraction } from "@dressed/react";
import { Suspense } from "react";
import { shopItems } from "@/bot/commands/shop";
import { modCredit, procrastinate } from "@/bot/utils";
import { cache } from "@/db";
import { openTicket } from "../selects/ticket-open";

const blockedShoppers = {
  Whitelist: ["580638706805768203", "786737189965922316"],
  "Community call topic": [],
  "Custom role": [],
} as const;

export const pattern = `buy-:itemName(${shopItems.map((i) => i.name).join("|")})`;

export default async function buy(
  interaction: MessageComponentInteraction,
  { itemName }: { itemName: (typeof shopItems)[number]["name"] },
) {
  const selectedItem = shopItems.find((item) => item.name === itemName);
  if (!selectedItem) return interaction.reply("Item not found", { ephemeral: true });
  const [{ credit }] = await Promise.all([
    cache.getDBUser(interaction.user.id),
    interaction.reply("Initiating purchase...", { ephemeral: true }),
  ]);
  if (credit < selectedItem.price) {
    return interaction.editReply("You don't have enough to buy that!");
  }
  if (blockedShoppers[selectedItem.name].includes(interaction.user.id as never)) {
    return interaction.editReply("You can't buy that!");
  }

  const threadPromise = openTicket(
    interaction.user,
    `Claim ${selectedItem.name.toLowerCase()}`,
    `${interaction.user.global_name} has purchased a ${selectedItem.name.toLowerCase()} and would like to claim it`,
    selectedItem.name === "Whitelist" ? ["&1232903620421484575"] : undefined,
  );
  return procrastinate(
    threadPromise,
    modCredit(interaction.user.id, selectedItem.price * -1, true),
    interaction.editReply(
      <Suspense fallback="Creating claim thread...">&lt;#{threadPromise.then((t) => t.id)}&gt;</Suspense>,
    ),
  );
}
