export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      calls: {
        Row: {
          caller_phone: string | null
          direction: string
          duration_seconds: number
          ended_at: string | null
          external_call_id: string | null
          id: string
          organization_id: string
          result: string | null
          started_at: string
          status: string
          transcript: string | null
          voice_agent_id: string | null
        }
        Insert: {
          caller_phone?: string | null
          direction?: string
          duration_seconds?: number
          ended_at?: string | null
          external_call_id?: string | null
          id?: string
          organization_id: string
          result?: string | null
          started_at?: string
          status?: string
          transcript?: string | null
          voice_agent_id?: string | null
        }
        Update: {
          caller_phone?: string | null
          direction?: string
          duration_seconds?: number
          ended_at?: string | null
          external_call_id?: string | null
          id?: string
          organization_id?: string
          result?: string | null
          started_at?: string
          status?: string
          transcript?: string | null
          voice_agent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_voice_agent_id_fkey"
            columns: ["voice_agent_id"]
            isOneToOne: false
            referencedRelation: "voice_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbots: {
        Row: {
          business_hours: string
          created_at: string
          description: string
          faqs: Json
          handoff_instructions: string
          id: string
          name: string
          objective: string
          organization_id: string
          personality: string
          required_fields: Json
          status: Database["public"]["Enums"]["resource_status"]
          system_prompt: string
          updated_at: string
          welcome_message: string
        }
        Insert: {
          business_hours?: string
          created_at?: string
          description?: string
          faqs?: Json
          handoff_instructions?: string
          id?: string
          name: string
          objective?: string
          organization_id: string
          personality?: string
          required_fields?: Json
          status?: Database["public"]["Enums"]["resource_status"]
          system_prompt?: string
          updated_at?: string
          welcome_message?: string
        }
        Update: {
          business_hours?: string
          created_at?: string
          description?: string
          faqs?: Json
          handoff_instructions?: string
          id?: string
          name?: string
          objective?: string
          organization_id?: string
          personality?: string
          required_fields?: Json
          status?: Database["public"]["Enums"]["resource_status"]
          system_prompt?: string
          updated_at?: string
          welcome_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string | null
          contact: string | null
          created_at: string
          id: string
          interest: string
          language: string | null
          name: string | null
          notified_at: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          interest: string
          language?: string | null
          name?: string | null
          notified_at?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          interest?: string
          language?: string | null
          name?: string | null
          notified_at?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          member_role: Database["public"]["Enums"]["member_role"]
          organization_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          member_role?: Database["public"]["Enums"]["member_role"]
          organization_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          member_role?: Database["public"]["Enums"]["member_role"]
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          name: string
          status: Database["public"]["Enums"]["resource_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      rate_limit_counters: {
        Row: {
          action: string
          request_count: number
          subject_key: string
          updated_at: string
          window_seconds: number
          window_start: string
        }
        Insert: {
          action: string
          request_count?: number
          subject_key: string
          updated_at?: string
          window_seconds: number
          window_start: string
        }
        Update: {
          action?: string
          request_count?: number
          subject_key?: string
          updated_at?: string
          window_seconds?: number
          window_start?: string
        }
        Relationships: []
      }
      voice_agents: {
        Row: {
          created_at: string
          greeting: string
          id: string
          language: string
          name: string
          objective: string
          organization_id: string
          status: Database["public"]["Enums"]["resource_status"]
          system_prompt: string
          twilio_phone: string | null
          updated_at: string
          voice_name: string
        }
        Insert: {
          created_at?: string
          greeting?: string
          id?: string
          language?: string
          name: string
          objective?: string
          organization_id: string
          status?: Database["public"]["Enums"]["resource_status"]
          system_prompt?: string
          twilio_phone?: string | null
          updated_at?: string
          voice_name?: string
        }
        Update: {
          created_at?: string
          greeting?: string
          id?: string
          language?: string
          name?: string
          objective?: string
          organization_id?: string
          status?: Database["public"]["Enums"]["resource_status"]
          system_prompt?: string
          twilio_phone?: string | null
          updated_at?: string
          voice_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_agents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_rate_limit: {
        Args: {
          p_action: string
          p_limit: number
          p_subject_key: string
          p_window_seconds: number
        }
        Returns: {
          allowed: boolean
          current_count: number
          retry_after_seconds: number
        }[]
      }
      create_organization: {
        Args: { org_industry?: string; org_name: string }
        Returns: string
      }
      is_admin: { Args: never; Returns: boolean }
      is_org_member: { Args: { target_org: string }; Returns: boolean }
      is_org_owner: { Args: { target_org: string }; Returns: boolean }
      purge_rate_limit_counters: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "client" | "admin"
      member_role: "owner" | "member"
      resource_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["client", "admin"],
      member_role: ["owner", "member"],
      resource_status: ["active", "inactive", "suspended"],
    },
  },
} as const
