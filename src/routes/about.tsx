import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Coming Soon | Nuventure Constructions" },
      { name: "description", content: "Our About page is coming soon. Nuventure Constructions — Lahore & Islamabad." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon pageName="About" />,
});
