import type { Params } from "@dressed/matcher";
import type { ComponentInteraction } from "@dressed/react";
import { getTriviaSession } from "@/bot/commands/trivia";

export const pattern = "trivia-details-:a(\\d+){-:b(\\d+){-:c(\\d+){-:d(\\d+)}}}";

export default async function triviaDetails(interaction: ComponentInteraction, args: Params<typeof pattern>) {
  const { session, responses } = await getTriviaSession();

  if (
    session?.messageId === interaction.message.id &&
    responses.length < 10 &&
    !responses.some((a) => a.userId === interaction.user.id)
  ) {
    return interaction.reply("You haven't answered yet!", { ephemeral: true });
  }

  return interaction.showModal(
    generateBarGraph([args.a, args.b, args.c, args.d].map(Number).filter(Number.isInteger)),
    { custom_id: "noop", title: "Responses" },
  );
}

const emojis = ["🟩", "🟪", "🟨", "🟦"];

function generateBarGraph(counts: number[], height = 4) {
  const total = counts.reduce((sum, value) => sum + value, 0);
  const heights = total === 0 ? [0, 0, 0, 0] : counts.map((count) => Math.round((count / total) * height));
  const rows: string[] = [];

  for (let row = height - 1; row >= 0; --row) {
    let line = "";
    for (let i = 0; i < counts.length; ++i) {
      line += heights[i] > row ? emojis[i % emojis.length] : "⬛";
    }
    rows.push(line);
  }

  return rows.join("\n");
}
