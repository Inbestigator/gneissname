import {
  ActionRow,
  Button,
  type CommandConfig,
  type CommandInteraction,
  Container,
  createMessage,
  editMessage,
  getMessage,
  Section,
  Separator,
  TextDisplay,
} from "dressed";
import { prisma, redis } from "@/db";
import {
  APIButtonComponentWithCustomId,
  APIMessageTopLevelComponent,
  ComponentType,
  MessageFlags,
} from "discord-api-types/v10";
import { separateAnswers } from "../components/buttons/trivia-details-:a-:b-:c-:d";

export const config: CommandConfig = {
  description: "Gives a random trivia question",
  contexts: ["Guild"],
};

export interface TriviaResponse {
  answerId: string;
  isCorrect: boolean;
  userId: string;
}

export interface TriviaSession {
  correct: {
    id: string;
    text: string;
  };
  answerIds: string[];
  explanation: string;
  messageId: string;
  channelId: string;
  expiresAt: number;
  replaceableAt: number;
}

export async function getTriviaSession(): Promise<{
  session?: TriviaSession;
  responses: TriviaResponse[];
}> {
  const sessionJson = await redis.get("currentTrivia");
  const keys = await redis.keys("trivia-response:*");
  const responses = keys.length
    ? (await redis.mGet(keys)).map((v) => JSON.parse(v ?? ""))
    : [];
  if (!sessionJson) {
    return { responses };
  }
  return {
    session: JSON.parse(sessionJson),
    responses,
  };
}

export default async function trivia(interaction: CommandInteraction) {
  const [{ session: triviaSession, responses }, questions] = await Promise.all([
    getTriviaSession(),
    prisma.trivia.findMany({
      include: { answers: true },
      cacheStrategy: { swr: 1800, ttl: 1800 },
    }),
    interaction.deferReply({
      ephemeral: true,
    }),
  ]);
  if (triviaSession && triviaSession.replaceableAt > Date.now()) {
    return interaction.editReply("There is already a trivia game in progress!");
  } else if (triviaSession) {
    try {
      getMessage(triviaSession.channelId, triviaSession.messageId).then(
        ({ components }) => {
          if (!components) throw new Error("No components");
          editMessage(triviaSession.channelId, triviaSession.messageId, {
            components: markArchived(components),
          });
        },
      );
    } catch {
      // pass
    }
  }

  const question = questions[Math.floor(Math.random() * questions.length)];

  if (!question) {
    return interaction.editReply("Error fetching trivia question!");
  }

  const answers = question.answers.sort(() => Math.random() - 0.5);
  const correctN = answers.findIndex((a) => a.correct);

  const answerButtons = answers.map((answer, i) => {
    const encoded = encode(answer.id, correctN);
    return Button({
      emoji: answer.emoji
        ? {
            name: answer.emoji,
          }
        : undefined,
      label: answer.text,
      style: "Secondary",
      custom_id: `guess-${encode(encoded, i)}`,
      id: i * 3,
    });
  });

  interaction.editReply("Question sent!");

  const message = await createMessage(interaction.channel.id, {
    flags: MessageFlags.IsComponentsV2,
    components: [
      Container(
        TextDisplay(`## Trivia!\n${question.question}`),
        ActionRow(...answerButtons),
        Separator(),
        ResponsesSection([]),
      ),
    ],
  });

  const correct = question.answers.find((a) => a.correct);
  const newTriviaSession: TriviaSession = {
    channelId: interaction.channel.id,
    messageId: message.id,
    answerIds: answers.map((a) => a.id),
    correct: {
      id: correct?.id ?? "",
      text: correct?.text ?? "",
    },
    explanation: question.explanation,
    expiresAt: Date.now() + 45 * 60 * 1000,
    replaceableAt: Date.now() + 15 * 60 * 1000,
  };

  const multi = redis.multi();
  multi.set("currentTrivia", JSON.stringify(newTriviaSession));
  for (const response of responses) {
    multi.del(`trivia-response:${response.userId}`);
  }
  await multi.exec();
}

function DetailsButton(
  props = { custom_id: "trivia-details", disabled: false },
) {
  return Button({
    emoji: { name: "📊" },
    style: "Secondary",
    ...props,
  });
}

export function ResponsesSection(
  responses: TriviaResponse[],
  answerIds?: string[],
) {
  const numVoted = responses.length;
  const correctPercentage = (
    (responses.filter((a) => a.isCorrect).length / numVoted) *
    100
  ).toFixed(2);
  const incorrectPercentage = (100 - Number(correctPercentage)).toFixed(2);
  const barGraph =
    "🟩".repeat(Math.round(Number(correctPercentage) / 10)) +
    "🟥".repeat(Math.round(Number(incorrectPercentage) / 10));
  let counts;
  if (answerIds) {
    counts = separateAnswers(responses, answerIds);
  }

  return Section(
    [
      `## ${numVoted === 0 ? "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛" : barGraph} | ${numVoted}/15`,
    ],
    DetailsButton({
      disabled: !counts,
      custom_id: `trivia-details-${counts ? Object.values(counts).join("-") : ""}`,
    }),
  );
}

export function markArchived(
  components: APIMessageTopLevelComponent[],
): APIMessageTopLevelComponent[] {
  const container = components.find((c) => c.type === ComponentType.Container);

  if (!container || !container.components) return components;
  container.components.push(
    TextDisplay("-# This trivia has expired. However, you can still respond"),
  );

  return components;
}

export function getResponsesSection(components: APIMessageTopLevelComponent[]) {
  const row = components
    .find((c) => c.type === ComponentType.Container)
    ?.components.find((c) => c.type === 9);
  if (!row) throw new Error("No responses section");
  return row as ReturnType<typeof Section>;
}

function encode(input: string, modifier: number): string {
  const chars = Array.from(input).map((c) =>
    String.fromCharCode(c.charCodeAt(0) ^ modifier),
  );
  const encoded = chars.join("");
  const data = `${modifier}:${encoded}`;
  return btoa(data);
}

export function decode(encoded: string): {
  original: string;
  modifier: number;
} {
  const decoded = atob(encoded);
  const [modStr, transformed] = decoded.split(":", 2);
  const modifier = parseInt(modStr, 10);
  const original = Array.from(transformed)
    .map((c) => String.fromCharCode(c.charCodeAt(0) ^ modifier))
    .join("");
  return { original, modifier };
}
