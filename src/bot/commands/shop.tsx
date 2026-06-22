import { Button, type CommandInteraction, Container, Section } from "@dressed/react";
import type { CommandConfig } from "dressed";
import { Suspense } from "react";
import { cache } from "@/db";
import { procrastinate } from "../utils";

export const shopItems = [
  { name: "Whitelist", description: "Apply to be whitelisted on the Gneissmp.", price: 2000 },
  {
    name: "Community call topic",
    description: "Pick a game/topic to be featured in the weekly community call.",
    price: 6000,
  },
  { name: "Custom role", description: "Get your own cosmetic role.", price: 10000 },
] as const;

export const config = {
  description: "Use your social credit to buy things",
} satisfies CommandConfig;

export default function shop(interaction: CommandInteraction) {
  const userPromise = cache.getDBUser(interaction.user.id);
  return procrastinate(
    userPromise,
    interaction.reply(
      <Container>
        ## Shop
        {shopItems.map((item) => (
          <Section
            key={item.name}
            accessory={
              <Suspense fallback={<PurchaseButton item={item} />}>
                {userPromise.then((u) => (
                  <PurchaseButton item={item} disabled={u.credit < item.price} />
                ))}
              </Suspense>
            }
          >
            ### {item.name}
            {"\n"}
            {item.description}
          </Section>
        ))}
      </Container>,
      { ephemeral: true },
    ),
  );
}

function PurchaseButton({ item, disabled }: { item: (typeof shopItems)[number]; disabled?: boolean }) {
  return <Button custom_id={`buy-${item.name}`} label={`$${item.price.toLocaleString()}`} disabled={disabled} />;
}
