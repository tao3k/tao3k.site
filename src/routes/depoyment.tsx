import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/depoyment")({
  beforeLoad: () => {
    throw redirect({ to: "/deployment" });
  },
});
