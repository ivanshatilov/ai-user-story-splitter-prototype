import express from 'express';
import { MastraClient } from "@mastra/client-js";

const app = express();
const API_PORT = process.env.API_PORT || 3000;
const MASTRA_PORT = process.env.MASTRA_PORT || 4111;
const NODE_ENV = process.env.NODE_ENV || "dev"
const MASTRA_BASE_URL = NODE_ENV == "production" ? `http://mastra:${MASTRA_PORT}` : `http://localhost:${MASTRA_PORT}`

app.use(express.json());

const mastraClient = new MastraClient({
  baseUrl: MASTRA_BASE_URL
});

app.post('/api/story-split', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Field "prompt" (string) is required in body' });
    }
    const workflow = mastraClient.getWorkflow("aiStorySplitterWorkflow")
    
    const run = await workflow.createRunAsync()
    
    const stream  = await run.stream({inputData: { prompt: prompt } });

    let finalResult = null;

    for await (const chunk of stream) {
      if (chunk.type == "workflow-step-result" && chunk.payload.stepName != "taskCreationIntentStep") {
        finalResult = chunk.payload.output;
      }
    }

    return res.json(finalResult);
  } catch (err: any) {
    console.error('Workflow error:', err);
    return res.status(500).json({ error: 'Internal error', details: err?.message });
  }
});

app.listen(API_PORT, () => {
  console.log(`API server is running on http://localhost:${API_PORT}`);
});