import "./solutions-page.css";

const solutions = [
  [
    "knowledge-operations",
    "Knowledge and retrieval operations",
    "Turn distributed operational material into a retrievable, referenceable context without reducing it to an untraceable file dump.",
    "xiuxian-artisan-workshop / Wendao + Knowledge & Evidence + Data Plane",
  ],
  [
    "workflow-decision",
    "Workflow and decision control",
    "Connect process, BPMN control, decision context and human review so work is not split across opaque automations.",
    "xiuxian-artisan-workshop / Qianji + Control Plane",
  ],
  [
    "qualified-ai",
    "Qualified AI operations",
    "Bring AI-assisted work into explicit authority, policy, evidence and inspection boundaries rather than treating output as an automatic decision.",
    "Product system + Control Plane + Runtime evidence",
  ],
  [
    "deployment-scope",
    "Deployment across real operating scopes",
    "Carry a qualified change through the Delivery Plane into a declared local, on-premises, hybrid or cloud Deployment scope.",
    "Control Plane + Delivery Plane + Deployment",
  ],
] as const;

export function SolutionsPage() {
  return (
    <main className="tao3k-solutions">
      <header className="tao3k-solutions__hero">
        <p>SOLUTIONS / XIUXIAN-ARTISAN-WORKSHOP</p>
        <h1>Start with an operating problem, then make its system boundary explicit.</h1>
        <p>
          Each Solution combines the product system with exactly the Platform planes and Deployment
          scope that the outcome requires.
        </p>
      </header>

      <section aria-labelledby="solutions-list-title" className="tao3k-solutions__list">
        <header>
          <p>OPERATING OUTCOMES</p>
          <h2 id="solutions-list-title">Four ways to enter the system.</h2>
        </header>
        <div>
          {solutions.map(([id, title, detail, composition], index) => (
            <article id={id} key={title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <small>{composition}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
