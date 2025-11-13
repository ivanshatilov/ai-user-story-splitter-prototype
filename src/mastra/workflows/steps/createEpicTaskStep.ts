import { createStep } from "@mastra/core";
import { taskCreationIntentStepOutputSchema } from "../../schemas/taskCreationIntentStep";
import { aiStorySplitterWorkflowOutputSchema, RatedTasks, RatedTasksSchema } from "../../schemas/aiStorySplitterWorkflow";
import { getRateSplittedTasksPrompt, getSplitUserStoryIntoEpicAndTasksPrompt } from "../../prompts/workflows/createEpicTaskStepPrompts";
import { PinoLogger } from "@mastra/loggers";
import { extractFirstJson } from "../../utils/jsonUtils";
import { splittedTasks, splittedTasksSchema } from "../../schemas/createEpicTaskStep";
import { Agent } from "@mastra/core/agent";

const logger = new PinoLogger({
  name: "createEpicTaskStep",
  level: "debug",
});

export const createEpicTaskStep = createStep({
  id: "createEpicTaskStep",
  inputSchema: taskCreationIntentStepOutputSchema,
  outputSchema: aiStorySplitterWorkflowOutputSchema,

  execute: async ({ inputData, mastra }) => {
    const { prompt } = inputData;

    if (!prompt) {
      throw new Error("User story not found");
    }

    const agent = mastra?.getAgent("aiStorySplitterAgent");
    if (!agent) {
      throw new Error("Agent not found");
    }

    const splittedUserStory = await splitUserStoryIntoTasks(agent, prompt)

    const refinedTasksJson = await getEpicWithRatedTasks(agent, splittedUserStory)

    return {
      output: `Вот твой эпик "${refinedTasksJson.epic}". Я разбил его на ${refinedTasksJson.tasks ? refinedTasksJson.tasks.length : 0} подзадач.`,
      storySplitResult: {
        epic: refinedTasksJson.epic,
        tasks: refinedTasksJson.tasks,
      },
    };
  },
});

export const splitUserStoryIntoTasks = async (agent: Agent, prompt: string): Promise<splittedTasks> => {
    const splitUserStoryPrompt = getSplitUserStoryIntoEpicAndTasksPrompt(prompt);

    const splitUserStoryResponse = await agent.stream([
      { role: "user", content: splitUserStoryPrompt },
    ]);

    let splitUserStoryText = "";
    for await (const chunk of splitUserStoryResponse.textStream) {
      process.stdout.write(chunk);
      splitUserStoryText += chunk;
    }

    logger.info(`Split user story text: ${splitUserStoryText}`);

    const splittedTasksJson = splittedTasksSchema.parse(extractFirstJson(splitUserStoryText));

    return splittedTasksJson
}

export const getEpicWithRatedTasks = async (agent: Agent, splittedUserStory: splittedTasks): Promise<RatedTasks> => {
    const splittedTasks = splittedUserStory.tasks;

    if (splittedTasks.length === 0) {
      throw new Error("No detailed tasks provided to refine");
    }

    const rateSplittedTasksPrompt = getRateSplittedTasksPrompt(splittedUserStory.epic, splittedTasks);

    const refineTasksResponse = await agent.stream([
      { role: "user", content: rateSplittedTasksPrompt },
    ]);

    let refineTasksText = "";
    for await (const chunk of refineTasksResponse.textStream) {
      refineTasksText += chunk;
      process.stdout.write(chunk);
    }

    const refinedTasksJson = RatedTasksSchema.parse(extractFirstJson(refineTasksText));

    return refinedTasksJson
}