import { Link as RouterLink } from "@tanstack/react-router";

import { evidenceStages, threeKeys } from "../content/positioning";

const productGroups = [
  {
    key: "Know",
    responsibility: "Evidence and knowledge",
    products: [
      {
        name: "Wendao",
        role: "Knowledge, search, graph, and provenance",
        body: "Turns repositories, documents, models, and operating context into typed, traceable retrieval material.",
      },
      {
        name: "Agent Semantic Protocols",
        role: "Cross-language semantic contracts",
        body: "Keeps Rust, TypeScript, Python, Julia, and future providers aligned through schemas and replay evidence.",
      },
      {
        name: "Zhixing",
        role: "Living knowledge interface",
        body: "Projects Org-native identity, links, code, and operational history into inspectable human surfaces.",
      },
    ],
  },
  {
    key: "Govern",
    responsibility: "Workflow and authority",
    products: [
      {
        name: "Qianji",
        role: "Workflow, BPMN, checkpoints, and human tasks",
        body: "Makes workflow state, task identity, recovery, operator actions, and audit events explicit.",
      },
      {
        name: "POO Flow",
        role: "Policy, strategy, and proof obligations",
        body: "Determines whether an AI-generated strategy may start, which scope it inherits, and which evidence it owes.",
      },
    ],
  },
  {
    key: "Operate",
    responsibility: "Runtime and scientific compute",
    products: [
      {
        name: "Marlin",
        role: "Durable agent runtime substrate",
        body: "Owns typed execution, sandbox visibility, receipts, replay, and runtime recovery beneath product interfaces.",
      },
      {
        name: "Julia + Arrow",
        role: "Scientific compute and typed transport",
        body: "Runs numerical and analytical kernels through bounded profiles while Rust retains state and final mutation authority.",
      },
    ],
  },
] as const;

const authorityBoundaries = [
  {
    owner: "Rust host",
    owns: "state, lifecycle, authority, fallback, audit, and final mutation",
  },
  {
    owner: "Julia / Python",
    owns: "bounded scientific compute, scoring, optimization, and recommendations",
  },
  {
    owner: "Qianji / POO Flow",
    owns: "workflow progression, policy projection, human tasks, and proof obligations",
  },
  {
    owner: "Human operator",
    owns: "high-risk authorization, correction, rejection, and accountable judgment",
  },
] as const;

export function PlatformSurface() {
  return (
    <article className="tao-platform-page">
      <header className="tao-platform-hero">
        <div>
          <p className="tao-kicker">Platform / The Three Keys</p>
          <h1>The operating layer between research and reality.</h1>
        </div>
        <div>
          <p>
            tao3k is a research-to-operations platform. It connects computable knowledge, governed
            workflow, scientific compute, human authority, and durable runtime evidence without
            collapsing them into one hidden agent loop.
          </p>
          <RouterLink className="tao-action tao-action-primary" to="/solutions">
            See the reference solution
          </RouterLink>
        </div>
      </header>

      <section className="tao-platform-keys" aria-labelledby="platform-keys-title">
        <div className="tao-section-heading tao-section-heading-inline">
          <div>
            <p className="tao-kicker">Customer-facing system</p>
            <h2 id="platform-keys-title">Know. Govern. Operate.</h2>
          </div>
          <p>
            Internal repositories can remain specialized. The public product model stays stable
            around three responsibilities that every production system needs.
          </p>
        </div>
        <div className="tao-platform-key-grid">
          {threeKeys.map((item) => (
            <article key={item.id}>
              <span>{item.key}</span>
              <strong>{item.verb}</strong>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.product}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="tao-platform-products" aria-labelledby="platform-products-title">
        <div className="tao-section-heading">
          <p className="tao-kicker">Product surfaces</p>
          <h2 id="platform-products-title">
            Deep infrastructure, presented through a clear lifecycle.
          </h2>
        </div>
        <div className="tao-product-groups">
          {productGroups.map((group) => (
            <section key={group.key}>
              <header>
                <span>{group.key}</span>
                <strong>{group.responsibility}</strong>
              </header>
              <div>
                {group.products.map((product) => (
                  <article key={product.name}>
                    <h3>{product.name}</h3>
                    <span>{product.role}</span>
                    <p>{product.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="tao-platform-chain" aria-labelledby="platform-chain-title">
        <div className="tao-section-heading tao-section-heading-inline">
          <div>
            <p className="tao-kicker">Shared lifecycle</p>
            <h2 id="platform-chain-title">The products meet through evidence, not hidden state.</h2>
          </div>
          <p>
            Each stage emits an inspectable fact. The next system can accept it, reject it, request
            human authority, or replay the path without treating a chat transcript as the database.
          </p>
        </div>
        <ol>
          {evidenceStages.map((stage) => (
            <li key={stage.id}>
              <span>{stage.step}</span>
              <strong>{stage.label}</strong>
              <small>{stage.owner}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao-platform-boundaries" aria-labelledby="platform-boundaries-title">
        <div>
          <p className="tao-kicker">Authority architecture</p>
          <h2 id="platform-boundaries-title">Powerful compute. Non-transferable authority.</h2>
          <p>
            The platform is designed so that a model or compute service cannot silently inherit the
            right to mutate production state.
          </p>
        </div>
        <dl>
          {authorityBoundaries.map((boundary) => (
            <div key={boundary.owner}>
              <dt>{boundary.owner}</dt>
              <dd>{boundary.owns}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="tao-platform-footer">
        <p className="tao-kicker">From platform to proof</p>
        <h2>Start where research value and operational risk meet.</h2>
        <div>
          <RouterLink className="tao-action tao-action-primary" to="/solutions">
            Open the reference solution
          </RouterLink>
          <RouterLink className="tao-action tao-action-secondary" to="/research">
            Read the research surface
          </RouterLink>
        </div>
      </footer>
    </article>
  );
}
