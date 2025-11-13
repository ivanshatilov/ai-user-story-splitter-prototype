
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

export const mastra = new Mastra({
  workflows: { },
  agents: { },
  scorers: { },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
