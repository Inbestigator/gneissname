import { getTriviaSession, TriviaResponse } from "@/bot/commands/trivia";
import { Params } from "@dressed/matcher";
import { MessageComponentInteraction } from "@dressed/react";

export const pattern =
  "trivia-details-:a(\\d+){-:b(\\d+){-:c(\\d+){-:d(\\d+)}}}";

export default async function triviaDetails(
  interaction: MessageComponentInteraction,
  args: Params<typeof pattern>,
) {
  const [{ session, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({ ephemeral: true }),
  ]);

  if (
    !session ||
    session.messageId !== interaction.message.id ||
    session.expiresAt < Date.now()
  ) {
    const counts = [Number(args.a)];
    if (args.b) {
      counts.push(Number(args.b));
      if (args.c) {
        counts.push(Number(args.c));
        if (args.d) {
          counts.push(Number(args.d));
        }
      }
    }
    await interaction.editReply(generateBarGraph(counts));
    return;
  }

  if (!responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You haven't answered yet!");
  }

  await interaction.editReply(
    generateBarGraph(
      separateAnswers(
        responses,
        session.game.answers.map((a) => a.id),
      ),
    ),
  );
}

function generateBarGraph(counts: number[], height = 4): string {
  const emojis = ["🟩", "🟪", "🟨", "🟦"];

  const total = counts.reduce((sum, value) => sum + value, 0);

  const heights =
    total === 0
      ? [0, 0, 0, 0]
      : counts.map((count) => Math.round((count / total) * height));

  const rows: string[] = [];
  for (let row = height - 1; row >= 0; row--) {
    let line = "";
    for (let i = 0; i < counts.length; i++) {
      line += heights[i] > row ? emojis[i % emojis.length] : "⬛";
    }
    rows.push(line);
  }

  return rows.join("\n");
}

export function separateAnswers(
  responses: TriviaResponse[],
  order: string[],
): number[] {
  const countsMap = responses.reduce(
    (acc, entry) => {
      if (!acc[entry.answerId]) {
        acc[entry.answerId] = 0;
      }
      acc[entry.answerId]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  return order.map((id) => countsMap[id] || 0);
}
