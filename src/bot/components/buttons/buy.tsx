import type { Params } from "@dressed/matcher";
import type { MessageComponentInteraction } from "@dressed/react";
import { shopItems } from "@/bot/commands/shop";
import { modCredit } from "@/bot/utils";
import { cache } from "@/db";
import { openTicket } from "../selects/ticket-open";

const blockedShoppers = {
  Whitelist: ["580638706805768203", "786737189965922316"],
  "Community call topic": [],
  "Custom role": [],
} as const;

export const pattern = "buy-:itemName";

export default async function buy(interaction: MessageComponentInteraction, { itemName }: Params<typeof pattern>) {
  const selectedItem = shopItems.find((item) => item.name === itemName);
  if (!selectedItem) {
    return interaction.editReply("Item not found");
  }
  const { credit } = await cache.getDBUser(interaction.user.id);
  if (credit < selectedItem.price) {
    return interaction.editReply("You don't have enough to buy that!");
  }
  if (blockedShoppers[selectedItem.name].includes(interaction.user.id as never)) {
    return interaction.editReply("You can't buy that!");
  }
  const [thread] = await Promise.all([
    openTicket(
      interaction.user,
      `Claim ${selectedItem.name.toLowerCase()}`,
      `${interaction.user.global_name} has purchased a ${selectedItem.name.toLowerCase()} and would like to claim it`,
      selectedItem.name === "Whitelist" ? ["&1232903620421484575"] : undefined,
    ),
    modCredit(interaction.user.id, selectedItem.price * -1, true),
    interaction.deferReply({ ephemeral: true }),
  ]);
  await interaction.editReply(`<#${thread.id}>`);
}
