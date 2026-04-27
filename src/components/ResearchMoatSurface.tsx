import type { ResearchMoat } from "../content/site";

type ResearchMoatSurfaceProps = {
  readonly moats: readonly ResearchMoat[];
};

export function ResearchMoatSurface({ moats }: ResearchMoatSurfaceProps) {
  return (
    <section className="research-surface" aria-labelledby="research-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">technical moat map</p>
        <h2 id="research-surface-title">Why this is infrastructure, not a wrapper.</h2>
      </div>
      <div className="moat-grid">
        {moats.map((moat) => (
          <article className="moat-card" key={moat.id}>
            <div>
              <span>{moat.label}</span>
              <h3>{moat.claim}</h3>
            </div>
            <p>{moat.evidence}</p>
            <div className="moat-stack">
              {moat.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="moat-comparison" aria-label="Infrastructure comparison">
        <div>
          <span>Prompt wrapper</span>
          <strong>conversation surface</strong>
        </div>
        <div>
          <span>Document vault</span>
          <strong>passive knowledge store</strong>
        </div>
        <div>
          <span>Xiuxian</span>
          <strong>knowledge + workflow + compute + proof</strong>
        </div>
      </div>
    </section>
  );
}
