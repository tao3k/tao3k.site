import { DeploymentDeliveryDemo } from "./deployment-delivery-demo";
import { PlatformOverviewHero } from "./platform-overview-hero";
import { PlatformSystemLoop } from "./platform-system-loop";
import "./platform-page.css";

const deploymentTargets = [
  { target: "LOCAL", detail: "Research, inspection and bounded development" },
  {
    target: "ON-PREMISES",
    detail: "Customer-owned data, identity and hardware",
    href: "/platform/on-premises",
  },
  {
    target: "HYBRID",
    detail: "Sensitive authority with qualified elastic capability",
    href: "/platform/hybrid",
  },
  {
    target: "MANAGED CLOUD",
    detail: "Qualified tenant, region and service profile",
    href: "/platform/managed-cloud",
  },
] as const;

const deliveryDisciplines = [
  {
    id: "COMPOSE",
    eyebrow: "SYSTEM INTENT",
    title: "Express the system without exposing infrastructure complexity.",
    detail:
      "POO Flow composes modular intent, conditions, state and qualification boundaries. Omnibus expands admitted system profiles without copying an entire deployment stack.",
    stages: ["POO Flow intent", "System IR", "Omnibus composition"],
    result: "Qualified system model",
  },
  {
    id: "REALIZE",
    eyebrow: "SOFTWARE IDENTITY",
    title: "Carry one reproducible identity into every target.",
    detail:
      "Bazel evaluates the build graph while Nix realizes toolchains, dependencies, services and operating environments as inspectable immutable closures.",
    stages: ["Bazel graph", "Nix derivations", "Target projection"],
    result: "Environment qualification receipt",
  },
] as const;

export function PlatformPage() {
  return (
    <div className="tao3k-platform">
      <PlatformOverviewHero />
      <PlatformSystemLoop />

      <section className="tao3k-platform-deployment" aria-labelledby="platform-deployment-title">
        <div className="tao3k-platform-deployment__copy">
          <p className="tao3k-route-kicker">REPRODUCIBLE DELIVERY</p>
          <h2 id="platform-deployment-title">From system intent to a qualified fleet.</h2>
          <p>
            AI can accelerate authoring, but generated configuration is not admitted because it
            merely parses. Composition, derivation, closure identity, target projection and
            environment qualification remain inspectable boundaries.
          </p>
        </div>
        <div className="tao3k-platform-deployment__targets">
          <header>
            <span>ONE SYSTEM IDENTITY</span>
            <p>Choose where its authority lives.</p>
          </header>
          {deploymentTargets.map(({ target, detail, ...deployment }) =>
            "href" in deployment ? (
              <a href={deployment.href} key={target}>
                <span>{target}</span>
                <p>{detail}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ) : (
              <article key={target}>
                <span>{target}</span>
                <p>{detail}</p>
              </article>
            ),
          )}
        </div>

        <DeploymentDeliveryDemo />

        <div className="tao3k-platform-deployment__disciplines">
          {deliveryDisciplines.map((discipline) => (
            <article key={discipline.id}>
              <header>
                <strong>{discipline.id}</strong>
                <span>{discipline.eyebrow}</span>
              </header>
              <h3>{discipline.title}</h3>
              <p>{discipline.detail}</p>
              <ol aria-label={`${discipline.id} stages`}>
                {discipline.stages.map((stage) => (
                  <li key={stage}>{stage}</li>
                ))}
              </ol>
              <small>{discipline.result}</small>
            </article>
          ))}
        </div>

        <div className="tao3k-platform-deployment__boundary">
          <strong>AI accelerates configuration. The system makes it admissible.</strong>
          <p>
            POO Flow, contracts, Omnibus, Nix derivations and target qualification constrain the
            result. Kubernetes may be a runtime surface, but no target adapter becomes the source of
            system truth.
          </p>
        </div>
      </section>

      <section className="tao3k-platform-boundaries" aria-label="Platform invariants">
        <article>
          <span>INPUT</span>
          <h2>Evidence before automation</h2>
          <p>Source, authorship, state and constraints remain attached before interpretation.</p>
        </article>
        <article>
          <span>AUTHORITY</span>
          <h2>Qualification before action</h2>
          <p>Confidence can propose. Evidence, policy and accountable authority permit.</p>
        </article>
        <article>
          <span>RETURN</span>
          <h2>Receipts after execution</h2>
          <p>Execution remains incomplete until its outcome can be inspected and challenged.</p>
        </article>
      </section>

      <section className="tao3k-platform-next">
        <p>Platform defines the shared system.</p>
        <div>
          <a href="/products">Products show what can be adopted</a>
          <a href="/solutions">Solutions show how the system is composed</a>
        </div>
      </section>
    </div>
  );
}
