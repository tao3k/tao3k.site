import type { EnterpriseValue } from "../content/site";

type EnterpriseValueSurfaceProps = {
  readonly values: readonly EnterpriseValue[];
};

export function EnterpriseValueSurface({ values }: EnterpriseValueSurfaceProps) {
  return (
    <section className="enterprise-surface" aria-labelledby="enterprise-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">customer value chain</p>
        <h2 id="enterprise-surface-title">From agent experiment to governed operating layer.</h2>
      </div>
      <div className="value-chain">
        {values.map((value, index) => (
          <article className="value-card" key={value.id}>
            <span className="value-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{value.label}</h3>
            <dl>
              <div>
                <dt>Before</dt>
                <dd>{value.before}</dd>
              </div>
              <div>
                <dt>After</dt>
                <dd>{value.after}</dd>
              </div>
            </dl>
            <p>{value.proof}</p>
            <strong>{value.buyerSignal}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
