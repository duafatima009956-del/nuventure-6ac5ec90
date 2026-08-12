import { createFileRoute } from "@tanstack/react-router";
import { MaintenanceOverlay } from "@/components/site/MaintenanceOverlay";

export const Route = createFileRoute("/maintenance")({
  component: MaintenanceOverlay,
});
