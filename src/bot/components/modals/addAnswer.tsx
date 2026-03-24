import type { Params } from "@dressed/matcher";
import type { ModalSubmitInteraction } from "@dressed/react";
import abseil, { removeNode } from "abseil";
import { prisma } from "@/db";
import { ProposalStage } from "./addQuestion";

export const pattern = "addAnswer-:isTrue-:questionId";

export default async function addAnswer(interaction: ModalSubmitInteraction, args: Params<typeof pattern>) {
  const [triviaQ] = await Promise.all([
    prisma.trivia.update({
      where: {
        id: Number(args.questionId),
      },
      data: {
        answers: {
          create: {
            text: interaction.getField("text", true).textInput(),
            emoji: interaction.getField("emoji", true).textInput(),
            correct: args.isTrue === "true",
          },
        },
      },
      include: { answers: { select: { id: true } } },
    }),
    interaction.deferUpdate(),
  ]);

  const isLast = triviaQ.answers.length === 4;

  const components = interaction.message?.components ?? [];

  const incorrect = abseil(components)
    .initial("TextDisplay") //  Sgt
    .sibling("TextDisplay") //  Qtn
    .sibling("TextDisplay") //  Exp
    .sibling("TextDisplay") //  Cor
    .sibling("TextDisplay") //  Inc
    .sibling("TextDisplay"); // Incn

  if (!args.isTrue) {
    removeNode(incorrect);
  }

  await interaction.editReply(
    <ProposalStage components={components} id={triviaQ.id} isCorrect={false} stage={isLast ? "done" : "addAnswer"} />,
  );
}
