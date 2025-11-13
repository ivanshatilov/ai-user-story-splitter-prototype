import { createWorkflow } from "@mastra/core";
import { aiStorySplitterWorkflowInputSchema, aiStorySplitterWorkflowOutputSchema } from "../schemas/aiStorySplitterWorkflow";

export const aiStorySplitterWorkflow = createWorkflow({
  id: "aiStorySplitterWorkflow",
  inputSchema: aiStorySplitterWorkflowInputSchema,
  outputSchema: aiStorySplitterWorkflowOutputSchema,
})