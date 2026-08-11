import "./platform-overview-hero.css";

const platformAxes = [
  ["FROM", "Domain evidence and enterprise systems"],
  ["THROUGH", "Qualified reasoning and governed operation"],
  ["INTO", "Reproducible services across explicit authority boundaries"],
] as const;

export function PlatformOverviewHero() {
  return (
    <section className="tao3k-platform-overview-hero">
      <div className="tao3k-platform-overview-hero__copy">
        <p className="tao3k-route-kicker">PLATFORM / QUALIFIED VERTICAL AI</p>
        <h1>Build vertical AI systems that can be verified, reproduced and operated.</h1>
        <p className="tao3k-platform-overview-hero__lead">
          tao3k connects domain evidence, semantic reasoning, scientific computation, governed AI
          operations and reproducible delivery in one inspectable system.
        </p>
      </div>

      <aside aria-label="Platform system boundary">
        <span>ONE INSPECTABLE SYSTEM</span>
        <dl>
          {platformAxes.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
