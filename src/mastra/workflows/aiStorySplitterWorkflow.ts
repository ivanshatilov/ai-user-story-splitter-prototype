import { createWorkflow } from "@mastra/core";
import z from "zod";
import { aiStorySplitterWorkflowOutputSchema } from "../schemas/aiStorySplitterWorkflow";


export const aiStorySplitterWorkflow = createWorkflow({
  id: "aiStorySplitterWorkflow",
  inputSchema: z.object({
    prompt: z.string(),
  }),
  outputSchema: aiStorySplitterWorkflowOutputSchema,
})