import "./deployment-mode-page.css";

const platformDeploymentModes = {
  "platform/on-premises": {
    label: "On-Premises",
    code: "CUSTOMER BOUNDARY / 01",
    title: "Your infrastructure remains the authority.",
    thesis:
      "tao3k enters the customer boundary as a reproducible system closure—not as an opaque control plane that quietly exports operational meaning.",
    boundary: "CUSTOMER-OWNED TRUST DOMAIN",
    topology: [
      ["Identity + secrets", "Customer control"],
      ["Data + compute", "Customer hardware"],
      ["Qualified runtime", "Immutable closure"],
      ["Receipts", "Customer evidence store"],
    ],
    qualifiers: [
      "Pinned and attestable build inputs",
      "Customer-owned workload identity and keys",
      "Offline or restricted-network update paths",
      "Local policy, authority and evidence retention",
    ],
    operations: [
      ["DELIVER", "Bazel graph + Nix closure"],
      ["ADMIT", "Local identity, hardware and policy qualification"],
      ["OPERATE", "Customer-controlled runtime and receipts"],
    ],
  },
  "platform/hybrid": {
    label: "Hybrid",
    code: "SPLIT AUTHORITY / 02",
    title: "Move capability. Keep authority anchored.",
    thesis:
      "Sensitive records and consequential authority stay local while qualified workloads use elastic services through an explicit, inspectable boundary.",
    boundary: "LOCAL AUTHORITY ↔ QUALIFIED CLOUD",
    topology: [
      ["Evidence authority", "Local / on-premises"],
      ["Policy gateway", "Qualified boundary"],
      ["Elastic compute", "Selected cloud region"],
      ["Receipt return", "Local evidence graph"],
    ],
    qualifiers: [
      "Field-level data movement policy",
      "Workload and model identity at each crossing",
      "Region, retention and purpose constraints",
      "Receipts returned before work is considered complete",
    ],
    operations: [
      ["SEPARATE", "Data, authority and compute planes"],
      ["QUALIFY", "Every boundary crossing"],
      ["RETURN", "Outcomes to the local evidence owner"],
    ],
  },
  "platform/managed-cloud": {
    label: "Managed Cloud",
    code: "MANAGED OPERATION / 03",
    title: "Managed does not have to mean unknowable.",
    thesis:
      "tao3k operates the service while preserving tenant, region, artifact, model, policy and decision identity as evidence the customer can inspect.",
    boundary: "TAO3K-OPERATED / CUSTOMER-QUALIFIED",
    topology: [
      ["Tenant identity", "Explicit isolation"],
      ["Regional data plane", "Declared locality"],
      ["Managed runtime", "Versioned closure"],
      ["Evidence export", "Customer-verifiable"],
    ],
    qualifiers: [
      "Versioned service and model inventory",
      "Tenant and regional isolation evidence",
      "Policy-bound operations and human escalation",
      "Portable records, receipts and exit path",
    ],
    operations: [
      ["PROVISION", "Qualified tenant and region profile"],
      ["OPERATE", "Managed upgrades with artifact identity"],
      ["EXPOSE", "Evidence, receipts and portability"],
    ],
  },
} as const;

type PlatformDeploymentModeId = keyof typeof platformDeploymentModes;

const deploymentPlatformLayers = [
  {
    layer: "EVIDENCE",
    title: "Records keep their origin",
    detail: "Org-native records, contracts, source identity and provenance remain authoritative.",
    systems: "Orgize · Org Zhixing · ASP",
  },
  {
    layer: "DATA",
    title: "One analytical fabric",
    detail: "Arrow carries typed in-memory state; Parquet persists portable analytical material.",
    systems: "Arrow · Parquet · DuckDB · Flight",
  },
  {
    layer: "REASON",
    title: "Relationships stay inspectable",
    detail: "Graph query, relational deduction and ontology expose how a conclusion was formed.",
    systems: "GQL Rust · Ascent · ontology",
  },
  {
    layer: "SCIENCE",
    title: "Compute remains qualified",
    detail:
      "High-performance graph and scientific compute produce evidence without granting authority.",
    systems: "Julia · Julia Graphs · WendaoGraphs.jl",
  },
  {
    layer: "OPERATE",
    title: "Work survives a session",
    detail:
      "Composable cases meet a durable Agent Core with checkpoints, recovery and bounded effects.",
    systems: "POO Flow · Marlin",
  },
  {
    layer: "DELIVER",
    title: "One release discipline, software to fleet",
    detail:
      "SDLC fixes the build graph and system closure; SDOS projects the qualified topology without rebuilding it for each destination.",
    systems: "SDLC · Bazel · Nix · SDOS · Omnibus · Hive",
  },
] as const;

