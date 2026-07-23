import type { ReactNode } from "react";
import type { SiteRouteDefinition, SiteRouteId } from "./site-routes";
import { PrinciplesFlow } from "./principles/principles-flow";
import { TrustKernelFoliage } from "./visuals/trust-kernel-foliage";
import trustKernelHero from "./assets/tao3k-trust-kernel-hero-v1.webp";
import "./site-pages.css";

function TrustKernelScene() {
  return (
    <div className="tao3k-trust-hero__scene" aria-hidden="true">
      <img className="tao3k-trust-hero__plate" src={trustKernelHero} alt="" />
      <TrustKernelFoliage source={trustKernelHero} />
      <span className="tao3k-trust-hero__rail-signal" />
    </div>
  );
}

export type ApplicationPageData = Readonly<{
  shell: unknown;
  route: SiteRouteDefinition | null;
  requestedId: string;
}>;

const platformStages = [
  ["01", "Record", "Human and machine work enters with provenance."],
  ["02", "Retrieve", "Semantic search finds claims, code and context."],
  ["03", "Model", "Ontologies and scientific models expose structure."],
  ["04", "Compose", "Cases become governed, reusable workflows."],
  ["05", "Qualify", "Evidence, policy and proof grant action authority."],
  ["06", "Operate", "Runtime outcomes return to the evidence substrate."],
] as const;

