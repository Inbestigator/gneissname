import type { Params } from "@dressed/matcher";
import type { ModalInteraction } from "@dressed/react";
import abseil, { removeNode } from "abseil";
import { prisma } from "@/db";
import { ProposalStage } from "./addQuestion";

export const pattern = "addAnswer-:isCorrect-:questionId";

export default async function addAnswer(interaction: ModalInteraction, args: Params<typeof pattern>) {
  const isCorrect = args.isCorrect === "true";
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
            correct: isCorrect,
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
    .next("TextDisplay"); // Incn

  if (!isCorrect && incorrect) {
    removeNode(incorrect);
  }

  await interaction.editReply(
    <ProposalStage components={components} id={triviaQ.id} isCorrect={false} stage={isLast ? "done" : "addAnswer"} />,
  );
}
