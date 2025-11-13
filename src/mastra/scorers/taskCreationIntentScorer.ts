import { createScorer } from "@mastra/core/scores";
import { z } from "zod";
import { taskCreationIntentScorerBaseInstruction, taskCreationIntentScorerSystemPrompt } from "../prompts/scorers/taskCreationIntentScorer";

type In  = { prompt: string };
type Out = { text: string };

export const taskCreationIntentScorer = createScorer<In, Out>({
  name: "taskCreationIntentScorer",
  description: "Scores how much the user wants to create a task",
  type: "agent",
  judge: {
    model: 'openai/gpt-4o-mini',
    instructions: taskCreationIntentScorerBaseInstruction(),
  }
})
    .preprocess(({ run }) => {
        return {
            userText: (run.input?.prompt) || ''
    }})
    .analyze({
        description:
        'Analyzes user intent to create a task',
        outputSchema: z.object({
            confidence: z.number().min(0).max(1).default(0),
            explanation: z.string().default(''),
        }),
        createPrompt: ({ results }) => taskCreationIntentScorerSystemPrompt(results.preprocessStepResult.userText),
    })
    .generateScore(({ results }) => {
        const res = (results as any)?.analyzeStepResult || {};
        return res.confidence || 0;
    })
    .generateReason(({ results, score }) => {
        const res = (results as any)?.analyzeStepResult || {};
        return res.explanation || `Confidence score: ${score}`;
    });
    