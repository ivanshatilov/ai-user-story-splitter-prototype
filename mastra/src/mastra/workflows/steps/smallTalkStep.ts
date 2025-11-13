import { createStep } from "@mastra/core";
import { taskCreationIntentStepOutputSchema } from "../../schemas/taskCreationIntentStep";
import { aiStorySplitterWorkflowOutputSchema } from "../../schemas/aiStorySplitterWorkflow";
import { smallTalkStepPrompt } from "../../prompts/workflows/smallTalkStepPrompts";
import { streamAgentResponse } from "../../utils/agentUtils";


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

    let responseText = await streamAgentResponse(agent, [
      { role: "user", content: smallTalkPrompt },
    ])
    
    return {
      output: responseText,
      storySplitResult: {
        epic: null,
        tasks: null,
      },
    };
  },
});