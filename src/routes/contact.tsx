import { createFileRoute } from "@tanstack/react-router";

import { ContactSurface } from "../components/ContactSurface";
import { ContentPage } from "../components/ContentPage";
import { Layout } from "../components/Layout";
import { readSiteModel } from "../content/site";

export const Route = createFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const model = readSiteModel();

  return (
    <Layout>
      <ContentPage page={model.pages.contact}>
        <ContactSurface options={model.contactOptions} />
      </ContentPage>
    </Layout>
  );
}
