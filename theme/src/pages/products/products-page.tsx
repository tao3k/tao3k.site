import { useState } from "react";

import "./products-page.css";

type ProductView = {
  id: "system" | "evidence" | "delivery";
  label: string;
  title: string;
  detail: string;
};

const productViews: readonly ProductView[] = [
  {
    id: "system",
    label: "System",
    title: "Knowledge and control in one deployable system.",
    detail:
      "Wendao provides knowledge and retrieval; Qianji provides workflow, Flowhub and BPMN control; Qianhuan renders context and persona; Zhenfa supplies native tool and routing substrate. The product boundary is the combination, not a generic Workshop label.",
  },
  {
    id: "evidence",
    label: "Evidence",
    title: "Performance and quality are release gates, not slogans.",
    detail:
      "The repository carries p95 and average latency gates, a fixed retrieval query matrix evaluated at Top1, Top3 and Top10, and multi-run rollout sign-off. Current quantitative claims belong only where their benchmark receipt is selected.",
  },
  {
    id: "delivery",
    label: "Delivery context",
    title: "A product release enters an explicit operating scope.",
    detail:
      "The product page does not make an independent deployment promise. It references Tao3k's Control Plane, Delivery Plane and target Deployment scope, where Contract, specification, behavioural scenarios, qualified artifacts and runtime receipts are owned.",
  },
];

const foundations = [
  {
    name: "orgize",
    plane: "Knowledge & evidence",
    href: "https://github.com/tao3k/orgize",
    detail:
      "Rust parsing and non-mutating source-backed projections for Org records, links, blocks and publishing graphs.",
  },
  {
    name: "poo-flow",
    plane: "Control Plane",
    href: "https://github.com/tao3k/poo-flow",
    detail:
      "Gerbil Scheme composition for inspectable policies, profiles, modules, workflows and strategy projections.",
  },
  {
    name: "marlin-agent-core",
    plane: "Runtime substrate",
    href: "https://github.com/tao3k/marlin-agent-core",
    detail:
      "Typed Org-native agent-runtime substrate for graph loops, sandbox visibility, receipts and replay—not a terminal-user product shell.",
  },
  {
    name: "agent-semantic-protocols",
    plane: "Semantic infrastructure",
    href: "https://github.com/tao3k/agent-semantic-protocols",
    detail:
      "Shared protocol contracts, Hook runtime, parser-oriented semantic harnesses and replay sandtables.",
  },
] as const;

export function ProductsPage() {
  const [selectedId, setSelectedId] = useState<ProductView["id"]>("system");
  const selected = productViews.find((view) => view.id === selectedId) ?? productViews[0];

  return (
    <main className="tao3k-products">
      <header className="tao3k-products__hero">
        <p>PRODUCTS / DEPLOYABLE SYSTEMS</p>
        <h1>One operating system, supported by open foundations.</h1>
        <p>
          Products are customer-evaluable systems. Foundations remain visible, with their real
          repository names and their correct technical role.
        </p>
      </header>

      <section
        aria-labelledby="featured-product-title"
        className="tao3k-products__featured"
        id="xiuxian-artisan-workshop"
      >
        <header>
          <p>CURRENT PRODUCT SYSTEM</p>
          <h2 id="featured-product-title">xiuxian-artisan-workshop</h2>
          <a
            href="https://github.com/tao3k/xiuxian-artisan-workshop"
            rel="noreferrer"
            target="_blank"
          >
            Open GitHub repository ↗
          </a>
        </header>

        <div className="tao3k-products__product-browser">
          <nav aria-label="xiuxian-artisan-workshop overview" className="tao3k-products__tabs">
            {productViews.map((view) => {
              const active = view.id === selected.id;
              return (
                <button
                  aria-controls="featured-product-detail"
                  aria-selected={active}
                  className={active ? "is-active" : undefined}
                  key={view.id}
                  onClick={() => setSelectedId(view.id)}
                  role="tab"
                  type="button"
                >
                  {view.label}
                </button>
              );
            })}
          </nav>
          <article
            aria-live="polite"
            className="tao3k-products__product-detail"
            id="featured-product-detail"
            role="tabpanel"
          >
            <p>{selected.label}</p>
            <h3>{selected.title}</h3>
            <p>{selected.detail}</p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="foundation-title"
        className="tao3k-products__foundations"
        id="open-foundations"
      >
        <header>
          <p>OPEN FOUNDATIONS</p>
          <h2 id="foundation-title">The source systems behind the product boundary.</h2>
        </header>
        <div>
          {foundations.map((foundation) => (
            <article key={foundation.name}>
              <p>{foundation.plane}</p>
              <h3>
                <a href={foundation.href} rel="noreferrer" target="_blank">
                  {foundation.name} ↗
                </a>
              </h3>
              <p>{foundation.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
