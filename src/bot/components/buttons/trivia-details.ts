import { MessageComponentInteraction } from "dressed";
import { getTriviaSession, TriviaResponse } from "@/bot/commands/trivia";

export const pattern = "trivia-details-:a(\\d+)-:b(\\d+)-:c(\\d+)-:d(\\d+)";

export default async function triviaDetails(
  interaction: MessageComponentInteraction,
  args: {
    a: string;
    b: string;
    c: string;
    d: string;
  },
) {
  const [{ session: triviaSession, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({ ephemeral: true }),
  ]);

  if (
    !triviaSession ||
    triviaSession.messageId !== interaction.message.id ||
    triviaSession.expiresAt < Date.now()
  ) {
    const counts = [
      Number(args.a),
      Number(args.b),
      Number(args.c),
      Number(args.d),
    ];
    const persistedAnswerIds = Object.keys(args);
    const persistedResponses = [];

    for (let i = 0; i < counts.length && i < persistedAnswerIds.length; i++) {
      for (let j = 0; j < counts[i]; j++) {
        persistedResponses.push({
          answerId: persistedAnswerIds[i],
        } as TriviaResponse);
      }
    }
    await interaction.editReply(
      generateBarGraph(separateAnswers(persistedResponses, Object.keys(args))),
    );
    return;
  }

  if (!responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You haven't answered yet!");
  }

  await interaction.editReply(
    generateBarGraph(separateAnswers(responses, triviaSession.answerIds)),
  );
}

function generateBarGraph(counts: Record<string, number>): string {
  const EMOJIS = ["🟩", "🟪", "🟨", "🟦"];
  const EMPTY = "⬛";

  const total = Object.values(counts).reduce((p, v) => p + v, 0);

  const emojiMap: Record<string, string> = {};
  Object.keys(counts).forEach((id, i) => {
    emojiMap[id] = EMOJIS[i % EMOJIS.length];
  });

  const heights = Object.keys(counts).map((id) =>
    total === 0 ? 0 : Math.round((counts[id] / total) * 4),
  );

  const rows: string[] = [];
  for (let row = 3; row >= 0; row--) {
    const line = Object.keys(counts)
      .map((id, i) => (heights[i] > row ? emojiMap[id] : EMPTY))
      .join("");
    rows.push(line);
  }

  return rows.join("\n");
}

export function separateAnswers(
  responses: TriviaResponse[],
  allAnswerIds: string[],
) {
  const counts: Record<string, number> = {};
  for (const id of allAnswerIds) counts[id] = 0;
  for (const r of responses) counts[r.answerId]++;
  return counts;
}
