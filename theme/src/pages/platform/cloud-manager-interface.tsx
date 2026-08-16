import { useEffect, useState } from "react";
import "./cloud-manager-interface.css";

const cloudStages = ["DISCOVER", "CONTRACT", "AUTHOR", "PROJECT", "VERIFY"] as const;
type CloudStage = (typeof cloudStages)[number];
type AuthoringSurface = "scheme" | "nickel";

const stageDescriptions: Record<CloudStage, string> = {
  DISCOVER: "Read Kubernetes OpenAPI and structural CRD schemas as versioned API facts.",
  CONTRACT: "Attach enterprise meaning, policy and authority to selected schema paths.",
  AUTHOR: "Express reusable high-order intent in Scheme or Nickel—not copied YAML.",
  PROJECT: "Lower only admitted intent into target-specific Kubernetes resources.",
  VERIFY: "Return schema, contract, artifact and destination identity in one receipt.",
};

const schemaFields = [
  ["/spec/replicas", "integer · minimum 1"],
  ["/spec/template/spec/containers", "array · required"],
  ["/resources/requests", "object · bounded"],
  ["/metadata/labels/tenant", "string · qualified"],
] as const;

const contractMappings = [
  ["capacity.replicas", "/spec/replicas", "1…12"],
  ["workload.resources", "/containers/0/resources", "profile bound"],
  ["authority.tenant", "/metadata/labels/tenant", "immutable"],
  ["network.egress", "NetworkPolicy/spec/egress", "allowlisted"],
] as const;

const sourceBySurface: Record<AuthoringSurface, string> = {
  scheme: `(cloud-intent research-api
  (use-contract tenant-workload/v3)
  (capacity (replicas 3) (profile scientific-cpu))
  (authority (tenant atlas) (region us-west))
  (network (egress evidence-store model-registry)))`,
  nickel: `let Workload = contract {
  capacity | Capacity,
  authority | TenantAuthority,
  network | EgressContract,
} in Workload & {
  capacity.replicas = 3,
  authority = { tenant = "atlas", region = "us-west" },
}`,
};

const projections = [
  ["Deployment", "apps/v1", "research-api"],
  ["Service", "v1", "research-api"],
  ["NetworkPolicy", "networking.k8s.io/v1", "evidence-egress"],
  ["Receipt", "tao3k.io/v1", "contract-admission-7f3a"],
] as const;

export function CloudManagerInterface() {
  const [activeStage, setActiveStage] = useState(0);
  const [authoringSurface, setAuthoringSurface] = useState<AuthoringSurface>("scheme");
  const [running, setRunning] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setActiveStage(cloudStages.length - 1);
      setRunning(false);
    };
    preference.addEventListener("change", synchronize);
    return () => preference.removeEventListener("change", synchronize);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % cloudStages.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [running]);

  const stage = cloudStages[activeStage];

  return (
    <section className="tao3k-cloud-manager" data-stage={stage.toLowerCase()}>
      <header className="tao3k-cloud-manager__intro">
        <div>
          <p className="tao3k-route-kicker">CLOUD CONTRACT INTERFACE</p>
          <h2>Manage cloud complexity by compiling contracts—not hand-writing manifests.</h2>
        </div>
        <p>
          Kubernetes publishes machine-readable API structure. tao3k turns that structure into
          enterprise contracts, gives Scheme and Nickel a higher-order authoring surface, and
          projects only qualified intent back into the cloud.
        </p>
      </header>

      <div className="tao3k-cloud-manager__stagebar">
        <ol aria-label="Cloud contract compilation stages">
          {cloudStages.map((candidate, index) => (
            <li className={index === activeStage ? "is-active" : undefined} key={candidate}>
              <button
                onClick={() => {
                  setActiveStage(index);
                  setRunning(false);
                }}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {candidate}
              </button>
            </li>
          ))}
        </ol>
        <div>
          <strong>{stage}</strong>
          <p>{stageDescriptions[stage]}</p>
          <button onClick={() => setRunning((value) => !value)} type="button">
            {running ? "Pause" : "Run"}
          </button>
        </div>
      </div>

      <div className="tao3k-cloud-manager__compiler">
        <article className="tao3k-cloud-manager__schema">
          <header>
            <span>01 / API FACTS</span>
            <strong>KUBERNETES JSON SCHEMA</strong>
          </header>
          <div>
            <p>apps/v1 · Deployment</p>
            <small>openapi-v3@1.34 · digest 4e91</small>
          </div>
          <dl>
            {schemaFields.map(([path, shape]) => (
              <div key={path}>
                <dt>{path}</dt>
                <dd>{shape}</dd>
              </div>
            ))}
          </dl>
          <footer>OpenAPI · CRD structural schemas · provider extensions</footer>
        </article>

        <div className="tao3k-cloud-manager__mapping" aria-label="Schema contract mapping">
          <header>
            <span>02 / SEMANTIC BOUNDARY</span>
            <strong>CONTRACT REGISTRY</strong>
            <small>tenant-workload/v3</small>
          </header>
          <div className="tao3k-cloud-manager__mapping-head">
            <span>CONTRACT FIELD</span>
            <span>JSON SCHEMA TARGET</span>
            <span>GUARD</span>
          </div>
          <ol>
            {contractMappings.map(([field, target, guard], index) => (
              <li className={index <= activeStage ? "is-admitted" : undefined} key={field}>
                <strong>{field}</strong>
                <span>{target}</span>
                <small>{guard}</small>
              </li>
            ))}
          </ol>
          <footer>
            <span>SCHEMA COMPATIBLE</span>
            <span>POLICY BOUND</span>
            <span>AUTHORITY EXPLICIT</span>
          </footer>
        </div>

        <article className="tao3k-cloud-manager__authoring">
          <header>
            <div>
              <span>03 / HIGH-ORDER INTENT</span>
              <strong>{authoringSurface === "scheme" ? "SCHEME" : "NICKEL"}</strong>
            </div>
            <fieldset
              className="tao3k-cloud-manager__language-switch"
              aria-label="Authoring language"
            >
              <button
                aria-pressed={authoringSurface === "scheme"}
                onClick={() => setAuthoringSurface("scheme")}
                type="button"
              >
                Scheme
              </button>
              <button
                aria-pressed={authoringSurface === "nickel"}
                onClick={() => setAuthoringSurface("nickel")}
                type="button"
              >
                Nickel
              </button>
            </fieldset>
          </header>
          <pre>
            <code>{sourceBySurface[authoringSurface]}</code>
          </pre>
          <footer>
            Illustrative authoring model · the contract, not the syntax, is the stable public
            boundary.
          </footer>
        </article>
      </div>

      <div className="tao3k-cloud-manager__projection">
        <header>
          <div>
            <span>04 / QUALIFIED PROJECTION</span>
            <h3>One intent becomes a bounded cloud release.</h3>
          </div>
          <dl>
            <div>
              <dt>SCHEMA</dt>
              <dd>4e91</dd>
            </div>
            <div>
              <dt>CONTRACT</dt>
              <dd>v3</dd>
            </div>
            <div>
              <dt>REGION</dt>
              <dd>us-west</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>{activeStage === cloudStages.length - 1 ? "VERIFIED" : "EVALUATING"}</dd>
            </div>
          </dl>
        </header>
        <ol>
          {projections.map(([kind, api, name], index) => (
            <li className={activeStage >= 3 ? "is-projected" : undefined} key={kind}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{kind}</strong>
                <small>{api}</small>
              </div>
              <p>{name}</p>
              <em>
                {activeStage === 4 ? "qualified" : activeStage >= 3 ? "projected" : "waiting"}
              </em>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
