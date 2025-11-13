import { createWorkflow } from "@mastra/core";
import { aiStorySplitterWorkflowInputSchema, aiStorySplitterWorkflowOutputSchema } from "../schemas/aiStorySplitterWorkflow";
import { taskCreationIntentStep } from "./steps/taskCreationIntentStep";

export const aiStorySplitterWorkflow = createWorkflow({
  id: "aiStorySplitterWorkflow",
  inputSchema: aiStorySplitterWorkflowInputSchema,
  outputSchema: aiStorySplitterWorkflowOutputSchema,
})
    .then(taskCreationIntentStep)

aiStorySplitterWorkflow.commit();