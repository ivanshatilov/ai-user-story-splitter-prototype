// На случай если stream недоступен вызываем streamLegacy

export const streamAgentResponse = async (agent: any, messages: any[]) => {
  if (typeof agent.stream === "function") {
    const response = await agent.stream(messages);

    let text = "";
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      text += chunk;
    }

    return text;
  }

  if (typeof agent.streamLegacy === "function") {
    const response = await agent.streamLegacy(messages);

    let text = "";
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      text += chunk;
    }

    return text;
  }

  throw new Error("Agent does not support streaming (stream or streamLegacy not found).");
}