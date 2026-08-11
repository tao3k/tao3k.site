export const deploymentPhases = [
  {
    id: "DECLARE",
    command: "[nix/source] declare host inventory",
    output: "./hosts + deployment metadata",
  },
  {
    id: "LOAD",
    command: "[sdos/omnibus] load typed host modules",
    output: "pops.load ./hosts",
  },
  {
    id: "COMPOSE",
    command: "[sdos/hivebus] compose fleet topology",
    output: "hive.setHosts self.hosts",
  },
  {
    id: "CLOSE",
    command: "[sdlc/nix+bazel] realize immutable closure",
    output: "/nix/store/7f3a-tao3k-system",
  },
  {
    id: "APPLY",
    command: "[sdos/deploy] converge qualified targets",
    output: "local · on-premises · managed cloud",
  },
  {
    id: "VERIFY",
    command: "[receipt] return destination evidence",
    output: "deployment://7f3a · policy satisfied",
  },
] as const;

export type DeploymentPhase = (typeof deploymentPhases)[number]["id"];
export type DeploymentPhaseState = "complete" | "active" | "pending";

const deploymentPhaseOrder = new Map<DeploymentPhase, number>(
  deploymentPhases.map(({ id }, index) => [id, index]),
);

export function deploymentPhaseIndex(phase: DeploymentPhase) {
  return deploymentPhaseOrder.get(phase) ?? 0;
}

export function deploymentPhaseState(
  phase: DeploymentPhase,
  activePhase: DeploymentPhase,
): DeploymentPhaseState {
  const phaseIndex = deploymentPhaseIndex(phase);
  const activeIndex = deploymentPhaseIndex(activePhase);
  if (phaseIndex < activeIndex) return "complete";
  return phaseIndex === activeIndex ? "active" : "pending";
}
