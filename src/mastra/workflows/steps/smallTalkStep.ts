import { createStep } from "@mastra/core";
import { taskCreationIntentStepOutputSchema } from "../../schemas/taskCreationIntentStep";
import { aiStorySplitterWorkflowOutputSchema } from "../../schemas/aiStorySplitterWorkflow";
import { smallTalkStepPrompt } from "../../prompts/workflows/smallTalkStepPrompts";


export const smallTalkStep = createStep({
  id: "smallTalkStep",
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

    const smallTalkPrompt = smallTalkStepPrompt(prompt);

    const response = await agent.stream([
      { role: "user", content: smallTalkPrompt },
    ]);

    let responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
      process.stdout.write(chunk);
    }

    return {
      output: responseText,
      storySplitResult: {
        epic: null,
        tasks: null,
      },
    };
  },
});