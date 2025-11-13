
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { aiStorySplitterAgent } from './agents/aiStorySplitterAgent';
import { taskCreationIntentScorer } from './scorers/taskCreationIntentScorer';

export const mastra = new Mastra({
  workflows: { },
  agents: { aiStorySplitterAgent },
  scorers: { taskCreationIntentScorer },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
