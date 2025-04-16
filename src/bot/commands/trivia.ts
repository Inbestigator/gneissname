import {
  ActionRow,
  Button,
  type CommandConfig,
  type CommandInteraction,
  createMessage,
  editMessage,
  getMessage,
} from "@dressed/dressed";
import { prisma } from "@/db";
import { disableButtons } from "../components/buttons/guess_[session]_[answer]";
import { APIButtonComponentWithCustomId } from "discord-api-types/v10";

export const config: CommandConfig = {
  description: "Gives a random trivia question",
  contexts: ["Guild"],
};

export type TriviaResponses = Record<string, boolean>;

export default async function trivia(interaction: CommandInteraction) {
  const [[triviaSession, questions]] = await Promise.all([
    prisma.$transaction([
      prisma.triviaSession.findFirst({
        orderBy: { startedAt: "desc" },
        include: { trivia: { include: { answers: true } } },
      }),
      prisma.trivia.findMany({
        include: { answers: true },
        cacheStrategy: { swr: 1800, ttl: 1800 },
      }),
    ]),
    interaction.deferReply({
      ephemeral: true,
    }),
  ]);
  if (
    triviaSession &&
    triviaSession.startedAt.getTime() > Date.now() - 5 * 60 * 1000
  ) {
    return interaction.editReply("There is a trivia game already in progress!");
  } else if (triviaSession) {
    try {
      const message = await getMessage(
        triviaSession.channelId,
        triviaSession.messageId,
      );
      const disabledButtons = disableButtons(
        message.components![0]!.components as APIButtonComponentWithCustomId[],
        triviaSession.trivia.answers.find((a) => a.correct)?.id ?? "",
      );
      editMessage(triviaSession.channelId, triviaSession.messageId, {
        components: [ActionRow(...disabledButtons)],
      });
    } catch {
      // pass
    }
  }

  const question = questions[Math.floor(Math.random() * questions.length)];
  const sessionId = crypto.randomUUID();

  if (!question) {
    return interaction.editReply("Error fetching trivia question!");
  }

  const buttons = question.answers
    .sort(() => Math.random() - 0.5)
    .map((answer) =>
      Button({
        label: answer.text,
        emoji: {
          name: answer.emoji ?? undefined,
        },
        custom_id: `guess_${sessionId}_${answer.id}`,
      }),
    );

  interaction.editReply("Question sent!");

  const message = await createMessage(interaction.channel.id, {
    content: `## Trivia!\n>>> ${question.question}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ | 0/15`,
    components: [ActionRow(...buttons)],
  });

  prisma.$transaction([
    prisma.triviaSession.deleteMany({
      where: {
        startedAt: {
          lte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    }),
    prisma.triviaSession.create({
      data: {
        id: sessionId,
        triviaId: question.id,
        messageId: message.id,
        channelId: message.channel_id,
      },
    }),
  ]);
}
