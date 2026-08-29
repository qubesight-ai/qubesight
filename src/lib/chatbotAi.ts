import { supabase } from "@/integrations/supabase/client";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GeneratedChatbotConfig = {
  name: string;
  personality: string;
  objective: string;
  welcome_message: string;
  system_prompt: string;
  business_hours: string;
  handoff_instructions: string;
  required_fields: string[];
  faqs: { question: string; answer: string }[];
};

type ChatbotConfig = GeneratedChatbotConfig & {
  description?: string;
};

async function invokeChatbotAi<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("chatbot-ai", { body });

  if (error) {
    throw new Error("No se pudo contactar la IA. Intenta nuevamente.");
  }

  if (!data || data.error) {
    throw new Error(data?.error || "La IA devolvió una respuesta inválida.");
  }

  return data as T;
}

export async function generateWithGroq(
  description: string,
): Promise<GeneratedChatbotConfig> {
  const data = await invokeChatbotAi<{ config: GeneratedChatbotConfig }>({
    action: "generate",
    description,
  });
  return data.config;
}

export async function chatWithGroq(
  config: ChatbotConfig,
  messages: ChatMessage[],
): Promise<string> {
  const data = await invokeChatbotAi<{ reply: string }>({
    action: "chat",
    config,
    messages: messages.slice(-10),
  });
  return data.reply;
}
