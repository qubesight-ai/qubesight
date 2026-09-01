import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Agent, Call, Chatbot, Organization, Profile } from "@/types/dashboard";

function normalizeChatbot(bot: Awaited<ReturnType<typeof loadChatbots>>[number]): Chatbot {
  return {
    ...bot,
    required_fields: Array.isArray(bot.required_fields)
      ? bot.required_fields.filter((value): value is string => typeof value === "string")
      : [],
    faqs: Array.isArray(bot.faqs)
      ? bot.faqs.filter(
          (value): value is { question: string; answer: string } =>
            typeof value === "object" &&
            value !== null &&
            "question" in value &&
            typeof value.question === "string" &&
            "answer" in value &&
            typeof value.answer === "string",
        )
      : [],
  };
}

async function loadChatbots(organizationId: string) {
  const { data, error } = await supabase
    .from("chatbots")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

export function useDashboardData(userId?: string) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [{ data: profileData, error: profileError }, { data: membership, error: orgError }] =
        await Promise.all([
          supabase.from("profiles").select("full_name,role").eq("id", userId).single(),
          supabase
            .from("organization_members")
            .select("organization_id, organizations(id,name,industry)")
            .eq("user_id", userId)
            .maybeSingle(),
        ]);
      if (profileError) throw profileError;
      if (orgError) throw orgError;
      setProfile(profileData);

      const currentOrganization = membership?.organizations ?? null;
      setOrganization(currentOrganization);
      if (!currentOrganization) {
        setAgents([]);
        setChatbots([]);
        setCalls([]);
        return;
      }

      const [agentsResult, chatbotRows, callsResult] = await Promise.all([
        supabase
          .from("voice_agents")
          .select("*")
          .eq("organization_id", currentOrganization.id)
          .order("created_at"),
        loadChatbots(currentOrganization.id),
        supabase
          .from("calls")
          .select("id,caller_phone,status,result,duration_seconds,started_at,voice_agents(name)")
          .eq("organization_id", currentOrganization.id)
          .order("started_at", { ascending: false })
          .limit(50),
      ]);
      if (agentsResult.error) throw agentsResult.error;
      if (callsResult.error) throw callsResult.error;
      setAgents(agentsResult.data ?? []);
      setChatbots(chatbotRows.map(normalizeChatbot));
      setCalls((callsResult.data ?? []) as Call[]);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error("No se pudo cargar el dashboard"));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => void reload(), [reload]);
  return { organization, profile, agents, chatbots, calls, loading, error, reload };
}
