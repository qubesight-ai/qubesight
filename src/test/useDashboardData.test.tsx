import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDashboardData } from "@/hooks/useDashboardData";

const { fromMock, queryLog, queryResponses } = vi.hoisted(() => ({
  fromMock: vi.fn(),
  queryLog: [] as Array<{ table: string; filters: Array<[string, unknown]> }>,
  queryResponses: {} as Record<string, { data: unknown; error: null }>,
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: fromMock },
}));

function makeQuery(table: string) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn((column: string, value: unknown) => {
      queryLog.push({ table, filters: [[column, value]] });
      return query;
    }),
    order: vi.fn(() => query),
    limit: vi.fn(() => query),
    single: vi.fn(() => Promise.resolve(queryResponses[table] ?? { data: null, error: null })),
    maybeSingle: vi.fn(() => Promise.resolve(queryResponses[table] ?? { data: null, error: null })),
    then: (resolve: (value: unknown) => unknown, reject?: (reason: unknown) => unknown) =>
      Promise.resolve(queryResponses[table] ?? { data: [], error: null }).then(resolve, reject),
  };
  return query;
}

describe("useDashboardData organization isolation", () => {
  beforeEach(() => {
    queryLog.length = 0;
    Object.keys(queryResponses).forEach((key) => delete queryResponses[key]);
    fromMock.mockReset();
    fromMock.mockImplementation((table: string) => makeQuery(table));
  });

  it("loads agents, chatbots, and calls scoped to the user's organization", async () => {
    const userId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
    const organizationId = "11111111-1111-4111-8111-111111111111";
    queryResponses.profiles = { data: { full_name: "Ernesto", role: "client" }, error: null };
    queryResponses.organization_members = {
      data: {
        organization_id: organizationId,
        organizations: { id: organizationId, name: "Organización A", industry: "Servicios" },
      },
      error: null,
    };
    queryResponses.voice_agents = { data: [], error: null };
    queryResponses.chatbots = { data: [], error: null };
    queryResponses.calls = { data: [], error: null };

    const { result } = renderHook(() => useDashboardData(userId));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.organization?.id).toBe(organizationId);
    expect(
      queryLog.filter(({ table }) => ["voice_agents", "chatbots", "calls"].includes(table)),
    ).toEqual(
      expect.arrayContaining([
        { table: "voice_agents", filters: [["organization_id", organizationId]] },
        { table: "chatbots", filters: [["organization_id", organizationId]] },
        { table: "calls", filters: [["organization_id", organizationId]] },
      ]),
    );
  });

  it("does not query tenant resources when the user has no organization membership", async () => {
    queryResponses.profiles = { data: { full_name: "Sin empresa", role: "client" }, error: null };
    queryResponses.organization_members = { data: null, error: null };

    const { result } = renderHook(() => useDashboardData("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.organization).toBeNull();
    expect(result.current.agents).toEqual([]);
    expect(result.current.chatbots).toEqual([]);
    expect(result.current.calls).toEqual([]);
    expect(fromMock.mock.calls.map(([table]) => table)).not.toContain("voice_agents");
    expect(fromMock.mock.calls.map(([table]) => table)).not.toContain("chatbots");
    expect(fromMock.mock.calls.map(([table]) => table)).not.toContain("calls");
  });
});
