
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { aiStorySplitterAgent } from './agents/aiStorySplitterAgent';
import { taskCreationIntentScorer } from './scorers/taskCreationIntentScorer';
import { aiStorySplitterWorkflow } from './workflows/aiStorySplitterWorkflow';

export const mastra = new Mastra({
  workflows: { aiStorySplitterWorkflow },
  agents: { aiStorySplitterAgent },
  scorers: { taskCreationIntentScorer },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
