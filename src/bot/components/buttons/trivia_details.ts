import { editMessage, MessageComponentInteraction } from "dressed";
import {
  disableButtons,
  getTriviaSession,
  TriviaResponse,
} from "@/bot/commands/trivia";

export default async function triviaDetails(
  interaction: MessageComponentInteraction,
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
    if (
      triviaSession &&
      triviaSession.expiresAt < Date.now() &&
      interaction.message.components
    ) {
      editMessage(interaction.channel.id, interaction.message.id, {
        components: disableButtons(
          interaction.message.components,
          triviaSession.correct.id,
        ),
      });
    }
    return interaction.editReply("This question has expired!");
  }

  if (!responses.some((a) => a.userId === interaction.user.id)) {
    return interaction.editReply("You haven't answered yet!");
  }

  const barGraph = getEmojiBarGraph(responses, triviaSession.answerIds);
  await interaction.editReply(barGraph);
}

function getEmojiBarGraph(
  responses: TriviaResponse[],
  allAnswerIds: string[],
): string {
  const EMOJIS = ["🟩", "🟪", "🟨", "🟦"]; // One per answer column
  const EMPTY = "⬛";

  // Count responses per answerId
  const counts: Record<string, number> = {};
  for (const id of allAnswerIds) counts[id] = 0; // Ensure all answers are present
  for (const r of responses) counts[r.answerId]++;

  const total = responses.length;

  // Map answerIds to emojis (in original order of `allAnswerIds`)
  const emojiMap: Record<string, string> = {};
  allAnswerIds.forEach((id, i) => {
    emojiMap[id] = EMOJIS[i % EMOJIS.length];
  });

  // Compute bar heights (max 4 rows)
  const heights = allAnswerIds.map((id) =>
    total === 0 ? 0 : Math.round((counts[id] / total) * 4),
  );

  // Build 4xN graph from top (row 3) to bottom (row 0)
  const rows: string[] = [];
  for (let row = 3; row >= 0; row--) {
    const line = allAnswerIds
      .map((id, i) => (heights[i] > row ? emojiMap[id] : EMPTY))
      .join("");
    rows.push(line);
  }

  return rows.join("\n");
}
