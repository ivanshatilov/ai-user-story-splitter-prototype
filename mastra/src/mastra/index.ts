
import { Mastra } from '@mastra/core/mastra';
import { aiStorySplitterAgent } from './agents/aiStorySplitterAgent';
import { taskCreationIntentScorer } from './scorers/taskCreationIntentScorer';
import { aiStorySplitterWorkflow } from './workflows/aiStorySplitterWorkflow';

export const mastra = new Mastra({
  workflows: { aiStorySplitterWorkflow },
  agents: { aiStorySplitterAgent },
  scorers: { taskCreationIntentScorer },
  telemetry: {
    enabled: false,
  },
});
