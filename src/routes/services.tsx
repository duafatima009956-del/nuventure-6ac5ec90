import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Coming Soon | Nuventure Constructions" },
      { name: "description", content: "Our Services page is coming soon." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon pageName="Services" />,
});
