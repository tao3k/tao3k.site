import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "../components/ContentPage";
import { EnterpriseValueSurface } from "../components/EnterpriseValueSurface";
import { Layout } from "../components/Layout";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/enterprise")({
  component: EnterpriseRoute,
});

function EnterpriseRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.enterprise}>
        <EnterpriseValueSurface values={model.enterpriseValues} />
      </ContentPage>
    </Layout>
  );
}
