import { Mic, Loader2, Sparkles, X, Volume2, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Turn = { role: "user" | "assistant"; content: string };
type Status = "idle" | "listening" | "thinking" | "speaking";

export function VoiceBot() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [history, setHistory] = useState<Turn[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const historyRef = useRef<Turn[]>([]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  };

  const cleanupMic = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
    chunksRef.current = [];
  };

  const startListening = async () => {
    setError(null);
    stopAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        cleanupMic();
        void processTurn(blob);
      };
      recorder.start();
      setStatus("listening");
    } catch (e) {
      setError("Mic access is needed to talk.");
      setStatus("idle");
    }
  };

  const stopListening = () => {
    const r = recorderRef.current;
    if (r && r.state !== "inactive") {
      setStatus("thinking");
      r.stop();
    } else {
      cleanupMic();
      setStatus("idle");
    }
  };

  const processTurn = async (audio: Blob) => {
    try {
      if (audio.size < 1500) {
        setError("That was too short — try again.");
        setStatus("idle");
        return;
      }
      setStatus("thinking");

      // 1) STT
      const form = new FormData();
      const ext = audio.type.includes("mp4") ? "mp4" : "webm";
      form.append("file", audio, `voice.${ext}`);
      const sttRes = await fetch("/api/stt", { method: "POST", body: form });
      if (!sttRes.ok) throw new Error("Transcription failed");
      const sttJson = (await sttRes.json()) as { text?: string };
      const userText = (sttJson.text ?? "").trim();
      if (!userText) {
        setError("Didn't catch that — please try again.");
        setStatus("idle");
        return;
      }

      const nextHistory: Turn[] = [...historyRef.current, { role: "user", content: userText }];
      setHistory(nextHistory);

      // 2) Chat
      const chatRes = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ history: historyRef.current, userText }),
      });
      if (!chatRes.ok) throw new Error("AI response failed");
      const chatJson = (await chatRes.json()) as { text?: string };
      const replyText = (chatJson.text ?? "").trim() || "Sorry, please try again.";
      setHistory((h) => [...h, { role: "assistant", content: replyText }]);

      // 3) TTS
      setStatus("speaking");
      const ttsRes = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: replyText, voice: "alloy" }),
      });
      if (!ttsRes.ok) throw new Error("Voice playback failed");
      const blob = await ttsRes.blob();
      const url = URL.createObjectURL(blob);
      const audioEl = new Audio(url);
      audioRef.current = audioEl;
      audioEl.onended = () => {
        setStatus("idle");
        URL.revokeObjectURL(url);
      };
      audioEl.onerror = () => {
        setStatus("idle");
        URL.revokeObjectURL(url);
      };
      await audioEl.play();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setStatus("idle");
    }
  };

  const handleClose = () => {
    stopAudio();
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    cleanupMic();
    setStatus("idle");
    setOpen(false);
  };

  const label =
    status === "listening"
      ? "Listening…"
      : status === "thinking"
        ? "Thinking…"
        : status === "speaking"
          ? "Speaking…"
          : "Tap to speak";

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open voice assistant"
          className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          <Mic className="relative h-7 w-7" strokeWidth={2.2} />
        </button>
      )}

      {open && (
        <>
          <button
            aria-label="Close voice"
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
          />
          <div className="fixed inset-x-3 bottom-3 top-auto z-50 sm:inset-auto sm:bottom-24 sm:right-5">
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-primary/40 bg-card p-6 shadow-2xl shadow-primary/30 sm:p-8">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-extrabold">Nuventure Voice</p>
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-accent">
                        AI
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Bolo, hum sun rahe hain</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Orb */}
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40 blur-2xl transition-opacity ${
                    status === "idle" ? "opacity-40" : "opacity-90 animate-pulse"
                  }`}
                />
                <div
                  className={`absolute inset-4 rounded-full border border-primary/40 ${
                    status === "listening" ? "animate-ping" : ""
                  }`}
                />
                <div
                  className={`absolute inset-8 rounded-full border border-accent/40 ${
                    status === "speaking" ? "animate-ping" : ""
                  }`}
                />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-xl">
                  {status === "thinking" ? (
                    <Loader2 className="h-10 w-10 animate-spin" />
                  ) : status === "speaking" ? (
                    <Volume2 className="h-10 w-10" />
                  ) : status === "listening" ? (
                    <Square className="h-8 w-8 fill-current" />
                  ) : (
                    <Mic className="h-10 w-10" />
                  )}
                </div>
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{label}</p>

              {/* Transcript */}
              <div className="max-h-40 w-full space-y-2 overflow-y-auto rounded-2xl border border-primary/20 bg-background/50 p-3 text-sm">
                {history.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground">
                    Poochein pricing, services, ya site visit ke baare mein.
                  </p>
                )}
                {history.slice(-6).map((t, i) => (
                  <div key={i} className={t.role === "user" ? "text-foreground" : "text-muted-foreground"}>
                    <span className="mr-2 text-[10px] font-black uppercase tracking-widest text-accent">
                      {t.role === "user" ? "You" : "AI"}
                    </span>
                    {t.content}
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <div className="flex w-full items-center justify-center">
                {status === "listening" ? (
                  <button
                    onClick={stopListening}
                    className="flex items-center gap-2 rounded-full bg-destructive px-6 py-3 text-sm font-bold text-destructive-foreground shadow-lg transition-transform hover:scale-105"
                  >
                    <Square className="h-4 w-4 fill-current" /> Stop & Send
                  </button>
                ) : (
                  <button
                    onClick={startListening}
                    disabled={status === "thinking" || status === "speaking"}
                    className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Mic className="h-4 w-4" /> {history.length === 0 ? "Start Talking" : "Speak again"}
                  </button>
                )}
              </div>

              <p className="text-center text-[10px] text-muted-foreground">
                AI voice · WhatsApp +92 332 5430155 for quotes
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}