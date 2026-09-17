import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/stt")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const form = await request.formData();
        const file = form.get("file");
        if (!(file instanceof File) || file.size < 512) {
          return new Response(JSON.stringify({ text: "" }), {
            headers: { "content-type": "application/json" },
          });
        }

        const upstream = new FormData();
        upstream.append("model", "openai/gpt-4o-transcribe");
        const mime = file.type.split(";")[0];
        const ext =
          mime === "audio/webm"
            ? "webm"
            : mime === "audio/mp4"
              ? "mp4"
              : mime === "audio/mpeg"
                ? "mp3"
                : mime === "audio/wav"
                  ? "wav"
                  : "webm";
        upstream.append("file", file, `recording.${ext}`);

        const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}` },
          body: upstream,
        });

        const body = await res.text();
        return new Response(body, {
          status: res.status,
          headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
        });
      },
    },
  },
});
