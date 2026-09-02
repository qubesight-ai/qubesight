import { useCallback, useEffect, useRef, useState } from "react";
import { streamChatWithGroq, type ChatMessage, type GeneratedChatbotConfig } from "@/lib/chatbotAi";

type ChatbotConfig = GeneratedChatbotConfig & { description?: string };

export function useChatStream() {
  const [streaming, setStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const send = useCallback(
    async (config: ChatbotConfig, messages: ChatMessage[], onToken: (token: string) => void) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      setStreaming(true);
      try {
        return await streamChatWithGroq(config, messages, onToken, controller.signal);
      } finally {
        if (controllerRef.current === controller) controllerRef.current = null;
        setStreaming(false);
      }
    },
    [],
  );

  const cancel = useCallback(() => controllerRef.current?.abort(), []);
  return { send, cancel, streaming };
}
