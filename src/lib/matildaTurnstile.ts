export type MatildaVerificationState = "waiting" | "verifying" | "ready" | "error";

export const canStartMatildaRecording = (
  privacyAccepted: boolean,
  verification: MatildaVerificationState,
  hasSession: boolean,
) => privacyAccepted && verification === "ready" && hasSession;
