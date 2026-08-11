import { deploymentPhaseIndex, type DeploymentPhase } from "./deployment-model";
import type { InspectedHost } from "./deployment-inspector";
import "./deployment-topology.css";

type ProjectedObject = {
  id: string;
  label: string;
  kind: string;
  location: string;
  facts: readonly string[];
  sourceTarget: NonNullable<InspectedHost>["sourceTarget"];
};

const phaseTransform = {
  DECLARE: "READ ATTRSETS",
  LOAD: "LOAD TYPES",
  COMPOSE: "COMPOSE FLEET",
  CLOSE: "REALIZE CLOSURE",
  APPLY: "PROJECT TARGETS",
  VERIFY: "RETURN RECEIPTS",
} as const satisfies Record<DeploymentPhase, string>;

function hostProjection(activePhase: DeploymentPhase): readonly ProjectedObject[] {
  const phase = deploymentPhaseIndex(activePhase);
  const composed = phase >= 2;
  return [
    {
      id: "host1",
      label: "host1",
      kind: composed ? "HIVE MEMBER" : phase === 1 ? "TYPED HOST" : "REC ATTRSET",
      location: "x86_64-linux",
      facts: composed
        ? ["NixOS configuration", "Colmena target"]
        : ["nixpkgs input", "NixOS + Disko"],
      sourceTarget: "host1",
    },
    {
      id: "host2",
      label: "host2",
      kind: composed ? "HIVE MEMBER" : phase === 1 ? "TYPED HOST" : "REC ATTRSET",
      location: "aarch64-linux",
      facts: composed
        ? ["Darwin configuration", "Home configuration"]
        : ["nixpkgs input", "Darwin + Home"],
      sourceTarget: "host2",
    },
  ];
}

function exportProjection(activePhase: DeploymentPhase): readonly ProjectedObject[] {
  const state =
    activePhase === "APPLY"
      ? "target attached"
      : activePhase === "VERIFY"
        ? "receipt qualified"
        : "flake output";
  return [
    {
      id: "nixos",
      label: "asd",
      kind: "NIXOS",
      location: "host1",
      facts: ["bee.pkgs + system", state],
      sourceTarget: "host1",
    },
    {
      id: "darwin",
      label: "darwinConfigurations",
      kind: "DARWIN",
      location: "host2",
      facts: ["nix-darwin", state],
      sourceTarget: "host2",
    },
    {
      id: "home",
      label: "homeConfigurations",
      kind: "HOME",
      location: "host2",
      facts: ["home-manager", state],
      sourceTarget: "host2",
    },
    {
      id: "colmena",
      label: "colmenaHive",
      kind: "COLMENA",
      location: "hivePop.exports",
      facts: ["setHosts + addInputs", state],
      sourceTarget: "exports",
    },
  ];
}

type DeploymentTopologyProps = {
  activePhase: DeploymentPhase;
  onInspectHost: (host: InspectedHost) => void;
};

export function DeploymentTopology({ activePhase, onInspectHost }: DeploymentTopologyProps) {
  const phase = deploymentPhaseIndex(activePhase);
  const projectedObjects = phase < 3 ? hostProjection(activePhase) : exportProjection(activePhase);
  const projection = phase < 3 ? "HOST MODEL" : "FLAKE EXPORTS";
  const objectState = phase < 4 ? "DECLARED" : phase === 4 ? "PLACING" : "VERIFIED";

  return (
    <section className="tao3k-deployment-topology" data-phase={activePhase}>
      <header className="tao3k-deployment-topology__hud">
        <div>
          <strong>HIVEBUS EVALUATION</strong>
          <span>Nix objects become deployable system identities.</span>
        </div>
        <dl>
          <div>
            <dt>PHASE</dt>
            <dd>{activePhase}</dd>
          </div>
          <div>
            <dt>PROJECTION</dt>
            <dd>{projection}</dd>
          </div>
          <div>
            <dt>OBJECTS</dt>
            <dd>{String(projectedObjects.length).padStart(2, "0")}</dd>
          </div>
        </dl>
      </header>

      <div className="tao3k-deployment-topology__stage">
        <article className="tao3k-deployment-topology__source">
          <span>NIX SOURCE</span>
          <strong>hosts</strong>
          <p>Architecture-aware declarations</p>
          <ul>
            <li>host1 · x86_64-linux</li>
            <li>host2 · aarch64-linux</li>
          </ul>
        </article>

        <div className="tao3k-deployment-topology__transform" aria-hidden="true">
          <i />
          <span>{phaseTransform[activePhase]}</span>
          <strong>
            OMNIBUS
            <br />
            HIVEBUS
          </strong>
          <i />
        </div>

        <section className="tao3k-deployment-topology__projection">
          <header>
            <span>PROJECTED SYSTEM</span>
            <strong>{projection}</strong>
          </header>
          <div className="tao3k-deployment-topology__objects" data-count={projectedObjects.length}>
            {projectedObjects.map((object) => (
              <button
                key={object.id}
                onClick={() =>
                  onInspectHost({
                    label: object.label,
                    location: object.location,
                    sourceTarget: object.sourceTarget,
                  })
                }
                type="button"
              >
                <span>{object.kind}</span>
                <strong>{object.label}</strong>
                <small>{object.location}</small>
                <ul>
                  {object.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <em>{objectState}</em>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
