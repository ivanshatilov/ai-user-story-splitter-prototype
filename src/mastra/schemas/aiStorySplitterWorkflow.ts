import z from "zod";

const TaskSchema = z.object({
  task: z.string(),
  complexity: z.number().int().min(1).max(3),
});

const StorySplitResultSchema = z.object({
  epic: z.string().nullable(),
  tasks: z.array(TaskSchema).nullable(),
});

export const aiStorySplitterWorkflowOutputSchema = z.object({
  output: z.string(),
  storySplitResult: StorySplitResultSchema,
});