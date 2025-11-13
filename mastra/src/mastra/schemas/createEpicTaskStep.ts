import z from "zod";

export const splittedTasksSchema = z.object({
  epic: z.string(),
  tasks: z.array(z.string()),
});

export type splittedTasks = z.infer<typeof splittedTasksSchema>;