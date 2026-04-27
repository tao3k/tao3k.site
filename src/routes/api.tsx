import { createFileRoute } from "@tanstack/react-router";

import { ApiProtocolSurface } from "../components/ApiProtocolSurface";
import { ContentPage } from "../components/ContentPage";
import { Layout } from "../components/Layout";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/api")({
  component: ApiRoute,
});

function ApiRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.api}>
        <ApiProtocolSurface protocols={model.apiProtocols} />
      </ContentPage>
    </Layout>
  );
}
