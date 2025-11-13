import { Agent } from "@mastra/core/agent";
import { openai } from '@ai-sdk/openai';
import { aiStorySplitterSystemPrompt } from "../prompts/agents/aiStorySplitterPrompts";

const model = process.env.OPENAI_MODEL_NAME || "o4-mini"

export const aiStorySplitterAgent = new Agent({
  name: "aiStorySplitterAgent",
  model: openai(model), 
  instructions: aiStorySplitterSystemPrompt(),
});