const deploymentModeDetails = {
  "platform/on-premises": {
    decision:
      "Choose On-Premises when the organization—not a vendor control plane—must own the complete trust domain.",
    bestFor: [
      "Regulated research, clinical, industrial and sovereign environments",
      "Source systems or models that cannot leave a controlled network",
      "Organizations with established security, identity and infrastructure teams",
    ],
    tradeoffs: [
      "Capacity planning and hardware lifecycle remain customer responsibilities",
      "Upgrade windows must align with local validation and change control",
      "Operational readiness is qualified against the customer environment",
    ],
    adoption: [
      ["BOUNDARY STUDY", "Map data classes, identity, hardware, policy and accountable owners."],
      ["REPRODUCIBLE PILOT", "Deliver a pinned closure into a bounded non-production environment."],
      ["LOCAL QUALIFICATION", "Exercise recovery, evidence export, policy and operator authority."],
      ["CONTROLLED OPERATION", "Promote through customer change control with signed receipts."],
    ],
    questions: [
      [
        "Who holds the keys?",
        "The customer owns workload identity, secrets and root operational authority.",
      ],
      [
        "Does operation require tao3k cloud?",
        "No. Restricted-network and customer-operated paths are first-class deployment requirements.",
      ],
      [
        "How are upgrades controlled?",
        "Every upgrade is a versioned closure that must pass local qualification before promotion.",
      ],
      [
        "Where do receipts live?",
        "Inside the customer evidence store, under customer retention and access policy.",
      ],
    ],
  },
  "platform/hybrid": {
    decision:
      "Choose Hybrid when evidence authority must stay local but selected workloads benefit from elastic or specialized cloud capability.",
    bestFor: [
      "Data-residency environments that still require elastic scientific compute",
      "Multi-site organizations coordinating governed work across trust domains",
      "Product partners that contribute models or workflows without owning source records",
    ],
    tradeoffs: [
      "The crossing policy must be designed at field and workload level",
      "Network failure, retry and partial completion become explicit operating states",
      "Cloud efficiency never overrides local evidence and authority ownership",
    ],
    adoption: [
      ["SPLIT THE PLANES", "Name what stays local and which capability may be remotely exercised."],
      [
        "DECLARE CROSSINGS",
        "Bind fields, purpose, region, retention, workload and model identity.",
      ],
      ["FAIL CLOSED", "Test disconnection, replay, duplicate work and incomplete receipt return."],
      [
        "EXPAND BY PROOF",
        "Add workloads only after the previous boundary produces stable evidence.",
      ],
    ],
    questions: [
      [
        "What leaves the customer boundary?",
        "Only fields and artifacts admitted by the declared crossing contract.",
      ],
      [
        "Can the cloud act autonomously?",
        "Not across consequential boundaries; local policy and authority remain decisive.",
      ],
      [
        "What happens during disconnection?",
        "Durable local state records pending work and prevents an absent receipt from appearing complete.",
      ],
      [
        "How does cloud output return?",
        "As typed evidence bound to workload, model, policy, source and execution identity.",
      ],
    ],
  },
  "platform/managed-cloud": {
    decision:
      "Choose Managed Cloud when the organization wants a fast operating path without turning its data, decisions and artifacts into vendor-only state.",
    bestFor: [
      "Teams that need production capability before building a platform organization",
      "Standard regional deployments with explicit tenant and data policy",
      "Partner products that need a governed system layer behind their own interface",
    ],
    tradeoffs: [
      "Available regions and managed profiles define the initial operating envelope",
      "Customer policy must still assign human escalation and consequential authority",
      "Portability is exercised through evidence export and reproducible deployment artifacts",
    ],
    adoption: [
      [
        "QUALIFY THE TENANT",
        "Declare region, identity federation, data classes and authority policy.",
      ],
      [
        "CONNECT SOURCES",
        "Attach repositories and records without erasing their original ownership.",
      ],
      ["ADMIT USE CASES", "Promote bounded workflows with named models, tools and escalation."],
      [
        "OPERATE + EXPORT",
        "Receive managed upgrades, observability and portable evidence receipts.",
      ],
    ],
    questions: [
      [
        "Is this another opaque SaaS database?",
        "No. Native source ownership and portable evidence remain explicit system constraints.",
      ],
      [
        "Can we choose region and retention?",
        "The qualified tenant profile binds declared regional and retention requirements.",
      ],
      [
        "Can tao3k silently change a model?",
        "Model and service identity belong to the operation receipt and versioned service inventory.",
      ],
      [
        "Can we leave the managed service?",
        "Records, receipts and reproducible system definitions form the designed exit path.",
      ],
    ],
  },
} as const satisfies Record<
  PlatformDeploymentModeId,
  {
    readonly decision: string;
    readonly bestFor: readonly string[];
    readonly tradeoffs: readonly string[];
    readonly adoption: readonly (readonly [string, string])[];
    readonly questions: readonly (readonly [string, string])[];
  }
