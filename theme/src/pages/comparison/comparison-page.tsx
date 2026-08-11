import "./comparison-page.css";
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

export function ComparisonPage() {
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
