import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMatildaLiveCall } from "@/hooks/useMatildaLiveCall";
import HeroInteractiveDemo from "@/components/sections/HeroInteractiveDemo";

type Listener = (...args: unknown[]) => void;
type MockRoom = {
  emit: (name: string, ...args: unknown[]) => void;
  disconnect: ReturnType<typeof vi.fn>;
  remoteParticipants: Map<string, { kind: string }>;
  removeAllListeners: ReturnType<typeof vi.fn>;
  canPlaybackAudio: boolean;
};
const mocks = vi.hoisted(() => ({ session: vi.fn(), connect: vi.fn(), audio: vi.fn(), microphone: vi.fn(), publish: vi.fn(), rooms: [] as MockRoom[] }));
vi.mock("@/lib/matildaLiveSession", async (original) => ({ ...await original<typeof import("@/lib/matildaLiveSession")>(), createMatildaLiveSession: mocks.session }));
vi.mock("livekit-client", () => ({
  ParticipantKind: { AGENT: "agent" }, Track: { Kind: { Audio: "audio" } },
  DisconnectReason: { ROOM_DELETED: "deleted", JOIN_FAILURE: "failed", STATE_MISMATCH: "mismatch" },
  ConnectionError: class extends Error {}, ConnectionErrorReason: { NotAllowed: 0 },
  RoomEvent: Object.fromEntries(["TrackSubscribed", "AudioPlaybackStatusChanged", "ActiveSpeakersChanged", "TranscriptionReceived", "Disconnected", "ParticipantConnected", "ParticipantDisconnected"].map((event) => [event, event])),
  createLocalAudioTrack: mocks.microphone,
  Room: class {
    listeners = new Map<string, Listener>();
    remoteParticipants = new Map();
    canPlaybackAudio = true;
    localParticipant = { identity: "visitor", publishTrack: mocks.publish };
    connect = mocks.connect;
    startAudio = mocks.audio;
    disconnect = vi.fn().mockResolvedValue(undefined);
    removeAllListeners = vi.fn(() => this.listeners.clear());
    constructor() { mocks.rooms.push(this); }
    on(name: string, listener: Listener) { this.listeners.set(name, listener); return this; }
    emit(name: string, ...args: unknown[]) { this.listeners.get(name)?.(...args); }
  },
}));

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  let reject: (error: Error) => void = () => undefined;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
const session = { server_url: "wss://demo.example.test", participant_token: "mock-participant", room_name: "qs-test-demo-example", max_seconds: 20 };
let stop: ReturnType<typeof vi.fn>;
function latestRoom(): MockRoom {
  const room = mocks.rooms.at(-1);
  if (!room) throw new Error("Room was not created");
  return room;
}

