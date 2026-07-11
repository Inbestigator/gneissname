import type { ModalInteraction } from "@dressed/react";
import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import suggestTrivia from "@/bot/components/modals/suggestTrivia";

const Suggestion = type({
  question: "string",
  explanation: "string",
  answers: type({ text: "string", "emoji?": "string", correct: "boolean" }).array(),
});

function validateAnswers(answers: (typeof Suggestion.infer)["answers"]) {
  if (answers.length !== 4) return `answers must have exactly 4 items (had ${answers.length})`;
  const correctCount = answers.filter((a) => a.correct).length;
  if (correctCount !== 1) return `answers must have exactly 1 correct answer (had ${correctCount})`;
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = Suggestion(json);
  if (parsed instanceof type.errors) return new NextResponse(parsed.summary, { status: 400 });
  const error = validateAnswers(parsed.answers);
  if (error) return new NextResponse(error, { status: 400 });
  const [correct, ...incorrects] = parsed.answers.sort((a, b) => +b.correct - +a.correct);
  await suggestTrivia({
    user: {},
    reply() {},
    getField: (key: string) => ({
      textInput() {
        switch (key) {
          case "question":
            return parsed.question;
          case "explanation":
            return parsed.explanation;
          case "true":
            return (correct.emoji ? `\`${correct.emoji}\` ` : "") + correct.text;
          case "false":
            return incorrects.map((a) => (a.emoji ? `\`${a.emoji}\` ` : "") + a.text).join("\n");
        }
      },
    }),
  } as unknown as ModalInteraction);
  return new NextResponse(null, { status: 204 });
}
