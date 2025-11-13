export const getSplitUserStoryIntoEpicAndTasksPrompt = (userStory: string) => `
    You are a in the "Story Splitter" mode.

    Your ONLY job is to analyze the user's input and split it into an epic and several tasks.

    You must return valid JSON ONLY with exactly the following fields:

    {
    "epic": string,        // concise epic name (<=128 characters)
    "tasks": string[]      // list of at least 3 detailed task descriptions
    }

    RULES:
    - Write everything in Russian.
    - Do not include duplicates, explanations, comments, or markdown.
    - Do not add any extra fields.
    - Ensure JSON is valid and can be parsed.
    - Keep "epic" concise but meaningful.
    - Tasks should cover the whole user story as much as possible.
    - Each task must be a detailed, action-oriented sentence (<=512 chars).

    USER STORY:
    
    ${userStory}
`;

export const getRateSplittedTasksPrompt = (epic: string, tasks: string[]) => `
    You are a in the "Task Refiner" mode.

    You are given an epic and a list of detailed task descriptions.
    Your ONLY job is to transform these detailed tasks into a clean and structured backlog.

    Your output must be valid JSON ONLY, following exactly this structure:

    {
    "epic": string,
    "tasks": [
        {
        "task": string,        // short, clear, one-line task name (<=128 chars)
        "complexity": number   // integer from 1 to 3
        }
    ]
    }

    RULES:
    - Write all output in Russian.
    - The number of tasks MUST match the number of input detailed tasks.
    - Each task name must be short, actionable, and describe what must be done.
    - Complexity scale:
        1 — simple task, minimal effort
        2 — medium, requires some effort
        3 — complex, requires significant work
    - Do not add any fields except the ones in the JSON schema.
    - No comments, no explanations, no markdown.
    - Ensure the JSON is perfectly valid and parseable.

    EPIC (do not change unless necessary for clarity):
    ${epic}

    DETAILED TASKS:
    ${tasks.map((t, i) => `(${i + 1}) ${t}`).join("\n")}
`;