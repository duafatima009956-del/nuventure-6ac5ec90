import { createFileRoute } from "@tanstack/react-router";
import { generateText, type ModelMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the Nuventure Constructions AI voice concierge — a warm, premium construction assistant based in Islamabad, Pakistan.

About Nuventure Constructions:
- Founded and led by Adnan Javed Paracha. We build luxury homes, villas & commercial plazas across Lahore and Islamabad.
- Tagline: Contemporary Design | Premium Build Quality | A-to-Z Solutions.
- Services: Architecture & Design Planning, Residential & Commercial Construction, HD 3D Front Elevations, Renovation & Upgradation, Complete Project Supervision, Turnkey Key-in-Hand Delivery.
- Head Office: Office No. 201, 2nd Floor, Salam Tower, Faisal Town Markaz, Islamabad. Office hours: Mon–Sat, 10 AM to 7 PM.
- Contact: WhatsApp +92 328 4734463.

Voice reply rules:
- Reply in the SAME language the visitor used (English, Urdu, Roman Urdu, Hindi). If Urdu/Hindi/Roman Urdu, reply in natural Roman Urdu.
- Keep answers SHORT (2-4 sentences max) — this will be spoken aloud, so no markdown, no bullet points, no code, no emojis.
- Use plain conversational sentences with natural punctuation only.
- For quotes, free 3D design sessions, or site visits, invite them to WhatsApp +92 328 4734463 or to talk directly to Adnan.
- Never invent prices, timelines or projects beyond what is listed.`;

type Turn = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/voice-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const { history, userText } = (await request.json()) as {
          history?: Turn[];
          userText?: string;
        };
        if (!userText) return new Response("userText required", { status: 400 });

        const gateway = createLovableAiGatewayProvider(key);
        const messages: ModelMessage[] = [
          ...((history ?? []).slice(-10).map((t) => ({
            role: t.role,
            content: t.content,
          })) as ModelMessage[]),
          { role: "user", content: userText },
        ];

        try {
          const { text } = await generateText({
            model: gateway("openai/gpt-5.5"),
            system: SYSTEM_PROMPT,
            messages,
          });
          return new Response(JSON.stringify({ text }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "AI error";
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});