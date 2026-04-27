import type { DeploymentMode } from "../content/site";

type DeploymentSurfaceProps = {
  readonly modes: readonly DeploymentMode[];
};

export function DeploymentSurface({ modes }: DeploymentSurfaceProps) {
  return (
    <section className="deployment-surface" aria-labelledby="deployment-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">AI infra deployment matrix</p>
        <h2 id="deployment-surface-title">Choose where knowledge, workflow, and models live.</h2>
      </div>
      <div className="deployment-grid">
        {modes.map((mode) => (
          <article className="deployment-card" key={mode.id}>
            <div>
              <span className="deployment-label">{mode.label}</span>
              <small>{mode.posture}</small>
            </div>
            <p>{mode.summary}</p>
            <div className="deployment-columns">
              <div>
                <h3>Infrastructure</h3>
                <ul>
                  {mode.infrastructure.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Model plane</h3>
                <ul>
                  {mode.modelPlane.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <strong>{mode.proof}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
