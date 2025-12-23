import { copyFileSync, watch } from "node:fs";
import { resolve } from "node:path";
import { parseCommands, parseComponents, parseEvents } from "dressed/build";
import { createServer } from "dressed/server";
import { serverConfig } from "dressed/utils";
import config from "./dressed.config.ts";
import { crawlDir } from "./node_modules/dressed/dist/utils/build.js"; // NOSONAR

Object.assign(serverConfig, config);

const files = await Promise.all(
  ["commands", "components", "events"].map(async (d) =>
    Promise.all(
      (await crawlDir("src/bot", d, config.build?.extensions)).map(async (f) => ({
        ...f,
        exports: await import(resolve(f.path)),
      })),
    ),
  ),
);

createServer(parseCommands(files[0] ?? []), parseComponents(files[1] ?? []), parseEvents(files[2] ?? []));

watch("./src", { recursive: true, persistent: true }, () => copyFileSync("bot-dev.ts", "bot-dev.ts"));
