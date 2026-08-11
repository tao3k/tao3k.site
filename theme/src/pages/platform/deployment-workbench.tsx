import { useState } from "react";
import { DeploymentInspector, type InspectedHost } from "./deployment-inspector";
import type { DeploymentPhase } from "./deployment-model";
import { DeploymentTopology } from "./deployment-topology";
import "./deployment-workbench.css";

const targets = ["LOCAL", "ON-PREMISES", "MANAGED CLOUD"] as const;

export function DeploymentWorkbench({ activePhase }: { activePhase: DeploymentPhase }) {
  const [inspectedHost, setInspectedHost] = useState<InspectedHost>(null);
  const phaseIndex = ["DECLARE", "LOAD", "COMPOSE", "CLOSE", "APPLY", "VERIFY"].indexOf(
    activePhase,
  );
  const targetState = phaseIndex < 4 ? "waiting" : phaseIndex === 4 ? "placing" : "verified";

  return (
    <div className="tao3k-deployment-workbench">
      <div className="tao3k-deployment-workbench__main">
        <DeploymentInspector activePhase={activePhase} inspectedHost={inspectedHost} />
        <DeploymentTopology activePhase={activePhase} onInspectHost={setInspectedHost} />
      </div>
      <footer className="tao3k-deployment-workbench__status">
        <div>
          <span>CLOSURE</span>
          <strong>7f3a</strong>
        </div>
        <ul>
          {targets.map((target) => (
            <li className={`is-${targetState}`} key={target}>
              <i aria-hidden="true" />
              <span>{target}</span>
              <small>{targetState}</small>
            </li>
          ))}
        </ul>
        <p>
          <span>EVIDENCE</span>
          <strong>{activePhase === "VERIFY" ? "RETURNED" : "PENDING"}</strong>
        </p>
      </footer>
    </div>
  );
}
