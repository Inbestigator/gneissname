import {
  handleRequest,
  setupCommands,
  setupComponents,
} from "@dressed/dressed/server";
import { commandData, componentData } from "@/../bot.gen";
import { waitUntil } from "@vercel/functions";

export function POST(req: Request) {
  const [runCommand, runComponent] = [
    setupCommands(commandData),
    setupComponents(componentData),
  ];
  return handleRequest(
    req,
    (i) => waitUntil(runCommand(i) as Promise<unknown>),
    (i) => waitUntil(runComponent(i) as Promise<unknown>),
  );
}
