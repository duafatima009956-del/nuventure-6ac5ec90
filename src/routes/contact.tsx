import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Coming Soon | Nuventure Constructions" },
      { name: "description", content: "Our Contact page is coming soon. WhatsApp 0328 4734463." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon pageName="Contact" />,
});