function PlatformPage() {
  return (
    <div className="tao3k-platform">
      <section className="tao3k-platform-hero">
        <div>
          <p className="tao3k-route-kicker">THE EVIDENCE–ACTION PLATFORM</p>
          <h1>
            One lifecycle.
            <br />
            No invisible handoff.
          </h1>
        </div>
        <div className="tao3k-platform-hero__statement">
          <span>PLATFORM INVARIANT</span>
          <p>
            Every consequential transition has an owner, a qualification state and a return path.
          </p>
        </div>
      </section>

      <section className="tao3k-platform-circuit" aria-label="Evidence lifecycle">
        <div className="tao3k-platform-circuit__core">
          <small>SHARED SUBSTRATE</small>
          <strong>
            Evidence
            <br />
            owns the lifecycle
          </strong>
          <span>not the interface · not the model · not the runtime</span>
        </div>
        <ol>
          {platformStages.map(([index, title, summary]) => (
            <li key={title}>
              <span>{index}</span>
              <div>
                <h2>{title}</h2>
                <p>{summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-platform-boundaries">
        <article>
          <span>INPUT</span>
          <h2>Evidence before automation</h2>
          <p>
            Source, authorship, state and constraints remain attached before an agent interprets a
            record.
          </p>
        </article>
        <article>
          <span>AUTHORITY</span>
          <h2>Qualification before action</h2>
          <p>Confidence can propose. Only evidence, policy and accountable authority can permit.</p>
        </article>
        <article>
          <span>RETURN</span>
          <h2>Receipts after execution</h2>
          <p>
            Execution is incomplete until its outcome can be searched, reproduced and challenged.
          </p>
        </article>
      </section>
    </div>
  );
}

const products = [
  {
    key: "ORG",
    name: "Orgize",
    role: "Evidence substrate",
    detail: "Structured human records, contracts and durable provenance.",
    href: "https://github.com/tao3k/orgize",
    tone: "paper",
  },
  {
    key: "ASP",
    name: "Agent Semantic Protocols",
    role: "Semantic retrieval",
    detail: "Parser-owned knowledge and code search for evidence-bearing agents.",
    href: "https://github.com/tao3k/agent-semantic-protocols",
    tone: "violet",
  },
  {
    key: "POO",
    name: "POO Flow",
    role: "Governed composition",
    detail: "Scheme-native cases, profiles and composable operational workflows.",
    href: "https://github.com/tao3k/poo-flow",
    tone: "coral",
  },
  {
    key: "MRL",
    name: "Marlin",
    role: "Agent runtime",
    detail: "The execution core for coding agents, PR agents and long-lived operations.",
    href: "https://github.com/tao3k/marlin-agent-core",
    tone: "green",
  },
  {
    key: "GPH",
    name: "Graph & Science",
    role: "Ontology + compute",
    detail: "Graph-theoretic algorithms, Julia science and formal qualification surfaces.",
    href: "https://github.com/tao3k",
    tone: "blue",
  },
] as const;

function ProductsPage() {
  return (
    <div className="tao3k-products-page">
      <section className="tao3k-products-hero">
        <p className="tao3k-route-kicker">OPEN-SOURCE ECOSYSTEM</p>
        <h1>
          Independent engines.
          <br />
          <em>One evidence contract.</em>
        </h1>
        <p>
          No monolith owns the system. Each project has a narrow responsibility and a testable
          boundary.
        </p>
      </section>

      <section className="tao3k-product-constellation" aria-label="TAO Three K product ecosystem">
        <div className="tao3k-product-axis" aria-hidden="true">
          <span>EVIDENCE</span>
          <i />
          <span>ACTION</span>
        </div>
        {products.map((product, index) => (
          <a
            className={`tao3k-product-unit tao3k-product-unit--${product.tone}`}
            href={product.href}
            key={product.key}
          >
            <span className="tao3k-product-unit__index">0{index + 1}</span>
            <span className="tao3k-product-unit__key">{product.key}</span>
            <div>
              <small>{product.role}</small>
              <h2>{product.name}</h2>
              <p>{product.detail}</p>
            </div>
            <strong aria-hidden="true">↗</strong>
          </a>
        ))}
      </section>

      <aside className="tao3k-products-rule">
        <span>ECOSYSTEM RULE</span>
        <p>
          A product may accelerate a transition. It may not erase the evidence boundary that makes
          that transition trustworthy.
        </p>
      </aside>
    </div>
  );
}

const solutionStages = [
  "Question",
  "Claim",
  "Model",
  "Qualification",
  "Operation",
  "Receipt",
] as const;

function SolutionsPage() {
  return (
    <div className="tao3k-solutions">
      <section className="tao3k-solutions-hero">
        <div>
          <p className="tao3k-route-kicker">RESEARCH ↔ OPERATIONS</p>
          <h1>
            Close the distance.
            <br />
            Keep the evidence.
          </h1>
        </div>
        <p>
          tao3k creates a bidirectional continuum: research becomes deployable without losing
          provenance, and operations become new, qualified knowledge.
        </p>
      </section>

      <section className="tao3k-continuum-map">
        <div className="tao3k-continuum-map__side tao3k-continuum-map__side--research">
          <span>RESEARCH</span>
          <strong>Explore what may be true</strong>
        </div>
        <ol>
          {solutionStages.map((stage, index) => (
            <li key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
        <div className="tao3k-continuum-map__side tao3k-continuum-map__side--operations">
          <span>OPERATIONS</span>
          <strong>Prove what actually happened</strong>
        </div>
        <div className="tao3k-continuum-map__return">
          Operational evidence returns upstream <span>←</span>
        </div>
      </section>

      <section className="tao3k-solution-lenses">
        <article>
          <span>ACADEMIC → INDUSTRIAL</span>
          <h2>Reproducible transfer</h2>
          <p>
            Models, assumptions, data lineage and qualification travel with the result—not in a
            separate administrative trail.
          </p>
        </article>
        <article>
          <span>HUMAN → AI</span>
          <h2>Governed delegation</h2>
          <p>
            People delegate bounded work while retaining the right to inspect, contest and stop
            high-risk action.
          </p>
        </article>
        <article>
          <span>OPERATION → TRAINING</span>
          <h2>Quality data production</h2>
          <p>
            Receipts become trustworthy learning material instead of an uncurated exhaust stream.
          </p>
        </article>
      </section>
    </div>
  );
}

const comparisonRows = [
  [
    "Primary unit",
    "Prompt and response",
    "Workflow task",
    "Model experiment",
    "Evidence-bearing transition",
  ],
  [
    "Source provenance",
    "Usually external",
    "Attached by convention",
    "Dataset-centric",
    "Native and continuous",
  ],
  [
    "Action authority",
    "Model confidence",
    "Process permission",
    "Research approval",
    "Explicit qualification",
  ],
  [
    "Cross-tool handoff",
    "Context copied",
    "Payload forwarded",
    "Artifact exported",
    "Evidence survives",
  ],
  ["Human role", "Reviewer after output", "Task owner", "Research operator", "Sovereign authority"],
  [
    "Learning return",
    "Conversation logs",
    "Execution logs",
    "Evaluation metrics",
    "Qualified receipts",
  ],
] as const;

function ComparisonPage() {
  return (
    <div className="tao3k-comparison-page">
      <section className="tao3k-comparison-hero">
        <div className="tao3k-comparison-hero__number">04</div>
        <div>
          <p className="tao3k-route-kicker">ARCHITECTURAL COMPARISON</p>
          <h1>
            Compare the handoff,
            <br />
            not the feature list.
          </h1>
        </div>
        <p>
          A capability is not trustworthy because it exists. The test is whether provenance,
          authority and accountability survive when work crosses a boundary.
        </p>
      </section>

      <section className="tao3k-comparison-table-wrap" aria-label="Architecture comparison">
        <table className="tao3k-comparison-table">
          <thead>
            <tr>
              <th>Evaluation surface</th>
              <th>AI assistant</th>
              <th>Workflow suite</th>
              <th>Science platform</th>
              <th>tao3k</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td className={index === 4 ? "is-tao3k" : undefined} key={cell}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="tao3k-comparison-verdict">
        <span>THE DIFFERENCE</span>
        <h2>Most systems optimize a moment. tao3k preserves the evidence lifecycle around it.</h2>
        <a href="https://github.com/tao3k">
          Inspect the open-source evidence <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}

function TrustKernelHero() {
  return (
    <section className="tao3k-trust-hero" aria-labelledby="trust-kernel-title">
      <TrustKernelScene />
      <div className="tao3k-trust-hero__copy">
        <p className="tao3k-route-kicker">tao3k / PRINCIPLES / POSITION</p>
        <h1 id="trust-kernel-title">Intelligence must earn the right to act.</h1>
        <p>
          Its value is not measured only by how much labor it removes, but by how much human
          capability it compounds. tao3k builds for people to understand, decide, create, and act
          with AI without surrendering evidence or authority.
        </p>
      </div>
      <div className="tao3k-trust-hero__telemetry" aria-label="Human capability commitments">
        <span>
          HUMAN CAPABILITY <b>COMPOUNDS</b>
        </span>
        <span>
          KNOWLEDGE <b>BECOMES AGENCY</b>
        </span>
        <span>
          AUTHORITY <b>REMAINS HUMAN</b>
        </span>
      </div>
    </section>
  );
}

function PrinciplesPage() {
  return (
    <div className="tao3k-principles-page">
      <TrustKernelHero />
      <PrinciplesFlow />
    </div>
  );
}

const roadmap = [
  {
    state: "STATE PENDING",
    title: "Evidence Foundations",
    systems: "Org · Orgize · Org Zhixing · ASP · Wendao",
    purpose: "Make records, contracts, source identity and projections durable and portable.",
    gap: "Rights and quality signals must remain portable across every projection boundary.",
    signal:
      "Evidence survives theme, runtime and organizational handoffs without losing provenance.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Graph and Scientific Intelligence",
    systems: "Evidence-Action Graph Engine · Julia · ScienceResearch",
    purpose: "Make knowledge, code and scientific relationships computable and inspectable.",
    gap: "Semantic relations and scientific claims still need shared qualification boundaries.",
    signal: "Knowledge, code and scientific models can be queried through one inspectable graph.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Qualification and Verification",
    systems: "Lean · Julia · ScienceResearch · POO Flow",
    purpose: "Qualify claims and authority without hiding judgment behind automation.",
    gap: "Formal checks must preserve human judgment and operational context.",
    signal: "Authority becomes machine-checkable without becoming opaque or absolute.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Next-Generation Agent Core",
    systems: "POO Flow composition · Marlin Agent Runtime",
    purpose:
      "Join typed composition with governed execution while preserving evidence and authority.",
    gap: "Composition, compression, execution and receipts need one governed operational boundary.",
    signal: "A composed case executes through Marlin while preserving evidence and authority.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Research-to-Operations Continuity",
    systems: "Project assignment pending",
    purpose: "Create a bidirectional path between research evidence and governed operation.",
    gap: "Bidirectional promotion and feedback are not yet one continuous enterprise path.",
    signal:
      "A research result can enter governed operation and return outcome evidence to research.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Technical Equity and Open Infrastructure",
    systems: "Project assignment pending",
    purpose:
      "Broaden the ability to inspect, learn, contribute and deploy without surrendering agency.",
    gap: "Access, education and contribution paths must become coherent across the ecosystem.",
    signal:
      "New participants can inspect, learn, contribute and deploy without surrendering agency.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
  {
    state: "STATE PENDING",
    title: "Evidence-Action Ecosystem",
    systems: "Cross-ecosystem outcome",
    purpose: "Close the lifecycle so every action returns searchable and contestable evidence.",
    gap: "The preceding fronts must interoperate before the lifecycle can close at ecosystem scale.",
    signal: "Every action returns searchable, contestable and improvable evidence.",
    docs: "Registry destination pending",
    reviewed: "2026-07-21",
  },
] as const;

function RoadmapPage() {
  return (
    <div className="tao3k-roadmap-page">
      <section className="tao3k-roadmap-maturity" aria-labelledby="roadmap-maturity-title">
        <header>
          <span>FOUR EVIDENCE STATES</span>
          <h2 id="roadmap-maturity-title">Dates do not move a frontier. Evidence does.</h2>
          <p>
            Every transition must be earned through a public evidence record. No front receives a
            maturity label merely because work has started or a date has been announced.
          </p>
        </header>
        <ol>
          <li>
            <span>01</span>
            <strong>Available Foundation</strong>
            <p>A reusable capability exists with current evidence.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Active Construction</strong>
            <p>Implementation and integration are underway.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Research Frontier</strong>
            <p>Investigation supports the direction, not an adoption promise.</p>
          </li>
          <li>
            <span>04</span>
            <strong>Long-term Horizon</strong>
            <p>The outcome depends on earlier evidence and is not scheduled delivery.</p>
          </li>
        </ol>
        <p className="tao3k-roadmap-maturity__notice">
          CURRENT PUBLIC RECEIPT · Front-level state assignments have not yet been published.
        </p>
      </section>

      <section className="tao3k-roadmap-lenses" aria-label="Roadmap stakeholder lenses">
        <article className="tao3k-roadmap-lens tao3k-roadmap-lens--enterprise">
          <span>ENTERPRISE READINESS</span>
          <h2>Adoption begins at an evidence boundary.</h2>
          <p>
            A front becomes evaluable only when its state, accountable owner, current evidence,
            known gap, exit criterion, project documentation and review date are public.
          </p>
          <div>
            <strong>Until then</strong>
            <p>Direction is visible, but production readiness is not implied.</p>
          </div>
        </article>
        <article className="tao3k-roadmap-lens tao3k-roadmap-lens--capital">
          <span>LONG-HORIZON VALUE</span>
          <h2>Each foundation increases the value of the next.</h2>
          <p>
            Evidence, graph intelligence, qualification, agent operation and open infrastructure
            compound as one system. Capital supports the dependency chain—not an isolated launch.
          </p>
          <div>
            <strong>What progress means</strong>
            <p>More durable capability, clearer gaps and stronger promotion receipts.</p>
          </div>
        </article>
      </section>

      <section className="tao3k-roadmap-outcome" aria-labelledby="roadmap-outcome-title">
        <span>CONDITIONAL ECOSYSTEM OUTCOME</span>
        <blockquote id="roadmap-outcome-title">
          Evidence qualifies action. Action returns evidence.
        </blockquote>
        <p>
          The lifecycle closes only when the preceding fronts interoperate. Until then, the outcome
          remains a horizon rather than a delivery claim.
        </p>
      </section>
      <section className="tao3k-roadmap-hero">
        <div>
          <p className="tao3k-route-kicker">DEPENDENCY-ORDERED ROADMAP</p>
          <h1>Build trust in the order it depends on.</h1>
        </div>
        <p>
          This is not a promise calendar. Each horizon advances only when the evidence boundary
          beneath it is real, inspectable and reusable.
        </p>
      </section>

      <section className="tao3k-roadmap-track">
        {roadmap.map((item, index) => (
          <article key={item.title} data-state={item.state}>
            <div className="tao3k-roadmap-track__rail">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </div>
            <div className="tao3k-roadmap-track__state">{item.state}</div>
            <div className="tao3k-roadmap-track__body">
              <h2>{item.title}</h2>
              <p>{item.purpose}</p>
              <dl className="tao3k-roadmap-track__evidence">
                <div>
                  <dt>RELATED SYSTEMS</dt>
                  <dd>{item.systems}</dd>
                </div>
                <div>
                  <dt>PUBLIC EVIDENCE</dt>
                  <dd>Front-level state assignment has not yet been published.</dd>
                </div>
                <div>
                  <dt>KNOWN GAP</dt>
                  <dd>{item.gap}</dd>
                </div>
              </dl>
            </div>
            <div className="tao3k-roadmap-track__signal">
              <span>EXIT SIGNAL</span>
              <p>{item.signal}</p>
              <footer>
                <span>{item.docs}</span>
                <time dateTime={item.reviewed}>Reviewed {item.reviewed}</time>
              </footer>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

const routePages: Readonly<Record<SiteRouteId, () => ReactNode>> = {
  platform: PlatformPage,
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

function ApplicationFooter() {
  return (
    <footer className="tao3k-application-footer">
      <div className="tao3k-application-footer__lead">
        <a href="/" className="tao3k-application-footer__brand">
          tao3k
        </a>
        <h2>
          Evidence qualifies action.
          <br />
          Action returns evidence.
        </h2>
        <p>Open-source infrastructure for a trustworthy path from knowledge to operation.</p>
      </div>
      <div className="tao3k-application-footer__links">
        <div>
          <strong>Explore</strong>
          <a href="/platform">Platform</a>
          <a href="/products">Products</a>
          <a href="/solutions">Solutions</a>
          <a href="/comparison">Comparison</a>
        </div>
        <div>
          <strong>Company</strong>
          <a href="/principles">Principles</a>
          <a href="/roadmap">Roadmap</a>
          <a href="https://github.com/tao3k/tao3k.site/issues/new">Contact us ↗</a>
          <a href="https://github.com/tao3k">Blog &amp; field notes ↗</a>
        </div>
        <div>
          <strong>Open source</strong>
          <a href="https://github.com/tao3k">GitHub ↗</a>
          <a href="https://github.com/tao3k/tao3k.site">Site source ↗</a>
          <a href="https://github.com/tao3k?tab=repositories">All projects ↗</a>
        </div>
      </div>
      <div className="tao3k-application-footer__base">
        <span>© tao3k</span>
        <span>Open Source First · Human Agency · Evidence Native</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function Tao3kApplicationHome({ shell: _shell }: { readonly shell: unknown }) {
  return <ApplicationFooter />;
}

export function Tao3kApplicationDocument(data: ApplicationPageData) {
  return (
    <div className="tao3k-application-shell">
      <SiteDocument {...data} />
      <ApplicationFooter />
    </div>
  );
}
