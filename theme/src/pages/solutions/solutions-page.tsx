import "./solutions-page.css";
const systemResponsibilities = [
  {
    id: "evidence",
    label: "Evidence foundation",
    detail:
      "Keep source identity, semantic structure, provenance and applicability attached to knowledge, code, models and records.",
    owners: "Orgize · ASP · Wendao · GQL · Ascent",
  },
  {
    id: "qualification",
    label: "Qualification plane",
    detail:
      "Make contracts, policy, uncertainty, authority and prohibited uses explicit before a consequential transition.",
    owners: "Contracts · Cedar · Julia · Lean",
  },
  {
    id: "composition",
    label: "Composable operations",
    detail:
      "Express roles, conditions, profiles and scenarios without forcing every customer into one workflow product.",
    owners: "POO Flow · profiles · scenario composition",
  },
  {
    id: "execution",
    label: "Durable execution",
    detail:
      "Preserve checkpoint state, recovery, bounded effects and attributable receipts across long-running work.",
    owners: "Marlin · checkpoints · recovery · receipts",
  },
] as const;

const industryAdaptations = [
  {
    id: "life-sciences",
    index: "01",
    kind: "LIFE SCIENCES",
    title: "Evidence must survive scientific and research handoffs.",
    question:
      "A vertical product brings its own therapeutic, diagnostic or laboratory workflow. tao3k supplies the evidence and qualification system beneath it.",
    reality:
      "Research systems need typed relationships, evidence anchors, fresh projections, privacy boundaries and accountable promotion before information can influence consequential work.",
    requirements: [
      "Typed objects, declared relations and valid domain/range.",
      "Addressable evidence, source identity, freshness and privacy scope.",
      "A named scientific authority to promote a candidate for its defined use.",
    ],
    scenarios:
      "Literature and assay intake · Evidence review · Research decision packet · Evidence return",
    boundary:
      "Clinical or therapeutic products remain partner and customer applications. tao3k does not diagnose, recommend treatment or make a regulatory determination.",
    note: "This adaptation is governed by the Life Sciences System Requirements contract, not a claim that tao3k sells a healthcare SaaS product.",
  },
  {
    id: "regulated-operations",
    index: "02",
    kind: "REGULATED OPERATIONS",
    title: "An AI action needs an authority and recovery boundary.",
    question:
      "A vertical enterprise product owns its user experience and business process. tao3k supplies the evidence, qualification and durable-state system around it.",
    reality:
      "Where obligations, access, safety or financial consequences matter, the missing capability is not a stronger model—it is a system that can qualify, pause, recover and explain an action.",
    requirements: [
      "Source-owned context that can be inspected and repeated.",
      "An explicit allow, deny, defer or escalation boundary before consequential effects.",
      "Serialized, fail-fast or typed-recovery lifecycle ownership.",
      "Branch isolation, exactly-once resume ordering and a human authority boundary.",
    ],
    scenarios:
      "Source-grounded investigation · Bounded operational handoff · Interrupted work recovery · Human escalation",
    boundary:
      "No component turns model confidence into authority. A person can inspect, contest, pause, revoke or assume responsibility at the defined boundary.",
    note: "This adaptation is governed by the Enterprise AI System Requirements contract, not a claim that tao3k replaces an enterprise function.",
  },
  {
    id: "scientific-industrial",
    index: "03",
    kind: "SCIENTIFIC & INDUSTRIAL SYSTEMS",
    title: "Research and operations should share a continuous record.",
    question:
      "A partner may build the laboratory, plant, simulation or decision interface. tao3k keeps assumptions, qualifications and operational outcomes connected across the handoff.",
    reality:
      "Models, experiments and operational systems often lose semantic meaning, applicability limits and evidence when they cross organisational or technical boundaries.",
    requirements: [
      "Versioned assumptions, source evidence and reproducible computational context.",
      "Explicit permitted use, prohibited use and invalidation conditions.",
      "Operational outcomes and failures returned as structured evidence for revision.",
    ],
    scenarios:
      "Research claim · Qualified artifact · Governed deployment · Operational evidence · Research revision",
    boundary:
      "tao3k preserves the system of record around deployment. It does not claim ownership of a customer's scientific model, industrial control system or final operational judgement.",
    note: "This adaptation follows the Research–Operations Continuum: faster transfer without evidence continuity is not success.",
  },
] as const;

export function SolutionsPage() {
  return (
    <div className="tao3k-solutions">
      <section className="tao3k-solutions-hero">
        <div>
          <p className="tao3k-route-kicker">INDUSTRY SYSTEMS / INFRASTRUCTURE, NOT VERTICAL SAAS</p>
          <h1>
            Build vertical AI
            <br />
            without rebuilding its system.
          </h1>
        </div>
        <p>
          tao3k provides the evidence, qualification, composition and durable execution layer around
          a vertical product. Customers and partners keep their domain expertise, interface and
          workflow; people keep authority over consequential work.
        </p>
      </section>

      <section className="tao3k-solution-system" aria-labelledby="solution-system-title">
        <header>
          <p className="tao3k-route-kicker">THE SHARED SYSTEM LAYER</p>
          <h2 id="solution-system-title">
            Different industries. The same system responsibilities.
          </h2>
          <p>
            Models, clouds and coding Agents remain useful capability layers. tao3k supplies what
            must persist when a vertical system changes provider, interface or scenario.
          </p>
        </header>
        <ol>
          {systemResponsibilities.map((responsibility, index) => (
            <li key={responsibility.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{responsibility.label}</h3>
                <p>{responsibility.detail}</p>
              </div>
              <small>{responsibility.owners}</small>
            </li>
          ))}
        </ol>
      </section>

      <nav className="tao3k-solution-index" aria-label="Industry system adaptations">
        {industryAdaptations.map((solution) => (
          <a href={`#${solution.id}`} key={solution.id}>
            <span>{solution.index}</span>
            <strong>{solution.kind}</strong>
            <i aria-hidden="true">↓</i>
          </a>
        ))}
      </nav>

      {industryAdaptations.map((solution) => (
        <section
          className={`tao3k-solution-case tao3k-solution-case--${solution.id}`}
          id={solution.id}
          key={solution.id}
        >
          <header>
            <p className="tao3k-route-kicker">
              {solution.index} / {solution.kind}
            </p>
            <h2>{solution.title}</h2>
            <p className="tao3k-solution-case__question">{solution.question}</p>
          </header>
          <div className="tao3k-solution-case__reality">
            <span>INDUSTRY REQUIREMENT</span>
            <p>{solution.reality}</p>
          </div>
          <div className="tao3k-solution-case__requirements">
            <span>WHAT TAO3K PROVIDES</span>
            <ul>
              {solution.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>
          <aside>
            <div>
              <span>COMPOSABLE PARTNER SCENARIOS</span>
              <p>{solution.scenarios}</p>
            </div>
            <div>
              <span>HUMAN BOUNDARY</span>
              <p>{solution.boundary}</p>
            </div>
            <p className="tao3k-solution-case__note">{solution.note}</p>
          </aside>
        </section>
      ))}
    </div>
  );
}
