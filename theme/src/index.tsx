import {
  defineFederatedContentRoutes,
  defineFederatedThemeModule,
  themeModuleProtocol,
} from "@org-zhixing/theme-contract";
import type { ReactNode } from "react";

import {
  Tao3kApplicationDocument,
  Tao3kApplicationHome,
  type ApplicationPageData,
} from "./site-pages";
import { Tao3kSiteHeader as Tao3kThemeHeader, Tao3kSiteHome as Tao3kThemeHero } from "./site-home";
import { resolveSiteRoute } from "./site-routes";

import "./theme.css";
import "./workbench.css";
import "./site-home.css";
import "./site-pages.css";

export { Tao3kThemeHeader, Tao3kThemeHero };

type ShellLike = {
  readonly site?: { readonly title?: string };
  readonly staticSite?: { readonly sources?: readonly unknown[] } | null;
};

type ThemeLayoutContext = {
  readonly document?: unknown;
  readonly renderedHtml?: string;
  readonly route: { readonly path?: string; readonly view?: string };
  readonly site?: {
    readonly theme?: {
      readonly config?: {
        readonly page_archetypes?: Readonly<Record<string, string>>;
      };
    };
  };
};

type ThemeLayoutApi = {
  readonly renderView: (options: { readonly document: unknown; readonly view: string }) => string;
};

export function LegacyTao3kThemeHeader({ shell }: { readonly shell: ShellLike }): ReactNode {
  return (
    <header className="tao3k-zhixing-header">
      <a className="tao3k-zhixing-brand" href="/">
        <span aria-hidden="true" className="tao3k-zhixing-mark">
          道
        </span>
        <span>
          <strong>{shell.site?.title ?? "tao3k.site"}</strong>
          <small>governed agent infrastructure</small>
        </span>
      </a>
      <nav aria-label="Primary navigation" className="tao3k-zhixing-nav">
        <a href="/">Overview</a>
        <a href="/platform">Platform</a>
        <a href="/research">Research</a>
        <a href="/org-zhixing-demo">Field Notes</a>
        <a href="https://github.com/tao3k">GitHub</a>
      </nav>
    </header>
  );
}

export function LegacyTao3kThemeHero({ title }: { readonly title: string }): ReactNode {
  return (
    <section className="tao3k-zhixing-hero">
      <p>TAO3K / ZHIXING</p>
      <h1>{title}</h1>
      <div className="tao3k-zhixing-hero-summary">
        <span>Independent theme · federated delivery · Org source of truth</span>
        <ul aria-label="Theme capabilities">
          <li>
            <strong>Contract-bound</strong>
            <small>Protocol v1</small>
          </li>
          <li>
            <strong>Remote-first</strong>
            <small>Module Federation</small>
          </li>
          <li>
            <strong>Org-native</strong>
            <small>Content as knowledge</small>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Tao3kRuntimeState({ shell }: { readonly shell: ShellLike }): ReactNode {
  const sourceCount = shell.staticSite?.sources?.length ?? 0;
  return (
    <aside className="tao3k-zhixing-runtime" aria-label="Theme runtime state">
      <span aria-hidden="true" />
      <strong>{sourceCount} Org sources</strong>
      <small>remote tao3k_site · protocol v1</small>
    </aside>
  );
}

const variants = [
  {
    id: "night",
    label: "Night",
    tokens: {
      color: { canvas: "#080b0a", surface: "#111815", text: "#eef2ec", accent: "#8be28b" },
      typography: {
        body: "Inter, ui-sans-serif, system-ui, sans-serif",
        heading: "Inter, ui-sans-serif, system-ui, sans-serif",
        mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "32px" },
    },
  },
  {
    id: "paper",
    label: "Paper",
    tokens: {
      color: { canvas: "#f1f0e9", surface: "#ffffff", text: "#20251f", accent: "#176b45" },
      typography: {
        body: "Inter, ui-sans-serif, system-ui, sans-serif",
        heading: "Inter, ui-sans-serif, system-ui, sans-serif",
        mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "32px" },
    },
  },
] as const;

const pageArchetypes = new Set([
  "system-map",
  "product-atlas",
  "evidence-matrix",
  "principles-charter",
  "roadmap-horizons",
  "research-continuum",
  "editorial",
]);

const resolvePageArchetype = (context: ThemeLayoutContext): string => {
  const routeKey = context.route.path?.replace(/^\/+|\/+$/gu, "") ?? "";
  const requested = context.site?.theme?.config?.page_archetypes?.[routeKey];
  return requested && pageArchetypes.has(requested) ? requested : "editorial";
};

const renderTao3kPage = (context: ThemeLayoutContext, _api: ThemeLayoutApi): string => {
  const content = context.renderedHtml ?? "";
  return `<div class="tao3k-page tao3k-page--${resolvePageArchetype(context)}">${content}</div>`;
};

const tao3kContentRoutes = defineFederatedContentRoutes<unknown, ApplicationPageData, ReactNode>({
  exclusiveContentRoutes: true,
  loadDocument: async (shell, documentId) => ({
    shell,
    route: resolveSiteRoute(documentId),
    requestedId: documentId,
  }),
  renderDocument: (data) => <Tao3kApplicationDocument {...data} />,
  renderHome: (shell) => <Tao3kApplicationHome shell={shell} />,
});

export const tao3kZhixingTheme = {
  name: "tao3k-site",
  version: "1.0.0",
  manifest: {
    schemaVersion: 1,
    id: "tao3k-site",
    package: "tao3k.site",
    version: "1.0.0",
    displayName: "tao3k.site",
    engine: ">=0.1 <0.2",
    defaultVariant: "night",
    variants: variants.map(({ id }) => id),
    capabilities: ["application", "marketing", "technical-documentation"],
    content: { base: "workspace", directory: "docs", routeMode: "application" },
    publicSlots: [
      {
        id: "site-header",
        strategies: ["replace"],
        runtime: "universal",
        stability: "stable",
      },
      {
        id: "site-hero",
        strategies: ["replace"],
        runtime: "universal",
        stability: "stable",
      },
      {
        id: "runtime-state",
        strategies: ["replace"],
        runtime: "universal",
        stability: "stable",
      },
    ],
    renderers: { "react-spa": { export: "./theme", serverComponents: false } },
    renderModes: ["static"],
  },
  variants,
  rendererBindings: {
    "react-spa": {
      kind: "org-zhixing/react-spa/v1",
      contentRoutes: tao3kContentRoutes,
      slots: {
        "site-header": { strategy: "replace", component: Tao3kThemeHeader },
        "site-hero": { strategy: "replace", component: Tao3kThemeHero },
        "runtime-state": { strategy: "replace", component: Tao3kRuntimeState },
      },
    },
  },
  layouts: {
    index: () => "",
    page: renderTao3kPage,
    post: renderTao3kPage,
    section: renderTao3kPage,
    default: renderTao3kPage,
  },
} as const;

export default defineFederatedThemeModule(tao3kZhixingTheme);

export { themeModuleProtocol as zhixingThemeProtocol };
