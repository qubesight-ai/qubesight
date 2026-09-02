type StreamChunk = {
  choices?: Array<{ delta?: { content?: string } }>;
};

export async function consumeOpenAiSse(
  body: ReadableStream<Uint8Array>,
  onToken: (token: string) => void,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let reply = "";

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      for (const line of event.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        const chunk = JSON.parse(data) as StreamChunk;
        const token = chunk.choices?.[0]?.delta?.content;
        if (token) {
          reply += token;
          onToken(token);
        }
      }
    }
    if (done) break;
  }

  if (!reply.trim()) throw new Error("La IA devolvió una respuesta vacía.");
  return reply.trim();
}
