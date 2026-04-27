import type { OpenSourceLane, ValidationGate } from "../content/site";

type OpenSourceSurfaceProps = {
  readonly lanes: readonly OpenSourceLane[];
  readonly gates: readonly ValidationGate[];
};

export function OpenSourceSurface({ lanes, gates }: OpenSourceSurfaceProps) {
  return (
    <section className="open-source-surface" aria-labelledby="open-source-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">developer map</p>
        <h2 id="open-source-surface-title">A repo with explicit capability ownership.</h2>
      </div>
      <div className="repo-map">
        {lanes.map((lane) => (
          <article className="repo-lane" key={lane.id}>
            <div>
              <span>{lane.ownership}</span>
              <h3>{lane.label}</h3>
            </div>
            <p>{lane.surface}</p>
            <div className="entrypoint-list">
              {lane.entrypoints.map((entrypoint) => (
                <code key={entrypoint}>{entrypoint}</code>
              ))}
            </div>
            <strong>{lane.proof}</strong>
          </article>
        ))}
      </div>
      <div className="gate-rail" aria-label="Validation gates">
        {gates.map((gate) => (
          <article className="gate-card" key={gate.label}>
            <span>{gate.label}</span>
            <code>{gate.command}</code>
            <p>{gate.purpose}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
