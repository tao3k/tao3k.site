import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "../components/ContentPage";
import { Layout } from "../components/Layout";
import { ResearchMoatSurface } from "../components/ResearchMoatSurface";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/research")({
  component: ResearchRoute,
});

function ResearchRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.research}>
        <ResearchMoatSurface moats={model.researchMoats} />
      </ContentPage>
    </Layout>
  );
}
