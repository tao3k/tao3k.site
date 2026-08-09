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
    key: "GQL",
    name: "GQL Rust",
    role: "Reproducible graph query",
    detail: "Precise, composable queries over graph-shaped knowledge, code and evidence.",
    href: "https://github.com/tao3k/gql-rust",
    tone: "blue",
  },
  {
    key: "ASC",
    name: "Ascent",
    role: "Relational deduction",
    detail:
      "Declared rules derive inspectable relations, constraints and uncertainty from evidence.",
    href: "https://github.com/s-arash/ascent",
    tone: "amber",
  },
  {
    key: "SCI",
    name: "Scientific Qualification",
    role: "Graph, computation + proof",
    detail:
      "Julia computation, graph algorithms and Lean obligations qualify what may enter action.",
    href: "https://github.com/tao3k",
    tone: "blue",
  },
] as const;

const productionResponsibilities = [
  {
    signal: "KNOW",
    title: "Evidence and records",
    engines: "Orgize · Wendao",
    question: "What do we know, where did it come from, and who owns it?",
    outcome: "Durable context with provenance, source identity and human meaning attached.",
  },
  {
    signal: "ASK",
    title: "Semantic query",
    engines: "GQL Rust · Agent Semantic Protocols",
    question: "Which facts, code paths and relationships answer this question?",
    outcome: "Precise, composable retrieval over parser-owned and graph-shaped evidence.",
  },
  {
    signal: "REASON",
    title: "Deduction and calibration",
    engines: "Ascent · ontology · graph engines",
    question: "What follows from the evidence—and what remains uncertain?",
    outcome: "Asserted facts stay distinct from derived relations, constraints and uncertainty.",
  },
  {
    signal: "QUALIFY",
    title: "Scientific qualification",
    engines: "Julia · Lean · contracts · Cedar · POO Flow",
    question: "Is this claim or action admissible under the declared conditions?",
    outcome: "Numerical evidence, proof obligations, policy and human authority become explicit.",
  },
  {
    signal: "OPERATE",
    title: "Durable operation",
    engines: "POO Flow · Marlin",
    question: "Can qualified work continue, recover and remain accountable?",
    outcome: "Composable workflows meet a runtime with checkpoints, recovery and bounded effects.",
  },
  {
    signal: "RETURN",
    title: "Evidence return",
    engines: "Org Zhixing · evidence graph",
    question: "What happened, can it be checked, and what should the system learn?",
    outcome: "Results return as searchable, attributable, verifiable and reproducible receipts.",
  },
] as const;

const adoptionPath = [
  {
    title: "Begin at one consequential boundary",
    detail:
      "Choose a decision, handoff or operation where provenance and responsibility already matter.",
  },
  {
    title: "Connect evidence without replacing its owners",
    detail:
      "Keep records, code, knowledge, scientific models and policy under explicit authorities.",
  },
  {
    title: "Qualify one transition",
    detail: "Declare the evidence, conditions, risk and human authority required before action.",
  },
  {
    title: "Return an inspectable receipt",
    detail: "Measure the outcome, preserve failures and make the next decision better informed.",
  },
] as const;

const marketSignals = [
  {
    date: "MAY 2025",
    source: "HSG · xbench",
    title: "Capability scores are not real-world utility.",
    detail: "Profession-aligned, reproducible evaluation is becoming a deployment requirement.",
    href: "https://www.hsgcap.com/article/introducing-xbench-the-evergreen-benchmark-for-ai-agents/",
  },
  {
    date: "MAR 2026",
    source: "Lanchi Ventures · NVIDIA GTC",
    title: "Long-horizon work changes the architecture.",
    detail:
      "Partial execution, compounding errors and trajectory correction make reliability more valuable than raw intelligence.",
    href: "https://lanchiventures.com/live-from-nvidia-gtc-6-lanchi-ventures-portfolio-companies-take-the-stage-to-tackle-6-technical-challenges-in-ai-deployment/",
  },
  {
    date: "MAY 2026",
    source: "Vertex Ventures SEA",
    title: "The durable value is encoded context.",
    detail:
      "Enterprise systems become defensible when they preserve local entities, workflows, decision logic and institutional knowledge.",
    href: "https://www.vertexventures.sg/news/south-east-asia-has-never-produced-an-enterprise-software-giant-ai-might-change-that-/",
  },
] as const;

