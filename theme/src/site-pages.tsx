import type { ReactNode } from "react";
import { Tao3kSiteFooter } from "./site-footer";
import { PlatformDeploymentPage } from "./pages/platform/deployment-mode-page";
import { PlatformPage } from "./pages/platform/platform-page";
import { ProductsPage } from "./pages/products/products-page";
import { SolutionsPage } from "./pages/solutions/solutions-page";
import { ComparisonPage } from "./pages/comparison/comparison-page";
import { PrinciplesPage } from "./pages/principles/principles-page";
import { RoadmapPage } from "./pages/roadmap/roadmap-page";
import type { SiteRouteDefinition, SiteRouteId } from "./site-routes";
import "./site-pages.css";

export type ApplicationPageData = Readonly<{
  shell: unknown;
  route: SiteRouteDefinition | null;
  requestedId: string;
}>;

const routePages: Readonly<Record<SiteRouteId, () => ReactNode>> = {
  platform: PlatformPage,
  "platform/on-premises": () => <PlatformDeploymentPage modeId="platform/on-premises" />,
  "platform/hybrid": () => <PlatformDeploymentPage modeId="platform/hybrid" />,
  "platform/managed-cloud": () => <PlatformDeploymentPage modeId="platform/managed-cloud" />,
  products: ProductsPage,
  solutions: SolutionsPage,
  comparison: ComparisonPage,
  principles: PrinciplesPage,
  roadmap: RoadmapPage,
};

function SiteDocument({ route, requestedId }: ApplicationPageData) {
  if (!route) {
    return (
      <main className="tao3k-not-found">
        <p className="tao3k-route-kicker">UNKNOWN DESTINATION</p>
        <h1>“{requestedId || "this route"}” is not part of the public site.</h1>
        <a href="/">
          Return home <span aria-hidden="true">→</span>
        </a>
      </main>
    );
  }
  const Page = routePages[route.id];
  return (
    <main className={`tao3k-route-page tao3k-route-page--${route.id}`}>
      <Page />
    </main>
  );
}

export function Tao3kApplicationHome({ shell: _shell }: { readonly shell: unknown }) {
  return <Tao3kSiteFooter />;
}

export function Tao3kApplicationDocument(data: ApplicationPageData) {
  return (
    <div className="tao3k-application-shell">
      <SiteDocument {...data} />
      <Tao3kSiteFooter />
    </div>
  );
}
