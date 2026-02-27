import { hash } from "node:crypto";
import {
  ActionRow,
  Button,
  type CommandInteraction,
  Container,
  createMessage,
  editMessage,
  Section,
  Separator,
} from "@dressed/react";
import type { Answer, Trivia } from "@prisma/client";
import { type APIMessage, ComponentType } from "discord-api-types/v10";
import {
  type CommandConfig,
  TextDisplay as DressedTextDisplay,
  deleteAppEmoji,
  editMessage as dressedEditMessage,
  listAppEmojis,
} from "dressed";
import { prisma, redis } from "@/db";
import { separateAnswers } from "../components/buttons/trivia-details";

export const config = {
  description: "Gives a random trivia question",
  contexts: ["Guild"],
} satisfies CommandConfig;

export interface TriviaResponse {
  answerId: string;
  isCorrect: boolean;
  userId: string;
  timestamp: number;
  symbol: `<:${string}:${string}>`;
}

export interface TriviaSession {
  game: Trivia & {
    answers: Answer[];
  };
  correct: {
    id: string;
    text: string;
    hashed: string;
  };
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
  const responses = keys.length ? (await redis.mGet(keys)).map((v) => JSON.parse(v ?? "")) : [];
  if (!sessionJson) {
    return { responses };
  }
  return {
    session: JSON.parse(sessionJson),
    responses,
  };
}

function shuffle<T extends unknown[]>(array: T): T {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result as T;
}

async function getNextGame(): Promise<TriviaSession["game"] & { next: () => Promise<void> }> {
  async function fetchNext(list: (number | TriviaSession["game"])[]) {
    if (list.length === 0) {
      const games = await prisma.trivia.findMany({ select: { id: true } });
      list = shuffle(games.map((g) => g.id));
    }
    const next = list.pop();
    if (typeof next !== "number") return;
    const nextGame = await redis.get(`trivia-game:${next}`);
    if (nextGame) {
      list.push(JSON.parse(nextGame));
    } else {
      const game = await prisma.trivia.findFirstOrThrow({ where: { id: next }, include: { answers: true } });
      await redis.set(`trivia-game:${next}`, JSON.stringify(game));
      list.push(game);
    }
    await redis.set("trivia-order", JSON.stringify(list));
    return list;
  }
  const listJson = (await redis.get("trivia-order")) ?? JSON.stringify(await fetchNext([]));
  const list = JSON.parse(listJson);
  const game = list.pop();
  return { ...game, next: () => fetchNext(list) };
}

export default async function trivia(interaction: CommandInteraction) {
  const [{ session: currentSession, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({ ephemeral: true }),
  ]);
  if (currentSession && currentSession.replaceableAt > Date.now() && responses.length < 10) {
    return interaction.editReply(
      <>
        There is already a trivia game in progress!{"\n"}
        -# Replaceable &lt;t:{Math.round(currentSession.replaceableAt / 1000)}:R&gt;
        <ActionRow>
          <Button
            url={`https://discord.com/channels/750062409364013159/${currentSession.channelId}/${currentSession.messageId}`}
            label="See trivia"
          />
        </ActionRow>
      </>,
    );
  } else if (currentSession) {
    try {
      await editMessage(
        currentSession.channelId,
        currentSession.messageId,
        <TriviaGame
          game={currentSession.game}
          correctHash={currentSession.correct.hashed}
          responses={responses}
          isArchived
        />,
      );
    } catch {}
  }

  const game = await getNextGame();

  if (!game) return interaction.editReply("Error starting trivia game!");

  const answers = game.answers.toSorted(() => Math.random() - 0.5);
  const correct = answers.find((a) => a.correct) ?? { id: "", text: "" };

  const correctHash = hash("sha1", correct.id, "hex").slice(0, 8);

  const session: TriviaSession = {
    game: { ...game, answers },
    channelId: interaction.channel.id,
    messageId: "null",
    correct: {
      id: correct.id,
      text: correct.text,
      hashed: correctHash,
    },
    expiresAt: Date.now() + 45 * 60 * 1000,
    replaceableAt: Date.now() + 15 * 60 * 1000,
  };
  const [message] = await Promise.all([
    createMessage(interaction.channel.id, <TriviaGame game={session.game} correctHash={correctHash} responses={[]} />),
    interaction.editReply("Question sent!"),
  ]);

  session.messageId = message.id;

  const multi = redis.multi();
  multi.set("currentTrivia", JSON.stringify(session));
  for (const response of responses) {
    multi.del(`trivia-response:${response.userId}`);
  }
  await Promise.all([
    multi.exec(),
    game.next(),
    listAppEmojis().then(({ items }) =>
      Promise.all(
        items
          .filter((i) => i.name.startsWith("ts_") && !i.name.startsWith(`ts_${session.messageId}_`))
          .map((i) => deleteAppEmoji(i.id)),
      ),
    ),
  ]);
}

export function TriviaGame({
  game,
  correctHash,
  responses,
  isArchived,
}: Readonly<{
  game: TriviaSession["game"];
  correctHash: string;
  responses: TriviaResponse[];
  isArchived?: boolean;
}>) {
  return (
    <Container>
      <Section accessory={<Button emoji={{ name: "💡" }} custom_id="suggest" style="Secondary" />}>## Trivia!</Section>
      {game.question}
      <ActionRow>
        {game.answers.map((answer) => (
          <Button
            key={answer.id}
            emoji={{ name: answer.emoji }}
            custom_id={`guess-${correctHash}-${answer.id}`}
            label={answer.text}
            style="Secondary"
          />
        ))}
      </ActionRow>
      <Separator />
      <ResponsesSection responses={responses} answerIds={game.answers.map((a) => a.id)} />
      {isArchived && "-# This trivia has expired. However, you can still respond"}
    </Container>
  );
}

function ResponsesSection({ responses, answerIds }: Readonly<{ responses: TriviaResponse[]; answerIds: string[] }>) {
  const counts = separateAnswers(responses, answerIds);
  return (
    <Section
      accessory={
        <Button
          emoji={{ name: "📊" }}
          disabled={responses.length === 0}
          custom_id={`trivia-details-${counts ? counts.join("-") : ""}`}
          style="Secondary"
        />
      }
    >
      ##{" "}
      {responses
        .sort((a, b) => Number(b.isCorrect) - Number(a.isCorrect) || a.timestamp - b.timestamp)
        .map((r) => r.symbol)}
      {"⚫".repeat(10 - responses.length)}
    </Section>
  );
}

export function markArchived(message: APIMessage) {
  const { channel_id, components = [], id } = message;
  const container = components.find((c) => c.type === ComponentType.Container);
  if (!container?.components || container.components.at(-1)?.type === 10) return;
  container.components.push(DressedTextDisplay("-# This trivia has expired. However, you can still respond"));
  return dressedEditMessage(channel_id, id, { components });
}
