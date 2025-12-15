import { Button, type CommandInteraction, Container, Section, TextDisplay } from "@dressed/react";
import type { CommandConfig } from "dressed";

export const shopItems = [
  {
    name: "Whitelist",
    description: "Apply to be whitelisted on the Gneissmp.",
    price: 2000,
  },
  {
    name: "Community call topic",
    description: "Pick a game/topic to be featured in the weekly community call.",
    price: 6000,
  },
  {
    name: "Custom role",
    description: "Get your own cosmetic role.",
    price: 10000,
  },
] as const;

export const config = {
  description: "Use your social credit to buy things",
} satisfies CommandConfig;

export default function shop(interaction: CommandInteraction) {
  return interaction.reply(
    <Container>
      ## Shop
      {shopItems.map((item) => (
        <Section
          key={item.name}
          accessory={<Button custom_id={`buy-${item.name}`} label={`$${item.price.toLocaleString()}`} />}
        >
          ### {item.name}
          {"\n"}
          {item.description}
        </Section>
      ))}
    </Container>,
    { ephemeral: true },
  );
}
