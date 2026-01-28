import type { DressedConfig } from "@dressed/framework";
import { patchInteraction } from "@dressed/react";

export default {
  build: { root: "src/bot", extensions: ["tsx", "ts"] },
  port: 3000,
  endpoint: "bot",
  middleware: {
    commands: (i) => [patchInteraction(i)],
    components: (i, a) => [patchInteraction(i), a],
  },
} satisfies DressedConfig;
