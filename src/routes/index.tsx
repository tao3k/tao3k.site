import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "../components/Layout";
import { RuntimeSurface } from "../components/RuntimeSurface";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <RuntimeSurface traces={model.traces} />
    </Layout>
  );
}
