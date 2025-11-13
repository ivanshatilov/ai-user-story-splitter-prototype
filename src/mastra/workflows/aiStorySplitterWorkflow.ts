import { createWorkflow } from "@mastra/core";
import { aiStorySplitterWorkflowInputSchema, aiStorySplitterWorkflowOutputSchema } from "../schemas/aiStorySplitterWorkflow";
import { taskCreationIntentStep } from "./steps/taskCreationIntentStep";
import { createEpicTaskStep } from "./steps/createEpicTaskStep";
import { smallTalkStep } from "./steps/smallTalkStep";

const TASK_CREATION_INTENT_SCORE = 0.5;

export const aiStorySplitterWorkflow = createWorkflow({
  id: "aiStorySplitterWorkflow",
  inputSchema: aiStorySplitterWorkflowInputSchema,
  outputSchema: aiStorySplitterWorkflowOutputSchema,
})
    .then(taskCreationIntentStep)
    .branch([
        [ async ({ inputData }) => inputData.score >= TASK_CREATION_INTENT_SCORE, createEpicTaskStep],
        [ async ({ inputData }) => inputData.score < TASK_CREATION_INTENT_SCORE, smallTalkStep],
    ])
    .commit();