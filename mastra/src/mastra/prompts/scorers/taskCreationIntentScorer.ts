
export const taskCreationIntentScorerBaseInstruction = () => `
    You are a judgment model.
    Your only job is to estimate how much the user wants to CREATE A TASK.
    Always follow the task and format given in the prompt.
`;

export const taskCreationIntentScorerSystemPrompt = (userText: string) => `
    You are evaluating if user wants to create a task based on the conversation.
    User text:
    """
    ${userText}
    """
    Tasks:
    1) Identify if user wants to create a task.
    2) Provide a confidence score from 0 to 1.
    3) Explain your reasoning.

    Return JSON with fields:
    {
    "confidence": number, // 0-1
    "explanation": string
    }

`
