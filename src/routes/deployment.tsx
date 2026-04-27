import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "../components/ContentPage";
import { DeploymentSurface } from "../components/DeploymentSurface";
import { Layout } from "../components/Layout";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/deployment")({
  component: DeploymentRoute,
});

function DeploymentRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.deployment}>
        <DeploymentSurface modes={model.deploymentModes} />
      </ContentPage>
    </Layout>
  );
}
