import z from "zod";

export const taskCreationIntentStepInputSchema = z.object({
    prompt: z.string(),
  });

export const taskCreationIntentStepOutputSchema = z.object({
    score: z.number(),
    reason: z.string(),
    prompt: z.string(),
  });