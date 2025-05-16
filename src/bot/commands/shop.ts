import {
  Button,
  CommandConfig,
  CommandInteraction,
  Container,
  Section,
  TextDisplay,
} from "dressed";
import { APIEmbed, MessageFlags } from "discord-api-types/v10";

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
  await interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      Container(
        TextDisplay("## Shop"),
        ...shopItems.map((item) =>
          Section(
            [`### ${item.name}`, item.description],
            Button({
              custom_id: `buy_${item.name.toLowerCase()}`,
              label: `$${item.price.toLocaleString()}`,
            }),
          ),
        ),
      ),
    ],
    ephemeral: true,
  });
}
