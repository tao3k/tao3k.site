import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "../components/Layout";
import { SolutionSurface } from "../components/SolutionSurface";

export const Route = createFileRoute("/solutions")({
  component: SolutionsRoute,
});

function SolutionsRoute() {
  return (
    <Layout>
      <SolutionSurface />
    </Layout>
  );
}
