import { prisma } from "@/db";
import { Params } from "@dressed/matcher";
import { ModalSubmitInteraction } from "@dressed/react";
import { ProposalStage } from "./addQuestion";

export const pattern = "addAnswer-:isTrue-:questionId";

export default async function addAnswer(
  interaction: ModalSubmitInteraction,
  args: Params<typeof pattern>,
) {
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
            correct: args.isTrue == "true",
          },
        },
      },
      include: { answers: { select: { id: true } } },
    }),
    interaction.deferUpdate(),
  ]);

  const isLast = triviaQ.answers.length === 4;

  await interaction.editReply(
    <ProposalStage
      components={interaction.message?.components}
      id={triviaQ.id}
      isCorrect={false}
      stage={isLast ? "done" : "addAnswer"}
    />,
  );
}
