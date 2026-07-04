import { type CommandInteraction, Container } from "@dressed/react";
import { type CommandConfig, CommandOption } from "dressed";
import { Suspense } from "react";
import { cache, prisma } from "@/db";
import { procrastinate } from "../utils";

export const config = {
  description: "Snoop a user",
  default_member_permissions: ["Administrator"],
  options: [CommandOption({ name: "user", description: "User to snoop", type: "User", required: true })],
  contexts: ["Guild"],
} satisfies CommandConfig;

export default function userData(interaction: CommandInteraction<typeof config>) {
  const { user } = interaction.options;
  const userPromise = cache.getDBUser(user.id);
  const recordPromise = prisma.creditRecord.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: "desc" },
    take: 10,
  });
  interaction.reply(
    <Container>
      ## {user.global_name ?? user.username}&apos;s data{"\n"}
      ### Credit{"\n"}
      <Suspense fallback="…">{userPromise.then((u) => u.credit.toLocaleString())}</Suspense>
      {"\n"}
      ### Last 10 credit actions{"\n"}
      <Suspense fallback="…">
        {recordPromise.then((r) =>
          r
            .map((e) => {
              if (e.reason?.startsWith("POST:/credit/bulk")) {
                return ["💬", `Captured from \`${e.reason.split(":")[1]}\``];
              } else if (e.reason?.startsWith("POST")) {
                return ["🔌", `\`${e.reason.split(":")[1]}\``];
              } else if (e.reason?.startsWith("trivia")) {
                return [
                  "🧠",
                  e.reason.includes("/") && `https://discord.com/channels/750062409364013159/${e.reason.split(":")[1]}`,
                ];
              } else if (e.reason?.startsWith("buy")) {
                return ["🛍️", e.reason.split(":")[1]];
              } else if (e.reason?.startsWith("mod")) {
                return ["🛠️", `<@${e.reason.split(":")[1]}>: ${e.reason.split(":")[2]}`];
              }
              return ["❓", e.reason];
            })
            .map(([icon, subtext], i) => {
              const e = r[i];
              return `${icon} ${e.change > 0 ? "+" : "-"}${Math.abs(e.change).toLocaleString()} <t:${Math.floor(e.timestamp.getTime() / 1000)}:R> ${subtext ? `\n-# ⠀⠀⠀${subtext}` : ""}`;
            })
            .join("\n"),
        )}
      </Suspense>
    </Container>,
    { ephemeral: true },
  );
  return procrastinate(userPromise, recordPromise);
}
