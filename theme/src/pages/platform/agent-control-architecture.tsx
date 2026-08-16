import { useEffect, useState } from "react";

import "./agent-control-architecture.css";

type ArchitectureLayer = "poo" | "cedar" | "lean";

const layers: Array<{
  id: ArchitectureLayer;
  label: string;
  status: string;
}> = [
  {
    id: "poo",
    label: "POO control plane",
    status: "Compose the Agent system and derive controls from one policy source.",
  },
  {
    id: "cedar",
    label: "Cedar effect gate",
    status: "Authorize one concrete principal, action, resource and context.",
  },
  {
    id: "lean",
    label: "Lean proof lane",
    status: "Verify lifecycle, delegation, trace and receipt invariants.",
  },
];

export function AgentControlArchitecture() {
  const [activeLayer, setActiveLayer] = useState<ArchitectureLayer>("poo");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveLayer((current) => {
        const index = layers.findIndex(({ id }) => id === current);
        return layers[(index + 1) % layers.length].id;
      });
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const active = layers.find(({ id }) => id === activeLayer) ?? layers[0];

  return (
    <section
      aria-labelledby="agent-control-architecture-title"
      className="tao3k-agent-control"
      data-active-layer={activeLayer}
    >
      <header className="tao3k-agent-control__header">
        <p>AGENT CONTROL ARCHITECTURE</p>
        <h2 id="agent-control-architecture-title">
          Compose globally. Authorize locally. Prove across the lifecycle.
        </h2>
        <span>
          POO Flow and Cedar form the dual engine. Lean supplies an independent proof path over the
          composed system.
        </span>
      </header>

      <div className="tao3k-agent-control__console">
        <div className="tao3k-agent-control__map">
          <button
            className="tao3k-agent-control__layer tao3k-agent-control__layer--poo"
            data-active={activeLayer === "poo"}
            onClick={() => setActiveLayer("poo")}
            type="button"
          >
            <span>HIGHER-ORDER CONTROL PLANE</span>
            <strong>Gerbil / POO Flow</strong>
            <code>GlobalPlanₜ = Compile(Task, Profiles, Environment, Stateₜ)</code>
            <small>roles · profiles · delegation · evolution · policy provenance</small>
          </button>

          <div className="tao3k-agent-control__spine" aria-hidden="true">
            <span>derived constraints</span>
            <i />
          </div>

          <div className="tao3k-agent-control__effect">
            <span>CONCRETE EFFECT REQUEST</span>
            <code>principal / action / resource / context</code>
          </div>

          <button
            className="tao3k-agent-control__layer tao3k-agent-control__layer--cedar"
            data-active={activeLayer === "cedar"}
            onClick={() => setActiveLayer("cedar")}
            type="button"
          >
            <span>DETERMINISTIC EFFECT BOUNDARY</span>
            <strong>Cedar</strong>
            <code>Allowed(effect) = Authorize(P, A, R, C)</code>
            <small>one request · explicit policy · allow or deny</small>
          </button>

          <button
            className="tao3k-agent-control__layer tao3k-agent-control__layer--lean"
            data-active={activeLayer === "lean"}
            onClick={() => setActiveLayer("lean")}
            type="button"
          >
            <span>INDEPENDENT PROOF DIRECTION</span>
            <strong>Lean</strong>
            <code>Valid(trace) = Verify(lifecycle, delegation, receipts)</code>
            <small>cross-step · cross-Agent · machine-checked invariants</small>
          </button>

          <div className="tao3k-agent-control__runtime">
            <span>AGENT RUNTIME</span>
            <strong>Execute · persist · return evidence</strong>
            <i aria-hidden="true" />
          </div>
        </div>

        <footer className="tao3k-agent-control__telemetry">
          <div aria-live="polite">
            <span>ACTIVE LAYER</span>
            <strong>{active.label}</strong>
            <p>{active.status}</p>
          </div>
          <nav aria-label="Inspect Agent control architecture">
            {layers.map((layer) => (
              <button
                aria-pressed={layer.id === activeLayer}
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                type="button"
              >
                {layer.id.toUpperCase()}
              </button>
            ))}
          </nav>
        </footer>
      </div>
    </section>
  );
}