describe("public Matilda call lifecycle", () => {
  beforeEach(() => {
    vi.useFakeTimers(); vi.clearAllMocks(); mocks.rooms.length = 0;
    stop = vi.fn(); mocks.session.mockResolvedValue(session);
    mocks.connect.mockResolvedValue(undefined); mocks.audio.mockResolvedValue(undefined);
    mocks.publish.mockResolvedValue({}); mocks.microphone.mockResolvedValue({ stop });
  });
  afterEach(() => { vi.useRealTimers(); });
  it("connects with returned credentials and publishes the microphone", async () => {
    const { result } = renderHook(() => useMatildaLiveCall()); await act(() => result.current.start());
    expect(mocks.connect).toHaveBeenCalledWith(session.server_url, session.participant_token);
    expect(mocks.publish).toHaveBeenCalledWith({ stop });
    expect(result.current).toMatchObject({ status: "live", microphoneActive: true, roomConnected: true, agentConnected: false });
  });
  it("prevents double start before a session returns", async () => {
    const waiting = deferred<typeof session>(); mocks.session.mockReturnValue(waiting.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    act(() => { pending = result.current.start(); void result.current.start(); });
    expect(mocks.session).toHaveBeenCalledTimes(1);
    await act(async () => { waiting.resolve(session); await pending; });
  });
  it("cancel during session creation never creates a room", async () => {
    const waiting = deferred<typeof session>(); mocks.session.mockReturnValue(waiting.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    act(() => { pending = result.current.start(); });
    const signal = mocks.session.mock.calls[0][0] as AbortSignal;
    act(() => result.current.hangUp()); await act(async () => { waiting.resolve(session); await pending; });
    expect(signal.aborted).toBe(true); expect(mocks.rooms).toHaveLength(0); expect(result.current.status).toBe("ended");
  });
  it("cancel during connection disposes a late connection without opening a microphone", async () => {
    const waiting = deferred<void>(); mocks.connect.mockReturnValue(waiting.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    await act(async () => { pending = result.current.start(); await Promise.resolve(); });
    const room = latestRoom(); act(() => result.current.hangUp());
    await act(async () => { waiting.resolve(undefined); await pending; });
    expect(room.disconnect).toHaveBeenCalled(); expect(mocks.microphone).not.toHaveBeenCalled(); expect(result.current.status).toBe("ended");
  });
  it("stops a microphone returned after cancellation", async () => {
    const waiting = deferred<{ stop: ReturnType<typeof vi.fn> }>(); mocks.microphone.mockReturnValue(waiting.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    await act(async () => { pending = result.current.start(); });
    act(() => result.current.hangUp()); await act(async () => { waiting.resolve({ stop }); await pending; });
    expect(stop).toHaveBeenCalled(); expect(mocks.publish).not.toHaveBeenCalled(); expect(result.current.status).toBe("ended");
  });
  it("an old failure cannot stop a new call", async () => {
    const old = deferred<typeof session>(); mocks.session.mockReturnValueOnce(old.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    act(() => { pending = result.current.start(); }); act(() => result.current.hangUp());
    await act(() => result.current.start()); await act(async () => { old.reject(new Error("old")); await pending; });
    expect(result.current.status).toBe("live"); expect(latestRoom().disconnect).not.toHaveBeenCalled();
  });
  it("only agent participants count as Matilda", async () => {
    const { result } = renderHook(() => useMatildaLiveCall()); await act(() => result.current.start()); const room = latestRoom();
    act(() => { room.remoteParticipants.set("visitor-2", { kind: "standard" }); room.emit("ParticipantConnected"); room.emit("ActiveSpeakersChanged", [{ kind: "standard" }]); });
    expect(result.current.agentConnected).toBe(false); expect(result.current.agentSpeaking).toBe(false);
    act(() => { room.remoteParticipants.set("matilda", { kind: "agent" }); room.emit("ParticipantConnected"); room.emit("ActiveSpeakersChanged", [{ kind: "agent" }]); });
    expect(result.current.agentConnected).toBe(true); expect(result.current.agentSpeaking).toBe(true);
    act(() => { room.remoteParticipants.delete("matilda"); room.emit("ParticipantDisconnected"); }); expect(result.current.agentConnected).toBe(false);
  });
  it("expires at the returned 20 seconds including setup time", async () => {
    const waiting = deferred<void>(); mocks.connect.mockReturnValue(waiting.promise);
    const { result } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    await act(async () => { pending = result.current.start(); await Promise.resolve(); });
    act(() => vi.advanceTimersByTime(19_999)); expect(result.current.status).toBe("connecting");
    act(() => vi.advanceTimersByTime(1)); expect(result.current).toMatchObject({ status: "ended", endReason: "expired", remaining: 0 });
    await act(async () => { waiting.resolve(undefined); await pending; });
    expect(result.current.status).toBe("ended"); expect(mocks.microphone).not.toHaveBeenCalled();
  });
  it("cleans audio, listeners and mic on hangup and ignores stale events", async () => {
    const { result } = renderHook(() => useMatildaLiveCall()); await act(() => result.current.start());
    const room = latestRoom(); const audio = document.createElement("audio"); const pause = vi.spyOn(audio, "pause").mockImplementation(() => undefined);
    act(() => room.emit("TrackSubscribed", { kind: "audio", attach: () => audio }, {}, { kind: "agent" })); expect(document.body.contains(audio)).toBe(true);
    act(() => result.current.hangUp());
    expect(document.body.contains(audio)).toBe(false); expect(stop).toHaveBeenCalled(); expect(pause).toHaveBeenCalled(); expect(room.removeAllListeners).toHaveBeenCalled();
    act(() => room.emit("ActiveSpeakersChanged", [{ kind: "agent" }])); expect(result.current.agentSpeaking).toBe(false);
  });
  it("unmount invalidates pending session", async () => {
    const waiting = deferred<typeof session>(); mocks.session.mockReturnValue(waiting.promise);
    const { result, unmount } = renderHook(() => useMatildaLiveCall()); let pending = Promise.resolve();
    act(() => { pending = result.current.start(); }); unmount();
    await act(async () => { waiting.resolve(session); await pending; }); expect(mocks.rooms).toHaveLength(0);
  });
  it("permission denial returns a safe error, never a fallback", async () => {
    mocks.microphone.mockRejectedValue(new DOMException("private-provider-details", "NotAllowedError"));
    const { result } = renderHook(() => useMatildaLiveCall()); await act(() => result.current.start());
    expect(result.current).toMatchObject({ status: "error", error: "permission", microphoneActive: false }); expect(latestRoom().disconnect).toHaveBeenCalled();
  });
  it("resumes blocked audio without starting another session", async () => {
    const { result } = renderHook(() => useMatildaLiveCall()); await act(() => result.current.start()); const room = latestRoom();
    act(() => { room.canPlaybackAudio = false; room.emit("AudioPlaybackStatusChanged"); }); expect(result.current.audioBlocked).toBe(true);
    room.canPlaybackAudio = true; await act(() => result.current.resumeAudio()); expect(result.current.audioBlocked).toBe(false); expect(mocks.session).toHaveBeenCalledTimes(1);
  });
  it("blocks simulated Hero interactions while voice is active", async () => {
    render(<HeroInteractiveDemo spanish />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Hablar con Matilda por voz" })); });
    expect(screen.getByRole("textbox").hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("button", { name: "Ver servicios" }).hasAttribute("disabled")).toBe(true);
    expect(mocks.session).toHaveBeenCalledTimes(1);
  });
});