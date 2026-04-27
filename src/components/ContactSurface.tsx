import { Link as RouterLink } from "@tanstack/react-router";

import type { ContactOption } from "../content/site";

type ContactSurfaceProps = {
  readonly options: readonly ContactOption[];
};

export function ContactSurface({ options }: ContactSurfaceProps) {
  return (
    <section className="contact-surface" aria-labelledby="contact-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">adoption paths</p>
        <h2 id="contact-surface-title">Choose the first concrete conversation.</h2>
      </div>
      <div className="contact-grid">
        {options.map((option) => (
          <article className="contact-card" key={option.id}>
            <div>
              <span>{option.audience}</span>
              <h3>{option.label}</h3>
            </div>
            <p>{option.summary}</p>
            <div className="contact-signals">
              {option.signals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            {option.route.startsWith("http") ? (
              <a className="secondary-action" href={option.route}>
                Open repository
              </a>
            ) : (
              <RouterLink className="secondary-action" to={option.route}>
                Inspect path
              </RouterLink>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
