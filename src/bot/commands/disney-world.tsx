import { CommandConfig } from "dressed";
import { CommandInteraction } from "@dressed/react";

export const config: CommandConfig = {
  description: "A beautiful park",
  contexts: ["Guild"],
};

export default async function disneyWorld(interaction: CommandInteraction) {
  if (interaction.user.id !== "761777382041714690") {
    return interaction.reply("[Object object]");
  }
}