function ProductsPage() {
  return (
    <div className="tao3k-products-page">
      <section className="tao3k-products-hero">
        <p className="tao3k-route-kicker">REPRODUCIBLE INTELLIGENCE SYSTEMS</p>
        <h1>
          From a question
          <br />
          to an action
          <br />
          <em>you can defend.</em>
        </h1>
        <div className="tao3k-products-hero__copy">
          <strong>The scientific systems layer for intelligent organisations.</strong>
          <p>
            tao3k joins human records, semantic code and knowledge search, graph reasoning,
            scientific computation, qualification, workflow and durable execution without hiding how
            a conclusion became an authorised action.
          </p>
        </div>
      </section>

      <section className="tao3k-products-audiences" aria-label="Product value by audience">
        <article>
          <span>FOR PEOPLE</span>
          <h2>Understand before you delegate.</h2>
          <p>
            See the source, reasoning, limits and responsible authority behind consequential work.
          </p>
        </article>
        <article>
          <span>FOR ORGANISATIONS</span>
          <h2>Adopt intelligence without adopting a black box.</h2>
          <p>Introduce one governed boundary at a time while existing systems retain ownership.</p>
        </article>
        <article>
          <span>FOR LONG-HORIZON BUILDERS</span>
          <h2>Build assets that compound beyond a model cycle.</h2>
          <p>
            Evidence, policy, workflows and receipts become reusable organisational infrastructure.
          </p>
        </article>
      </section>

      <section className="tao3k-production-system" aria-labelledby="production-system-title">
        <header>
          <p className="tao3k-route-kicker">THE PRODUCTION RESPONSIBILITY CHAIN</p>
          <h2 id="production-system-title">
            The product is the system between model output and accountable work.
          </h2>
          <p>
            Strong models make proposals. Production systems must still preserve meaning, test
            conditions, grant authority, survive execution and return evidence.
          </p>
        </header>
        <ol>
          {productionResponsibilities.map((item, index) => (
            <li key={item.signal}>
              <span className="tao3k-production-system__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="tao3k-production-system__title">
                <small>{item.signal}</small>
                <h3>{item.title}</h3>
                <span>{item.engines}</span>
              </div>
              <blockquote>{item.question}</blockquote>
              <p>{item.outcome}</p>
            </li>
          ))}
        </ol>
        <aside>
          <strong>Search improves recall.</strong>
          <strong>Semantic calibration improves judgement.</strong>
          <span>Neither one grants action authority.</span>
        </aside>
      </section>

      <section className="tao3k-adoption-path" aria-labelledby="adoption-path-title">
        <header>
          <p className="tao3k-route-kicker">A PRACTICAL ADOPTION PATH</p>
          <h2 id="adoption-path-title">Start with one boundary—not a platform replacement.</h2>
          <p>
            The ecosystem is modular by design. An organisation can prove value at one handoff
            before expanding the evidence–action lifecycle.
          </p>
        </header>
        <ol>
          {adoptionPath.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-product-registry" aria-labelledby="product-registry-title">
        <header>
          <p className="tao3k-route-kicker">INDEPENDENT OPEN-SOURCE ENGINES</p>
          <h2 id="product-registry-title">
            Clear owners. Replaceable boundaries. Shared evidence.
          </h2>
          <p>
            Each project owns a narrow responsibility. The complete architecture is a direction;
            repository availability alone is not a claim that every integration has shipped.
          </p>
        </header>
        <div className="tao3k-product-constellation" aria-label="tao3k product ecosystem">
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
        </div>
      </section>

      <aside className="tao3k-products-rule">
        <span>ECOSYSTEM RULE</span>
        <p>
          A product may accelerate a transition. It may not erase the evidence boundary that makes
          that transition trustworthy.
        </p>
      </aside>

      <section className="tao3k-market-signals" aria-labelledby="market-signals-title">
        <header>
          <p className="tao3k-route-kicker">WHY THIS ARCHITECTURE IS CONVERGING NOW</p>
          <h2 id="market-signals-title">
            The market is moving from impressive answers to dependable work.
          </h2>
          <p>
            These are external market signals—not proof that tao3k has shipped the complete system.
            They show independent attention converging on evaluation, context and runtime
            reliability.
          </p>
        </header>
        <div>
          {marketSignals.map((signal) => (
            <a href={signal.href} key={signal.source}>
              <span>{signal.date}</span>
              <small>{signal.source}</small>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
              <strong>Read source ↗</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="tao3k-compounding-value" aria-labelledby="compounding-value-title">
        <div>
          <p className="tao3k-route-kicker">LONG-HORIZON VALUE</p>
          <h2 id="compounding-value-title">Models turn over. Organisational evidence compounds.</h2>
        </div>
        <dl>
          <div>
            <dt>Encoded knowledge</dt>
            <dd>
              Source identity, semantic relationships and institutional context survive a provider
              change.
            </dd>
          </div>
          <div>
            <dt>Reusable qualification</dt>
            <dd>
              Contracts, policy and proof obligations improve every later workflow that depends on
              them.
            </dd>
          </div>
          <div>
            <dt>Operational learning</dt>
            <dd>
              Receipts turn outcomes and failures into attributable material for evaluation and
              improvement.
            </dd>
          </div>
          <div>
            <dt>Open distribution</dt>
            <dd>
              Independent engines invite inspection, contribution and adoption without surrendering
              the whole stack.
            </dd>
          </div>
        </dl>
      </section>
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

const reasoningCircuit = [
  ["Question", "A decision, claim or operational ambiguity needs a defensible answer."],
  ["GQL query", "A precise query selects the relevant graph-shaped evidence without hiding scope."],
  ["Evidence", "Parser, knowledge and scientific owners retain provenance and source authority."],
  [
    "Ascent deduction",
    "Declared rules derive explicit relationships while preserving asserted versus derived facts.",
  ],
  ["Calibrate", "Uncertainty, constraints and applicability determine what can be claimed next."],
  [
    "Qualify",
    "Policy, proof obligations and human authority decide whether an action is admissible.",
  ],
  ["Receipt", "The outcome becomes attributable evidence for inspection, revision and reuse."],
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

      <section className="tao3k-reasoning-solution" aria-labelledby="reasoning-solution-title">
        <header>
          <p className="tao3k-route-kicker">PRODUCTION REASONING &amp; DECISION CALIBRATION</p>
          <h2 id="reasoning-solution-title">A good answer is not yet an admissible decision.</h2>
          <p>
            Production reasoning must expose what was asked, which evidence answered it, what was
            derived, what remains uncertain and who may authorise the next transition.
          </p>
        </header>
        <ol aria-label="Question-to-receipt reasoning circuit">
          {reasoningCircuit.map(([title, detail], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside>
          <strong>GQL improves the precision of the question.</strong>
          <strong>Ascent makes declared derivation inspectable.</strong>
          <p>Neither substitutes for evidence ownership, qualification or human authority.</p>
        </aside>
      </section>
    </div>
  );
}

const comparisonIncidents = [
  {
    date: "JUN 07 · 2026",
    source: "OPENAI / CODEX #26889",
    state: "OPEN DESIGN ISSUE",
    title: "Compaction can erase the context that gives a task continuity.",
    observed:
      "A cluster of reports asks for explicit thread-scoped context pins because long-running sessions can lose constraints, decisions and task state after compaction.",
    consequence:
      "The enterprise risk is not a shorter summary. It is resuming work without knowing which obligations survived.",
    href: "https://github.com/openai/codex/issues/26889",
  },
  {
    date: "JUN 15 · 2026",
    source: "ANTHROPIC / CLAUDE CODE #68619",
    state: "USER-REPORTED ISSUE",
    title: "Recursive delegation can burn budget while losing recoverable work.",
    observed:
      "The report describes permission denials cascading into nested subagents, retry storms and discarded intermediate results after interruption.",
    consequence:
      "Delegation without bounded topology, durable handoff and a typed stop condition turns scale into uncontrolled cost.",
    href: "https://github.com/anthropics/claude-code/issues/68619",
  },
  {
    date: "JUN 24 · 2026",
    source: "OPENAI / CODEX #29915",
    state: "OPEN BUG REPORT",
    title: "Displayed permission and effective permission can diverge.",
    observed:
      "The report shows thread start and resume paths where a selected permission profile may not match the live effective state.",
    consequence:
      "A UI choice is not an authority record. Production systems need provenance for the policy actually enforced at execution time.",
    href: "https://github.com/openai/codex/issues/29915",
  },
  {
    date: "JUL · 2026",
    source: "OPENAI / CODEX #27588",
    state: "OPEN BUG REPORT",
    title: "An agent can repeat preparation for hours without reaching work.",
    observed:
      "The report describes compaction-driven reread loops, no durable phase transition and ambiguity about whether the backend failed, continued or partially wrote files.",
    consequence:
      "Without explicit progress state and no-progress gates, time, spend and repository truth separate from the interface.",
    href: "https://github.com/openai/codex/issues/27588",
  },
  {
    date: "JUL 28–29 · 2026",
    source: "OPENAI / CODEX #35935",
    state: "USER-REPORTED REGRESSION",
    title: "Lossy continuation can repeat completed work and exhaust usage.",
    observed:
      "The report asks for durable checkpoints, completed-work retention, subagent result recovery and synchronization with actual repository state.",
    consequence:
      "A long-running task needs a recoverable execution receipt, not only a reconstructed conversation.",
    href: "https://github.com/openai/codex/issues/35935",
  },
] as const;

const enterprisePressure = [
  {
    date: "JUN 04 · 2026",
    source: "GITHUB AVAILABILITY REPORT",
    title: "A dependency release caused 36,800 Copilot review failures.",
    detail:
      "GitHub reported an 81.6% average failure rate during the incident and noted that affected jobs did not fail fast.",
    implication:
      "Runtime provenance, compatibility admission and typed failure are business controls.",
    href: "https://github.blog/news-insights/company-news/github-availability-report-june-2026/",
  },
  {
    date: "JUL 14 · 2026",
    source: "OPENAI · AI INVESTMENTS",
    title: "Token price is not the measure of useful work.",
    detail:
      "OpenAI argues for explicit stopping conditions, usage visibility, governed tools, approval paths and funding tied to maturity.",
    implication: "Cost, authority and outcome quality must be evaluated as one operational case.",
    href: "https://openai.com/index/managing-ai-investments-in-agentic-era/",
  },
  {
    date: "JUL 22 · 2026",
    source: "OPENAI PRESENCE",
    title: "Production begins with one job, bounded access and escalation.",
    detail:
      "The product description starts deployments from a specific workflow, required knowledge, policies, approved actions and human takeover rules.",
    implication: "The market is converging on governed action—not generic autonomous capability.",
    href: "https://openai.com/index/introducing-openai-presence/",
  },
] as const;

const comparisonRows = [
  [
    "Primary object",
    "Conversation and tool turn",
    "Task graph or checkpoint",
    "Managed agent deployment",
    "Versioned evidence case",
  ],
  [
    "Compression question",
    "What text should remain?",
    "What state must resume?",
    "What context and policy are reusable?",
    "Which evidence, authority and obligations remain valid?",
  ],
  [
    "Progress truth",
    "Agent transcript and UI status",
    "Node and workflow state",
    "Platform telemetry and evaluation",
    "Typed transition, checkpoint, effect and receipt",
  ],
  [
    "Authority truth",
    "Tool approval or sandbox policy",
    "Workflow permission and integration policy",
    "Identity, policy and administrative control",
    "Versioned Authority Envelope plus enforced runtime receipt",
  ],
  [
    "Evidence truth",
    "Context supplied to the model",
    "Payload attached to the process",
    "Curated enterprise context",
    "Source-owned claims, deductions, proof and invalidation state",
  ],
  [
    "Human position",
    "Operator or reviewer",
    "Process owner",
    "Administrator, approver and escalation owner",
    "Knowledge contributor, authority holder and contesting party",
  ],
] as const;

const tao3kIssueResponses = [
  {
    issue: "LOSSY COMPRESSION",
    invariant: "Compression is a projection of durable state—not the authority for state.",
    owners: "POO Flow organisation · Marlin checkpoints · Org evidence",
    maturity: "MIXED · INTEGRATION ACTIVE",
  },
  {
    issue: "RUNAWAY OR STALLED WORK",
    invariant:
      "Every run exposes phase, progress, retry budget, stop condition and recoverable output.",
    owners: "POO Flow conditions · Marlin runtime · Scenario Benchmarks",
    maturity: "ACTIVE DEVELOPMENT",
  },
  {
    issue: "AUTHORITY DRIFT",
    invariant:
      "The effective permission must be versioned, scoped and receipted at the action boundary.",
    owners: "Contracts · Authority Envelope · Cedar · Lean · Marlin",
    maturity: "ARCHITECTURE ACCEPTED · INTEGRATION ACTIVE",
  },
  {
    issue: "CONTEXT WITHOUT PROVENANCE",
    invariant:
      "Models consume evidence projections while source systems retain semantic ownership.",
    owners: "Orgize · Wendao · ASP · GQL Rust · Ascent",
    maturity: "INDEPENDENT ENGINES · CIRCUIT INTEGRATION ACTIVE",
  },
  {
    issue: "LOGS WITHOUT LEARNING",
    invariant:
      "An outcome becomes reusable only after verification, attribution and rights checks.",
    owners: "Org Zhixing · Julia · Lean · evidence graph",
    maturity: "MIXED · LONG-TERM LIFECYCLE",
  },
] as const;

function ComparisonPage() {
  return (
    <div className="tao3k-comparison-page">
      <section className="tao3k-comparison-hero">
        <p className="tao3k-route-kicker">REAL FAILURES · NOT CHECKLISTS</p>
        <h1>
          The model did not
          <br />
          lose the work.
          <br />
          <em>The system did.</em>
        </h1>
        <div>
          <strong>Comparison begins where production confidence breaks.</strong>
          <p>
            Context compacts. Permissions drift. Agents loop. Dependencies fail. Intermediate work
            disappears. The useful comparison is which system responsibility was missing—and who can
            prove it was restored.
          </p>
        </div>
      </section>

      <section className="tao3k-issue-ledger" aria-labelledby="issue-ledger-title">
        <header>
          <p className="tao3k-route-kicker">PUBLIC ISSUE LEDGER</p>
          <h2 id="issue-ledger-title">
            The community is already describing the missing primitives.
          </h2>
          <p>
            These are user-reported or open issue records, not vendor-confirmed product-wide
            verdicts. Their value is the repeated architectural pattern they expose.
          </p>
        </header>
        <ol>
          {comparisonIncidents.map((incident, index) => (
            <li key={incident.source}>
              <div className="tao3k-issue-ledger__rail">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>
              <div className="tao3k-issue-ledger__source">
                <time>{incident.date}</time>
                <strong>{incident.source}</strong>
                <small>{incident.state}</small>
              </div>
              <div className="tao3k-issue-ledger__body">
                <h3>{incident.title}</h3>
                <p>{incident.observed}</p>
              </div>
              <div className="tao3k-issue-ledger__consequence">
                <span>ENTERPRISE CONSEQUENCE</span>
                <p>{incident.consequence}</p>
                <a href={incident.href}>Inspect issue ↗</a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-enterprise-pressure" aria-labelledby="enterprise-pressure-title">
        <header>
          <p className="tao3k-route-kicker">THE BUYER'S QUESTION HAS CHANGED</p>
          <h2 id="enterprise-pressure-title">
            Can the work remain reliable, governed and worth its cost?
          </h2>
          <p>
            Post-May 2026 primary sources increasingly describe deployment as a systems problem:
            bounded workflows, compatibility, stopping conditions, policy and measurable outcomes.
          </p>
        </header>
        <div>
          {enterprisePressure.map((signal) => (
            <a href={signal.href} key={signal.source}>
              <time>{signal.date}</time>
              <small>{signal.source}</small>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
              <strong>{signal.implication}</strong>
              <span>Read primary source ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="tao3k-comparison-matrix" aria-labelledby="comparison-matrix-title">
        <header>
          <p className="tao3k-route-kicker">COMPARE THE MANAGED OBJECT</p>
          <h2 id="comparison-matrix-title">
            Products can share features while owning different truths.
          </h2>
          <p>
            This matrix describes primary responsibility, not universal absence. Integrations can
            extend every category; the question is which truth remains native and accountable.
          </p>
        </header>
        <div className="tao3k-comparison-table-wrap" aria-label="Responsibility comparison">
          <table className="tao3k-comparison-table">
            <thead>
              <tr>
                <th>Responsibility surface</th>
                <th>Coding / general agent</th>
                <th>Agent workflow</th>
                <th>Enterprise agent suite</th>
                <th>tao3k target</th>
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
        </div>
      </section>

      <section className="tao3k-issue-response" aria-labelledby="issue-response-title">
        <header>
          <p className="tao3k-route-kicker">WHY TAO3K CAN ADDRESS THE ROOT</p>
          <h2 id="issue-response-title">Give each failure a system owner—not another prompt.</h2>
          <p>
            tao3k does not claim that every cross-engine path is shipped. It defines independent
            owners so the failure can be tested, repaired and promoted without hiding behind model
            behavior.
          </p>
        </header>
        <ol>
          {tao3kIssueResponses.map((response) => (
            <li key={response.issue}>
              <span>{response.issue}</span>
              <h3>{response.invariant}</h3>
              <p>{response.owners}</p>
              <small>{response.maturity}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao3k-comparison-verdict">
        <span>THE HONEST DIFFERENCE</span>
        <h2>
          A larger context window postpones compression. A durable evidence case changes what can be
          lost.
        </h2>
        <p>
          Most current tools are stronger at their native interaction, orchestration or enterprise
          administration surface. tao3k's differentiation is the accepted architecture joining
          source evidence, scientific qualification, authority, execution and return. Its public
          maturity must continue to be proven one owner and one integration at a time.
        </p>
        <a href="https://github.com/tao3k">
          Inspect the open-source work <span aria-hidden="true">↗</span>
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
