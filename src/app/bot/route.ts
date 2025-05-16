import {
  handleRequest,
  setupCommands,
  setupComponents,
  setupEvents,
} from "dressed/server";
import { commands, components, events } from "@/../bot.gen";
import { waitUntil } from "@vercel/functions";

export function POST(req: Request) {
  const [runCommand, runComponent, runEvent] = [
    setupCommands(commands),
    setupComponents(components),
    setupEvents(events),
  ];
  return handleRequest(
    req,
    async (i) => waitUntil(runCommand(i)),
    async (i) => waitUntil(runComponent(i)),
    async (e) => waitUntil(runEvent(e)),
  );
}
