import { createStep } from "@mastra/core";
import { taskCreationIntentStepInputSchema, taskCreationIntentStepOutputSchema } from "../../schemas/taskCreationIntentStep";
import { taskCreationIntentScorer } from "../../scorers/taskCreationIntentScorer";

export const taskCreationIntentStep = createStep({
  id: "taskCreationIntentStep",
  inputSchema: taskCreationIntentStepInputSchema,
  outputSchema: taskCreationIntentStepOutputSchema,
  execute: async ({ inputData }) => {
    const { prompt } = inputData;

    const { score, reason } = await taskCreationIntentScorer.run({
      input: { prompt },
      output: { text: "" }, // заглушка, т.к. есть только input
    });

    return {
      score,
      reason: reason ?? `Confidence score: ${score}`,
      prompt,
    };
  },
});