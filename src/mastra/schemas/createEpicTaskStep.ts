import z from "zod";

export const splittedTasksSchema = z.object({
  epic: z.string(),
  tasks: z.array(z.string()),
});