import { Agent } from "@mastra/core/agent";
import { openai } from '@ai-sdk/openai';
import { aiStorySplitterSystemPrompt } from "../prompts/agents/aiStorySplitterPrompts";

export const aiStorySplitterAgent = new Agent({
  name: "aiStorySplitterAgent",
  model: openai("gpt-4o-mini"), 
  instructions: aiStorySplitterSystemPrompt(),
});
