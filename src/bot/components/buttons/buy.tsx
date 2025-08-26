import { modCredit } from "@/bot/utils";
import { shopItems } from "@/bot/commands/shop";
import { openTicket } from "../selects/ticket-open";
import { Params } from "@dressed/matcher";
import { MessageComponentInteraction } from "@dressed/react";
import { cache } from "@/db";

const blockedShoppers = {
  Whitelist: ["580638706805768203", "617635763974307859", "786737189965922316"],
  "Community call topic": [],
  "Custom role": [],
} as const;

export const pattern = "buy-:itemName";

export default async function buy(
  interaction: MessageComponentInteraction,
  { itemName }: Params<typeof pattern>,
) {
  await interaction.deferReply({ ephemeral: true });
  const selectedItem = shopItems.find(
    (item) => item.name.toLowerCase() === itemName,
  );
  if (!selectedItem) {
    return await interaction.editReply("Item not found");
  }
  const credit = await cache.getCredit(interaction.user.id);
  if (credit < selectedItem.price) {
    return await interaction.editReply("You don't have enough to buy that!");
  }
  if (
    blockedShoppers[selectedItem.name].includes(interaction.user.id as never)
  ) {
    return await interaction.editReply("You can't buy that!");
  }
  await modCredit(interaction.user.id, selectedItem.price * -1, true);
  const thread = await openTicket(
    `Claim ${selectedItem.name.toLowerCase()}`,
    `${interaction.user.global_name} has purchased a ${selectedItem.name.toLowerCase()} and would like to claim it`,
    selectedItem.name.toLowerCase() === "whitelist"
      ? ["1232903620421484575"]
      : undefined,
    interaction.user,
  );
  await interaction.editReply(`<#${thread.id}>`);
}
