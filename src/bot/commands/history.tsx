import { type CommandInteraction, MediaGallery, MediaGalleryItem } from "@dressed/react";
import type { CreditRecord } from "@prisma/client";
import QuickChart from "chartjs-to-image";
import { type CommandConfig, CommandOption } from "dressed";
import { prisma } from "@/db";

export const config = {
  description: "Credit history",
  default_member_permissions: ["Administrator"],
  options: [CommandOption({ type: "User", name: "user", description: "User", required: true })],
  contexts: ["Guild"],
} satisfies CommandConfig;

function aggregateHistory(history: CreditRecord[]): CreditRecord[] {
  let aggregated: CreditRecord[] = [...history];

  while (aggregated.length > 250) {
    aggregated.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const newAggregated: CreditRecord[] = [];
    let i = 0;

    while (i < aggregated.length) {
      if (i + 1 < aggregated.length) {
        const curr = aggregated[i];
        const next = aggregated[i + 1];

        if (!curr || !next) continue;

        newAggregated.push({
          id: `${curr.id}-${next.id}`,
          change: curr.change + next.change,
          currentBalance: (curr.currentBalance + next.currentBalance) / 2,
          reason: null,
          timestamp: new Date(Math.min(curr.timestamp.getTime(), next.timestamp.getTime())),
          userId: curr.userId,
        });

        i += 2;
      } else {
        newAggregated.push(
          aggregated[i] ?? { change: 0, currentBalance: 0, id: "", timestamp: new Date(), userId: "" },
        );
        i += 1;
      }
    }

    aggregated = newAggregated;
  }

  return aggregated;
}

export default async function history(interaction: CommandInteraction<typeof config>) {
  await interaction.deferReply({ ephemeral: true });
  const { user } = interaction.options;

  const history = await prisma.creditRecord.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: "asc" },
  });

  const aggregatedHistory = aggregateHistory(history);

  const timestamps = aggregatedHistory.map((h) => h.timestamp.toISOString());
  const balances = aggregatedHistory.map((h) => h.currentBalance);

  const chart = new QuickChart();
  chart.setConfig({
    type: "line",
    data: {
      labels: timestamps,
      datasets: [{ label: "Credits", data: balances, borderColor: "red", fill: false }],
    },
    options: {
      title: { display: true, text: `${user.global_name}'s Credit History` },
      scales: { xAxes: [{ type: "time", time: { unit: "day", stepSize: 1 } }] },
    },
  });

  await interaction.editReply(
    <MediaGallery>
      <MediaGalleryItem media="attachment://credit-history.png" />
    </MediaGallery>,
    {
      files: [
        {
          name: "credit-history.png",
          data: await chart.toBinary(),
        },
      ],
    },
  );
}
