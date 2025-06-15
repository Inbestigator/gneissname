import {
  type CommandConfig,
  editMessage,
  getMessage,
  TextDisplay as DressedTextDisplay,
  Section as DressedSection,
} from "dressed";
import { prisma, redis } from "@/db";
import {
  APIMessageTopLevelComponent,
  ComponentType,
  MessageFlags,
} from "discord-api-types/v10";
import { separateAnswers } from "../components/buttons/trivia-details";
import { createHash } from "node:crypto";
import {
  ActionRow,
  Button,
  CommandInteraction,
  Container,
  createMessage,
  render,
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

export default async function trivia(interaction: CommandInteraction) {
  const [{ session: currentSession, responses }, games] = await Promise.all([
    getTriviaSession(),
    prisma.trivia.findMany({
      include: { answers: true },
      cacheStrategy: { swr: 1800, ttl: 1800 },
    }),
    interaction.deferReply({
      ephemeral: true,
    }),
  ]);
  if (currentSession && currentSession.replaceableAt > Date.now()) {
    return interaction.editReply("There is already a trivia game in progress!");
  } else if (currentSession) {
    try {
      getMessage(currentSession.channelId, currentSession.messageId).then(
        ({ components }) => {
          if (!components) throw new Error("No components");
          editMessage(currentSession.channelId, currentSession.messageId, {
            components: markArchived(components),
          });
        },
      );
    } catch {
      // pass
    }
  }

  const game = games[Math.floor(Math.random() * games.length)];

  if (!game) {
    return interaction.editReply("Error starting trivia game!");
  }

  const answers = game.answers.sort(() => Math.random() - 0.5);
  const correct = answers.find((a) => a.correct);

  if (!correct) {
    console.error("No correct id");
    return;
  }

  const hashedCorrect = createHash("sha1")
    .update(correct.id)
    .digest("hex")
    .slice(0, 8);

  interaction.editReply("Question sent!");

  const session: TriviaSession = {
    game: { ...game, answers },
    channelId: interaction.channel.id,
    messageId: "null",
    correct: {
      id: correct.id,
      text: correct.text,
      hashed: hashedCorrect,
    },
    expiresAt: Date.now() + 45 * 60 * 1000,
    replaceableAt: Date.now() + 15 * 60 * 1000,
  };

  const message = await createMessage(
    interaction.channel.id,
    <TriviaGame session={session} responses={[]} />,
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
  session,
  responses,
  isArchived,
}: {
  session: TriviaSession;
  responses: TriviaResponse[];
  isArchived?: boolean;
}) {
  return (
    <Container>
      ## Trivia!
      {session.game.question}
      <ActionRow>
        {session.game.answers.map((answer, i) => (
          <Button
            key={i}
            emoji={{
              name: answer.emoji ?? undefined,
            }}
            custom_id={`guess-${session.correct.hashed}-${answer.id}`}
            label={answer.text}
            style="Secondary"
          />
        ))}
      </ActionRow>
      <Separator />
      <ResponsesSection responses={responses} isArchived={isArchived} />
    </Container>
  );
}

function ResponsesSection({
  responses,
  answerIds,
  isArchived,
}: {
  responses: TriviaResponse[];
  answerIds?: string[];
  isArchived?: boolean;
}) {
  const numVoted = responses.length;
  const correctPercentage = (
    (responses.filter((a) => a.isCorrect).length / numVoted) *
    100
  ).toFixed(2);
  const incorrectPercentage = (100 - Number(correctPercentage)).toFixed(2);
  const barGraph =
    "🟩".repeat(Math.round(Number(correctPercentage) / 10)) +
    "🟥".repeat(Math.round(Number(incorrectPercentage) / 10));
  const counts = answerIds
    ? separateAnswers(responses, answerIds)
    : [0, 0, 0, 0];

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
        ## {numVoted === 0 ? "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛" : barGraph} | {numVoted}/15
      </TextDisplay>
      {isArchived &&
        "-# This trivia has expired. However, you can still respond"}
    </Section>
  );
}

export function markArchived(
  components: APIMessageTopLevelComponent[],
): APIMessageTopLevelComponent[] {
  const container = components.find((c) => c.type === ComponentType.Container);

  if (
    !container ||
    !container.components ||
    container.components.at(-1)?.type === 10
  )
    return components;
  container.components.push(
    DressedTextDisplay(
      "-# This trivia has expired. However, you can still respond",
    ),
  );

  return components;
}
