import type { DressedConfig } from "@dressed/framework";
import { patchInteraction } from "@dressed/react";

const config: DressedConfig = {
  build: { root: "src/bot", include: ["**/*.{ts,tsx}"] },
  port: 3000,
  endpoint: "bot",
  middleware: {
    commands: (i) => [patchInteraction(i)],
    components: (i, a) => [patchInteraction(i), a],
  },
};

export default config;
