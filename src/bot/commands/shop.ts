import { getCredit } from "@/bot/utils";
import {
  ActionRow,
  Button,
  CommandConfig,
  CommandInteraction,
} from "@dressed/dressed";
import { APIEmbed } from "discord-api-types/v10";

export const shopItems = [
  {
    name: "Whitelist",
    description: "Apply to be whitelisted on the Gneissmp.",
    price: 2000,
  },
  {
    name: "Community call topic",
    description:
      "Pick a game/topic to be featured in the weekly community call.",
    price: 6000,
  },
  {
    name: "Custom role",
    description: "Get your own cosmetic role.",
    price: 10000,
  },
];

export const config: CommandConfig = {
  description: "Use your social credit to buy things",
};

export default async function shop(interaction: CommandInteraction) {
  const credit = await getCredit(interaction.user.id);

  const embed: APIEmbed = {
    title: "Shop",
    description: `Your social credit score is ${credit.toLocaleString()}`,
    fields: shopItems.map((item) => ({
      name: item.name,
      value: `>>> ${item.description}\nPrice: ${item.price.toLocaleString()}`,
    })),
  };

  await interaction.reply({
    embeds: [embed],
    components: [
      ActionRow(
        ...shopItems.map((item) =>
          Button({
            custom_id: `buy_${item.name.toLowerCase()}`,
            label: item.name,
            style: "Secondary",
          }),
        ),
      ),
    ],
    ephemeral: true,
  });
}
