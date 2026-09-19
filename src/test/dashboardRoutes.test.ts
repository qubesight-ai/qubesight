import { describe, expect, it } from "vitest";
import { dashboardPath, dashboardSectionFromPath } from "@/routes/dashboardRoutes";

describe("dashboard routes", () => {
  it.each([
    ["/dashboard", "overview"],
    ["/dashboard/", "overview"],
    ["/dashboard/agents", "agents"],
    ["/dashboard/agents/new", "agents"],
    ["/dashboard/agents/agent-123", "agents"],
    ["/dashboard/chatbots", "chatbots"],
    ["/dashboard/telephony", "telephony"],
    ["/dashboard/calls", "calls"],
    ["/dashboard/profile", "profile"],
  ])("maps %s to %s", (path, section) => {
    expect(dashboardSectionFromPath(path)).toBe(section);
  });

  it("falls back to the overview for an unknown dashboard URL", () => {
    expect(dashboardSectionFromPath("/dashboard/unknown")).toBe("overview");
  });

  it("builds stable dashboard URLs", () => {
    expect(dashboardPath("overview")).toBe("/dashboard");
    expect(dashboardPath("agents")).toBe("/dashboard/agents");
  });
});
