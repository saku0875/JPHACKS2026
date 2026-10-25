import "server-only";
import { PET_BOTTLE } from "./builtin";
import type { CustomRequest, QuestionsRequest } from "./request";
import type { Question, Recognition } from "./schema";
import { validateQuestion } from "./validate";

export type QuestionsResponse = {
  recognition: Recognition;
  questions: Question[];
  /** AI を使わない見本の問いのとき true */
  demo?: boolean;
};
export type CustomResponse = {
  recognition: Recognition;
  answerable: boolean;
  reason: string | null;
  question: Question | null;
};

// 発表デモ用：写真は AI に送らない。どんな写真でも「ペットボトル」と して、用意した問いを返す
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// 「さがしているよ」の画面が一瞬で消えないよう、すこしだけ待つ
const DEMO_WAIT_MS = 1500;

function keepValid(questions: Question[]): Question[] {
  const valid: Question[] = [];
  for (const q of questions) {
    const result = validateQuestion(q);
    if (result.ok) valid.push(result.question);
  }
  return valid;
}

export class NoValidQuestionError extends Error {}

export async function generateQuestions(input: QuestionsRequest): Promise<QuestionsResponse> {
  void input; // 写真や学年は使わない
  await wait(DEMO_WAIT_MS);
  const questions = keepValid(PET_BOTTLE.questions);
  if (questions.length === 0) throw new NoValidQuestionError();
  return { recognition: { label: PET_BOTTLE.label, canAsk: true }, questions };
}

export async function generateCustom(input: CustomRequest): Promise<CustomResponse> {
  void input;
  await wait(DEMO_WAIT_MS);
  return {
    recognition: { label: PET_BOTTLE.label, canAsk: true },
    answerable: false,
    reason: "この デモでは、じぶんで かいた はてなは つかえないよ。「3つから えらぶ」の はてなを えらんでね",
    question: null,
  };
}
