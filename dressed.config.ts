import type { DressedConfig } from "@dressed/framework";
import { patchInteraction } from "@dressed/react";

const config: DressedConfig = {
  server: { endpoint: "bot" },
  build: { root: "src/bot", include: ["**/*.{ts,tsx}"] },
  hooks: { onBeforeCommand: (i) => [patchInteraction(i)], onBeforeComponent: (i, a) => [patchInteraction(i), a] },
};

export default config;
