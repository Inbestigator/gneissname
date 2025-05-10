import { prisma } from "@/db";
import { getUser } from "@/bot/utils";
import QuickChart from "chartjs-to-image";
import { CommandConfig, CommandInteraction } from "@dressed/dressed";
import { PermissionFlagsBits } from "discord-api-types/v10";

export const config: CommandConfig = {
  description: "Credit history",
  default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  options: [
    {
      type: 6,
      name: "user",
      description: "User",
      required: true,
    },
  ],
  contexts: ["Guild"],
};

interface CreditRecord {
  id: string;
  change: number;
  currentBalance: number;
  timestamp: Date;
  userId: string;
}

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

        const averageBalance = (curr.currentBalance + next.currentBalance) / 2;
        const combinedChange = curr.change + next.change;

        newAggregated.push({
          id: `${curr.id}-${next.id}`,
          change: combinedChange,
          currentBalance: averageBalance,
          timestamp:
            curr.timestamp < next.timestamp ? curr.timestamp : next.timestamp,
          userId: curr.userId,
        });

        i += 2;
      } else {
        newAggregated.push(
          aggregated[i] ?? {
            change: 0,
            currentBalance: 0,
            id: "",
            timestamp: new Date(),
            userId: "",
          },
        );
        i += 1;
      }
    }

    aggregated = newAggregated;
  }

  return aggregated;
}

export default async function history(interaction: CommandInteraction) {
  await interaction.deferReply({ ephemeral: true });
  const userId = interaction.getOption("user", true).user().id;

  const history: {
    id: string;
    change: number;
    currentBalance: number;
    timestamp: Date;
    userId: string;
  }[] = await prisma.creditRecord.findMany({
    where: { userId },
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
      datasets: [
        {
          label: "Credits",
          data: balances,
          borderColor: "red",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `${
          interaction.getOption("user", true).user().global_name
        }'s Credit History`,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",
              stepSize: 1,
            },
          },
        ],
      },
    },
  });

  await interaction.editReply({
    files: [
      {
        name: "credit-history.png",
        data: await chart.toBinary(),
      },
    ],
  });
}
