import {
  type CommandConfig,
  TextDisplay as DressedTextDisplay,
  editMessage as dressedEditMessage,
} from "dressed";
import { prisma, redis } from "@/db";
import { APIMessage, ComponentType } from "discord-api-types/v10";
import { separateAnswers } from "../components/buttons/trivia-details";
import { hash } from "node:crypto";
import {
  ActionRow,
  Button,
  CommandInteraction,
  Container,
  createMessage,
  editMessage,
  Section,
  Separator,
  TextDisplay,
} from "@dressed/react";
import { Answer, Trivia } from "@prisma/client";

export const config: CommandConfig = {
  description: "Gives a random trivia question",
  contexts: ["Guild"],
};

export interface TriviaResponse {
  answerId: string;
  isCorrect: boolean;
  userId: string;
  timestamp: number;
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

function shuffle<T extends unknown[]>(array: T): T {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result as T;
}

async function getNextGame(): Promise<TriviaSession["game"]> {
  async function fetchNext(list: (number | TriviaSession["game"])[]) {
    const cacheTime = 12 * 60 * 60;
    if (list.length === 0) {
      const games = await prisma.trivia.findMany({
        select: { id: true },
        cacheStrategy: { swr: cacheTime, ttl: cacheTime },
      });
      list = shuffle(games.map((g) => g.id));
    }
    const next = list.pop();
    if (typeof next !== "number") return;
    const nextGame = await prisma.trivia.findFirstOrThrow({
      where: { id: next },
      include: { answers: true },
      cacheStrategy: { swr: cacheTime, ttl: cacheTime },
    });
    list.push(nextGame);
    await redis.set("trivia-order", JSON.stringify(list));
    return list;
  }
  let listJson = await redis.get("trivia-order");
  if (!listJson) {
    listJson = JSON.stringify(await fetchNext([]));
  }
  const list = JSON.parse(listJson!);
  const game = list.pop();
  fetchNext(list);
  return game;
}

export default async function trivia(interaction: CommandInteraction) {
  const [{ session: currentSession, responses }] = await Promise.all([
    getTriviaSession(),
    interaction.deferReply({
      ephemeral: true,
    }),
  ]);
  if (currentSession && currentSession.replaceableAt > Date.now()) {
    return interaction.editReply(
      <>
        <TextDisplay>There is already a trivia game in progress!</TextDisplay>
        -# Replaceable &lt;t:{Math.round(currentSession.replaceableAt / 1000)}
        :R&gt;
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
      editMessage(
        currentSession.channelId,
        currentSession.messageId,
        <TriviaGame
          game={currentSession.game}
          correctHash={currentSession.correct.hashed}
          responses={responses}
          isArchived
        />,
      );
    } catch {
      // pass
    }
  }

  const game = await getNextGame();

  if (!game) {
    return interaction.editReply("Error starting trivia game!");
  }

  const answers = game.answers.sort(() => Math.random() - 0.5);
  const correct = answers.find((a) => a.correct) ?? { id: "", text: "" };

  const correctHash = hash("sha1", correct.id, "hex").slice(0, 8);

  interaction.editReply("Question sent!");

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

  const message = await createMessage(
    interaction.channel.id,
    <TriviaGame game={session.game} correctHash={correctHash} responses={[]} />,
  );

  session.messageId = message.id;

  const multi = redis.multi();
  multi.set("currentTrivia", JSON.stringify(session));
  for (const response of responses) {
    multi.del(`trivia-response:${response.userId}`);
  }
  await multi.exec();
}

export function TriviaGame({
  game,
  correctHash,
  responses,
  isArchived,
}: {
  game: TriviaSession["game"];
  correctHash: string;
  responses: TriviaResponse[];
  isArchived?: boolean;
}) {
  return (
    <Container>
      <TextDisplay>## Trivia!</TextDisplay>
      {game.question}
      <ActionRow>
        {game.answers.map((answer, i) => (
          <Button
            key={i}
            emoji={{
              name: answer.emoji ?? undefined,
            }}
            custom_id={`guess-${correctHash}-${answer.id}`}
            label={answer.text}
            style="Secondary"
          />
        ))}
      </ActionRow>
      <Separator />
      <ResponsesSection
        responses={responses}
        answerIds={game.answers.map((a) => a.id)}
      />
      {isArchived &&
        "-# This trivia has expired. However, you can still respond"}
    </Container>
  );
}

function ResponsesSection({
  responses,
  answerIds,
}: {
  responses: TriviaResponse[];
  answerIds: string[];
}) {
  const counts = separateAnswers(responses, answerIds);

  return (
    <Section
      accessory={
        <Button
          emoji={{ name: "📊" }}
          style="Secondary"
          disabled={Math.max(...counts) === 0}
          custom_id={`trivia-details-${counts ? counts.join("-") : ""}`}
        />
      }
    >
      <TextDisplay>
        ##{" "}
        {"🟩"
          .repeat(responses.filter((r) => r.isCorrect).length)
          .padEnd(responses.length * 2, "🟥")
          .padEnd(10 + responses.length, "⬛")}
      </TextDisplay>
    </Section>
  );
}

export async function markArchived(message: APIMessage) {
  const { components = [] } = message;
  const container = components.find((c) => c.type === ComponentType.Container);

  if (
    !container ||
    !container.components ||
    container.components.at(-1)?.type === 10
  )
    return;
  container.components.push(
    DressedTextDisplay(
      "-# This trivia has expired. However, you can still respond",
    ),
  );
  await dressedEditMessage(message.channel_id, message.id, { components });
}
