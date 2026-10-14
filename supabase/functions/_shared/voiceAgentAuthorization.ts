export type VoiceAgentAuthorizationDependencies = {
  getMembershipRole: (organizationId: string, userId: string) => Promise<string | null>;
  getProfileRole: (userId: string) => Promise<string | null>;
};

/**
 * Keeps the existing Edge Function policy in one testable place:
 * organization owners and global admins may generate or test an agent.
 */
export async function canManageVoiceAgent(
  organizationId: string,
  userId: string,
  dependencies: VoiceAgentAuthorizationDependencies,
) {
  const [membershipRole, profileRole] = await Promise.all([
    dependencies.getMembershipRole(organizationId, userId),
    dependencies.getProfileRole(userId),
  ]);

  return membershipRole === "owner" || profileRole === "admin";
}
