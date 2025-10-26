import type { CommandInteraction } from "@dressed/react";
import type { CommandConfig } from "dressed";

export const config = {
  description: "A beautiful park",
  contexts: ["Guild"],
} satisfies CommandConfig;

export default async function disneyWorld(interaction: CommandInteraction) {
  if (interaction.user.id !== "761777382041714690") {
    return interaction.reply("[Object object]", { ephemeral: true });
  }
}
