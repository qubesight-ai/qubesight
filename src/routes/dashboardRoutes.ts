import type { DashboardSection } from "@/types/dashboard";

const routedSections = new Set<DashboardSection>([
  "agents",
  "chatbots",
  "telephony",
  "calls",
  "profile",
]);

export function dashboardSectionFromPath(pathname: string): DashboardSection {
  const candidate = pathname.replace(/^\/dashboard\/?/, "").split("/")[0] as DashboardSection;
  return routedSections.has(candidate) ? candidate : "overview";
}

export function dashboardPath(section: DashboardSection) {
  return section === "overview" ? "/dashboard" : `/dashboard/${section}`;
}
