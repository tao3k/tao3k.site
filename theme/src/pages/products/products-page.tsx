import "./products-page.css";
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

export function ProductsPage() {
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
    </div>
  );
}
