import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "../components/ContentPage";
import { Layout } from "../components/Layout";
import { OpenSourceSurface } from "../components/OpenSourceSurface";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/open-source")({
  component: OpenSourceRoute,
});

function OpenSourceRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.openSource}>
        <OpenSourceSurface lanes={model.openSourceLanes} gates={model.validationGates} />
      </ContentPage>
    </Layout>
  );
}
