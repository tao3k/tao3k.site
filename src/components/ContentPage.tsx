import { Link as RouterLink } from "@tanstack/react-router";
import type { ReactNode } from "react";

import type { PageContent, PlatformModule } from "../content/site";
import { ProductSurface } from "./ProductSurface";

type ContentPageProps = {
  readonly page: PageContent;
  readonly modules?: readonly PlatformModule[];
  readonly children?: ReactNode;
};

export function ContentPage({ page, modules = [], children }: ContentPageProps) {
  return (
    <section className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
        {page.ctaTo.startsWith("http") ? (
          <a className="primary-action" href={page.ctaTo}>
            {page.ctaLabel}
          </a>
        ) : (
          <RouterLink className="primary-action" to={page.ctaTo}>
            {page.ctaLabel}
          </RouterLink>
        )}
      </div>

      {modules.length > 0 ? <ProductSurface modules={modules} /> : null}

      {children}

      <div className="section-grid">
        {page.sections.map((section) => (
          <article className="section-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
