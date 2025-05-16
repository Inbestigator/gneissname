import createHandler from "@dressed/next";
// import { commands, components, events } from "@/../bot.gen";

export const POST = (r: Request) => {
  console.log("Here");
  const handler = createHandler([], [], []);
  console.log("Down here");
  return handler(r);
};
