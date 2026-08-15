import "./platform-page.css";

const platformPlanes = [
  [
    "knowledge-evidence",
    "KNOWLEDGE & EVIDENCE",
    "Org-derived records, stable references, Contracts, provenance and inspectable source context.",
  ],
  [
    "data-plane",
    "DATA PLANE",
    "Apache Arrow and Arrow Flight boundaries for moving structured data across language, process and product surfaces.",
  ],
  [
    "control-plane",
    "CONTROL PLANE",
    "Authority, policy, SDD, BDD, qualification, benchmarks and change-specific Delivery plans before consequential action.",
  ],
  [
    "delivery-plane",
    "DELIVERY PLANE",
    "Reproducible builds, artifacts, promotion, atomic rollout, rollback and delivery receipts for qualified changes.",
  ],
  [
    "deployments",
    "DEPLOYMENTS",
    "Machine, environment, topology, configuration, access boundary and runtime ownership for operating systems in reality.",
  ],
] as const;

export function PlatformPage() {
  return (
    <main className="tao3k-platform">
      <header className="tao3k-platform__hero">
        <p>PLATFORM / SHARED PLANES</p>
        <h1>Make a system legible before, during and after it acts.</h1>
        <p>
          Tao3k Platform supplies the planes a Product or Solution inherits. They are shared
          operating boundaries, not a second product catalogue.
        </p>
      </header>

      <section aria-labelledby="platform-planes-title" className="tao3k-platform__surfaces">
        <header>
          <p>OPERATING MODEL</p>
          <h2 id="platform-planes-title">Five planes, one accountable system.</h2>
        </header>
        <ol>
          {platformPlanes.map(([id, label, detail], index) => (
            <li id={id} key={label}>
              <span aria-hidden="true">0{index + 1}</span>
              <p>{label}</p>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="platform-boundary-title" className="tao3k-platform__boundary">
        <p>HOW IT RELATES TO PRODUCTS</p>
        <h2 id="platform-boundary-title">
          A Product uses the planes. A Solution composes them around an operating outcome.
        </h2>
        <div>
          <article>
            <h3>Product</h3>
            <p>
              A deployable system such as xiuxian-artisan-workshop, with a coherent customer-facing
              operating boundary.
            </p>
          </article>
          <article>
            <h3>Solution</h3>
            <p>
              A composition of Product, selected Platform planes and a target Deployment scope for a
              concrete customer need.
            </p>
          </article>
          <article>
            <h3>Evidence</h3>
            <p>
              Every customer-facing claim returns to an owner repository, Contract, benchmark,
              delivery receipt or runtime record.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
