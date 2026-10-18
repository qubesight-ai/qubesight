import { useCallback, useEffect, useRef, useState } from "react";
import { Room, RoomEvent, Track, ParticipantKind, createLocalAudioTrack, DisconnectReason, type LocalAudioTrack, type RemoteTrack, type TranscriptionSegment } from "livekit-client";
import { createMatildaLiveSession, matildaCallErrorCode, type MatildaCallErrorCode } from "@/lib/matildaLiveSession";

export type LiveCallStatus = "idle" | "connecting" | "live" | "ended" | "error";
export type LiveCallLine = { id: string; speaker: "user" | "agent"; text: string };

type Attempt = {
  controller: AbortController;
  room: Room | null;
  microphone: LocalAudioTrack | null;
  audio: HTMLMediaElement[];
  timer: number | null;
  deadlineTimer: number | null;
};

function dispose(attempt: Attempt): void {
  attempt.controller.abort();
  if (attempt.timer !== null) window.clearInterval(attempt.timer);
  if (attempt.deadlineTimer !== null) window.clearTimeout(attempt.deadlineTimer);
  attempt.timer = null;
  attempt.deadlineTimer = null;
  attempt.microphone?.stop();
  attempt.audio.forEach((el) => { el.pause(); el.srcObject = null; el.remove(); });
  attempt.audio = [];
  attempt.room?.removeAllListeners();
  if (attempt.room) void attempt.room.disconnect().catch(() => undefined);
}

/** Public landing voice call with Matilda through LiveKit (matilda-realtime-agent). */
export function useMatildaLiveCall() {
  const [status, setStatus] = useState<LiveCallStatus>("idle");
  const [error, setError] = useState<MatildaCallErrorCode | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [lines, setLines] = useState<LiveCallLine[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [microphoneActive, setMicrophoneActive] = useState(false);
  const [roomConnected, setRoomConnected] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [endReason, setEndReason] = useState<"hangup" | "expired" | "disconnected" | null>(null);
  const operation = useRef<Attempt | null>(null);

  const cleanup = useCallback(() => {
    const current = operation.current;
    operation.current = null;
    if (current) dispose(current);
    setAgentSpeaking(false);
    setAgentConnected(false);
    setMicrophoneActive(false);
    setRoomConnected(false);
    setAudioBlocked(false);
    setRemaining(0);
  }, []);

  const hangUp = useCallback(() => {
    cleanup();
    setEndReason("hangup");
    setStatus((s) => (s === "live" || s === "connecting" ? "ended" : s));
  }, [cleanup]);

  const start = useCallback(async () => {
    if (operation.current) return;
    const attempt: Attempt = { controller: new AbortController(), room: null, microphone: null, audio: [], timer: null, deadlineTimer: null };
    operation.current = attempt;
    const owns = () => operation.current === attempt && !attempt.controller.signal.aborted;
    const finish = (reason: "expired" | "disconnected") => {
      if (!owns()) return;
      cleanup();
      setEndReason(reason);
      setStatus("ended");
    };
    setError(null);
    setEndReason(null);
    setLines([]);
    setStatus("connecting");
    try {
      const data = await createMatildaLiveSession(attempt.controller.signal);
      if (!owns()) return;
      const ends = Date.now() + data.max_seconds * 1000;
      setRemaining(data.max_seconds);
      attempt.deadlineTimer = window.setTimeout(() => finish("expired"), data.max_seconds * 1000);
      attempt.timer = window.setInterval(() => {
        if (!owns()) return;
        const left = Math.max(0, Math.ceil((ends - Date.now()) / 1000));
        setRemaining(left);
        if (left === 0) finish("expired");
      }, 500);

      const lk = new Room({ adaptiveStream: true, dynacast: true });
      attempt.room = lk;
      const updateAgent = () => {
        if (!owns()) return;
        setAgentConnected([...lk.remoteParticipants.values()].some((p) => p.kind === ParticipantKind.AGENT));
      };
      lk.on(RoomEvent.ParticipantConnected, updateAgent);
      lk.on(RoomEvent.ParticipantDisconnected, updateAgent);
      lk.on(RoomEvent.AudioPlaybackStatusChanged, () => { if (owns()) setAudioBlocked(!lk.canPlaybackAudio); });
      lk.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, _publication, participant) => {
        if (owns() && participant.kind === ParticipantKind.AGENT && track.kind === Track.Kind.Audio) {
          const el = track.attach();
          el.style.display = "none";
          document.body.appendChild(el);
          attempt.audio.push(el);
        }
      });
      lk.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
        if (owns()) setAgentSpeaking(speakers.some((p) => p.kind === ParticipantKind.AGENT));
      });
      lk.on(RoomEvent.TranscriptionReceived, (segments: TranscriptionSegment[], participant) => {
        if (!owns() || !participant) return;
        const local = participant.identity === lk.localParticipant.identity;
        if (!local && participant.kind !== ParticipantKind.AGENT) return;
        const speaker = local ? "user" : "agent";
        setLines((current) => {
          const next = [...current];
          for (const seg of segments) {
            const idx = next.findIndex((l) => l.id === seg.id);
            const line = { id: seg.id, speaker, text: seg.text } as LiveCallLine;
            if (idx >= 0) next[idx] = line;
            else next.push(line);
          }
          return next.slice(-12);
        });
      });
      lk.on(RoomEvent.Disconnected, (reason) => {
        if (!owns()) return;
        if (reason === DisconnectReason.JOIN_FAILURE || reason === DisconnectReason.STATE_MISMATCH) {
          cleanup();
          setError("connection");
          setStatus("error");
        } else finish(reason === DisconnectReason.ROOM_DELETED ? "expired" : "disconnected");
      });

      await lk.connect(data.server_url, data.participant_token);
      if (!owns()) { dispose(attempt); return; }
      setRoomConnected(true);
      updateAgent();
      await lk.startAudio().catch(() => { if (owns()) setAudioBlocked(true); });
      if (!owns()) return;
      setAudioBlocked(!lk.canPlaybackAudio);
      const microphone = await createLocalAudioTrack();
      attempt.microphone = microphone;
      if (!owns()) { dispose(attempt); return; }
      await lk.localParticipant.publishTrack(microphone);
      if (!owns()) { dispose(attempt); return; }
      setMicrophoneActive(true);
      setStatus("live");
    } catch (err) {
      if (!owns()) { dispose(attempt); return; }
      cleanup();
      setError(matildaCallErrorCode(err));
      setStatus("error");
    }
  }, [cleanup]);

  const resumeAudio = useCallback(async () => {
    const current = operation.current;
    if (!current?.room) return;
    try {
      await current.room.startAudio();
      if (operation.current === current) setAudioBlocked(!current.room.canPlaybackAudio);
    } catch {
      if (operation.current === current) setAudioBlocked(true);
    }
  }, []);

  useEffect(() => () => {
    const current = operation.current;
    operation.current = null;
    if (current) dispose(current);
  }, []);

  return { status, error, remaining, lines, agentSpeaking, agentConnected, microphoneActive, roomConnected, audioBlocked, endReason, start, hangUp, resumeAudio };
}
