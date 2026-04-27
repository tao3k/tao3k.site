import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "../components/ContentPage";
import { Layout } from "../components/Layout";
import { readPage, readSiteModel } from "../content/site";

export const Route = createFileRoute("/platform")({
  component: PlatformRoute,
});

function PlatformRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={readPage("platform")} modules={model.modules} />
    </Layout>
  );
}
