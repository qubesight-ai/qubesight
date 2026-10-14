import { describe, expect, it, vi } from "vitest";
import { canManageVoiceAgent } from "./voiceAgentAuthorization";

const organizationA = "11111111-1111-4111-8111-111111111111";
const organizationB = "22222222-2222-4222-8222-222222222222";
const userId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

const authorizationCases = [
  {
    label: "denies a user without organization membership",
    memberRole: null,
    profileRole: "client",
    allowed: false,
  },
  {
    label: "denies a regular member under the current owner-only policy",
    memberRole: "member",
    profileRole: "client",
    allowed: false,
  },
  { label: "allows an owner", memberRole: "owner", profileRole: "client", allowed: true },
  {
    label: "allows a global admin without membership",
    memberRole: null,
    profileRole: "admin",
    allowed: true,
  },
];

for (const operation of ["voice-agent-test-session", "voice-agent-generate"]) {
  describe(`${operation} organization authorization`, () => {
    it.each(authorizationCases)("$label", async ({ memberRole, profileRole, allowed }) => {
      const getMembershipRole = vi.fn(async (organizationId: string, requestedUserId: string) => {
        expect(organizationId).toBe(organizationA);
        expect(requestedUserId).toBe(userId);
        return memberRole;
      });
      const getProfileRole = vi.fn(async (requestedUserId: string) => {
        expect(requestedUserId).toBe(userId);
        return profileRole;
      });

      await expect(
        canManageVoiceAgent(organizationA, userId, { getMembershipRole, getProfileRole }),
      ).resolves.toBe(allowed);
      expect(getMembershipRole).toHaveBeenCalledOnce();
      expect(getProfileRole).toHaveBeenCalledOnce();
    });

    it("denies access when the user's membership is in a different organization", async () => {
      const getMembershipRole = vi.fn(async (requestedOrganizationId: string) =>
        requestedOrganizationId === organizationB ? "owner" : null,
      );
      const getProfileRole = vi.fn(async () => "client");

      await expect(
        canManageVoiceAgent(organizationA, userId, { getMembershipRole, getProfileRole }),
      ).resolves.toBe(false);
      expect(getMembershipRole).toHaveBeenCalledWith(organizationA, userId);
    });
  });
}
