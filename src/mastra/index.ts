
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { aiStorySplitterAgent } from './agents/aiStorySplitterAgent';

export const mastra = new Mastra({
  workflows: { },
  agents: { aiStorySplitterAgent },
  scorers: { },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
