import "./roadmap-page.css";
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

export function RoadmapPage() {
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