>;

export function PlatformDeploymentPage({ modeId }: { readonly modeId: PlatformDeploymentModeId }) {
  const mode = platformDeploymentModes[modeId];
  const details = deploymentModeDetails[modeId];
  return (
    <div className="tao3k-deployment-mode" data-mode={modeId.split("/").at(-1)}>
      <section className="tao3k-deployment-mode__hero">
        <div>
          <a href="/platform">← Platform</a>
          <p className="tao3k-route-kicker">{mode.code}</p>
          <h1>{mode.title}</h1>
        </div>
        <aside>
          <span>{mode.label}</span>
          <p>{mode.thesis}</p>
          <strong>{mode.boundary}</strong>
        </aside>
      </section>

      <section className="tao3k-deployment-mode__decision">
        <header>
          <p className="tao3k-route-kicker">WHEN THIS MODEL FITS</p>
          <h2>{details.decision}</h2>
        </header>
        <div>
          <article>
            <span>CHOOSE THIS WHEN</span>
            <ul>
              {details.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>UNDERSTAND THE TRADE</span>
            <ul>
              {details.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="tao3k-deployment-mode__topology" aria-label={`${mode.label} topology`}>
        <header>
          <p className="tao3k-route-kicker">AUTHORITY TOPOLOGY</p>
          <h2>Every boundary has an owner.</h2>
        </header>
        <ol>
          {mode.topology.map(([title, owner], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <small>{owner}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-deployment-mode__stack" aria-labelledby="deployment-stack-title">
        <header>
          <p className="tao3k-route-kicker">WHAT ACTUALLY SHIPS</p>
          <h2 id="deployment-stack-title">A complete evidence-to-operation system.</h2>
          <p>
            Deployment changes where authority lives. It does not remove the platform layers that
            make knowledge, compute and operation reproducible.
          </p>
        </header>
        <div>
          {deploymentPlatformLayers.map((layer) => (
            <article key={layer.layer}>
              <span>{layer.layer}</span>
              <h3>{layer.title}</h3>
              <p>{layer.detail}</p>
              <small>{layer.systems}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="tao3k-deployment-mode__qualification">
        <div>
          <p className="tao3k-route-kicker">DEPLOYMENT QUALIFICATION</p>
          <h2>The artifact can travel. Permission cannot.</h2>
          <p>
            Reproducibility gives each environment the same inspectable starting point. The target
            must still qualify its own identity, data rights, policy, hardware and accountable
            authority.
          </p>
        </div>
        <ul>
          {mode.qualifiers.map((qualifier) => (
            <li key={qualifier}>{qualifier}</li>
          ))}
        </ul>
      </section>

      <section className="tao3k-deployment-mode__operations" aria-label="Operating model">
        {mode.operations.map(([verb, detail]) => (
          <article key={verb}>
            <span>{verb}</span>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="tao3k-deployment-mode__adoption">
        <header>
          <p className="tao3k-route-kicker">ADOPTION PATH</p>
          <h2>Enter production by evidence, not by a leap of faith.</h2>
        </header>
        <ol>
          {details.adoption.map(([title, detail], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-deployment-mode__questions">
        <header>
          <p className="tao3k-route-kicker">CUSTOMER QUESTIONS</p>
          <h2>Questions the architecture must answer before procurement.</h2>
        </header>
        <dl>
          {details.questions.map(([question, answer]) => (
            <div key={question}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav className="tao3k-deployment-mode__siblings" aria-label="Other deployment modes">
        <span>CHOOSE ANOTHER AUTHORITY MODEL</span>
        {Object.entries(platformDeploymentModes).map(([id, candidate]) => (
          <a aria-current={id === modeId ? "page" : undefined} href={`/${id}`} key={id}>
            {candidate.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
