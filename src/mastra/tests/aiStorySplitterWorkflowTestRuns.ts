import { mastra } from ".."; 
import { testPrompts } from '../prompts/testPrompts';
import 'dotenv/config';

async function runTests() {
    console.log(`Кол-во тестовых промптов: ${testPrompts.length} \n`);

    const workflow = mastra.getWorkflow("aiStorySplitterWorkflow");
    if (!workflow) {
        console.log("Workflow with id 'aiStorySplitterWorkflow' not found");
        return;
    }

    for (const prompt of testPrompts) {
        console.log(`Prompt: ${prompt} \n`)

        try {
            const run = await workflow.createRunAsync();
            
            const runOutput = await run.stream({inputData: { prompt: prompt } });

            const finalResult: any = await runOutput.result;

            console.log(`Result: ${JSON.stringify(finalResult.result)} \n\n\n`)
        } catch (error: any) {
            console.log(`${error?.message} ${error?.stack}`)
        }
    }
}

runTests().catch((err) => {
  console.error("Fatal error:", err);
});