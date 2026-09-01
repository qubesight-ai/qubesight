import { describe, expect, it, vi } from "vitest";
import { consumeOpenAiSse } from "@/lib/openAiSse";

function stream(chunks: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
}

describe("consumeOpenAiSse", () => {
  it("reconstructs tokens split across network chunks", async () => {
    const onToken = vi.fn();
    const body = stream([
      'data: {"choices":[{"delta":{"content":"Hola"}}]}\n',
      '\ndata: {"choices":[{"delta":{"content":" mundo"}}]}\n\n',
      "data: [DONE]\n\n",
    ]);

    await expect(consumeOpenAiSse(body, onToken)).resolves.toBe("Hola mundo");
    expect(onToken).toHaveBeenNthCalledWith(1, "Hola");
    expect(onToken).toHaveBeenNthCalledWith(2, " mundo");
  });

  it("rejects an empty provider response", async () => {
    await expect(consumeOpenAiSse(stream(["data: [DONE]\n\n"]), vi.fn())).rejects.toThrow(
      "respuesta vacía",
    );
  });
});
