export type EvidenceStageId =
  | "source"
  | "passport"
  | "compute"
  | "workflow"
  | "authority"
  | "operation"
  | "evidence";

export type EvidenceStage = {
  readonly id: EvidenceStageId;
  readonly step: string;
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly status: string;
  readonly owner: string;
  readonly evidence: readonly string[];
};

export type ThreeKey = {
  readonly id: "know" | "govern" | "operate";
  readonly key: string;
  readonly verb: string;
  readonly title: string;
  readonly product: string;
  readonly description: string;
  readonly signals: readonly string[];
};

export const categoryPositioning = {
  eyebrow: "Research-to-Operations Infrastructure",
  title: "Make knowledge executable. Keep action accountable.",
  summary:
    "tao3k turns scientific models, AI agents, and human expertise into durable operating workflows—with evidence, policy, and human authority preserved at every step.",
  primaryAction: "Explore the lifecycle",
  primaryTo: "/platform",
  secondaryAction: "See the reference solution",
  secondaryTo: "/solutions",
} as const;

export const evidenceStages: readonly EvidenceStage[] = [
  {
    id: "source",
    step: "01",
    label: "Research source",
    title: "A model begins with provenance.",
    summary:
      "Papers, notebooks, code, assumptions, and domain evidence enter as named, versioned source material.",
    status: "grounded",
    owner: "Wendao",
    evidence: ["source identity", "version history", "linked assumptions"],
  },
  {
    id: "passport",
    step: "02",
    label: "Model passport",
    title: "The model receives an operating contract.",
    summary:
      "Inputs, units, scope, constraints, expected outputs, and fallback behavior become inspectable contracts.",
    status: "validated",
    owner: "Wendao + ASP",
    evidence: ["schema checked", "scope declared", "fallback defined"],
  },
  {
    id: "compute",
    step: "03",
    label: "Scientific compute",
    title: "Compute stays powerful and bounded.",
    summary:
      "Julia or Python performs scientific work through typed Arrow projections while Rust retains host authority.",
    status: "shadow run",
    owner: "Julia + Arrow",
    evidence: ["typed batch", "bounded profile", "shadow comparison"],
  },
  {
    id: "workflow",
    step: "04",
    label: "Governed workflow",
    title: "A result becomes a controlled next step.",
    summary:
      "Qianji compiles model output into checkpointed workflow state, policy gates, and explicit human tasks.",
    status: "checkpointed",
    owner: "Qianji",
    evidence: ["workflow state", "policy gate", "recovery point"],
  },
  {
    id: "authority",
    step: "05",
    label: "Human authority",
    title: "People decide when action carries risk.",
    summary:
      "An operator can approve, adjust, or reject a recommendation with the reasoning preserved as evidence.",
    status: "approval required",
    owner: "Operator",
    evidence: ["decision identity", "reason captured", "authority verified"],
  },
  {
    id: "operation",
    step: "06",
    label: "Durable operation",
    title: "Approved work runs with visible boundaries.",
    summary:
      "Marlin executes through explicit runtime, sandbox, retry, and recovery contracts rather than hidden agent state.",
    status: "runtime ready",
    owner: "Marlin",
    evidence: ["execution receipt", "sandbox scope", "replay handle"],
  },
  {
    id: "evidence",
    step: "07",
    label: "Outcome evidence",
    title: "The result returns to the knowledge loop.",
    summary:
      "Observed outcomes, human decisions, traces, and model versions remain available for audit and improvement.",
    status: "receipt sealed",
    owner: "tao3k evidence layer",
    evidence: ["outcome linked", "trace complete", "next review scheduled"],
  },
];

export const threeKeys: readonly ThreeKey[] = [
  {
    id: "know",
    key: "KEY 01",
    verb: "Know",
    title: "Turn research and operational context into computable evidence.",
    product: "Wendao",
    description:
      "Search, graph, provenance, and semantic protocols keep models connected to the sources and constraints that make them meaningful.",
    signals: ["knowledge graph", "model provenance", "typed retrieval"],
  },
  {
    id: "govern",
    key: "KEY 02",
    verb: "Govern",
    title: "Turn recommendations into workflows with explicit authority.",
    product: "Qianji + POO Flow",
    description:
      "BPMN, checkpoints, policy objects, proof obligations, and human tasks decide what may happen next—and why.",
    signals: ["workflow state", "human tasks", "policy evidence"],
  },
  {
    id: "operate",
    key: "KEY 03",
    verb: "Operate",
    title: "Run agents and scientific compute as durable infrastructure.",
    product: "Marlin + Julia / Arrow",
    description:
      "Typed runtimes, sandbox receipts, replay, fallback, and high-performance compute keep production behavior visible and recoverable.",
    signals: ["durable runtime", "scientific compute", "replayable receipts"],
  },
];

export const referenceScenario = {
  eyebrow: "Reference solution / illustrative process-optimization pilot",
  title: "Move one research model into a governed operating loop.",
  summary:
    "Start with one model, one operating boundary, and one measurable outcome. tao3k preserves the path from source evidence to human decision and observed result.",
  context:
    "A research team has a Julia optimization model. An operations team has live process data, safety constraints, and operators who retain final authority.",
  recommendation: {
    title: "Adjust the next operating interval",
    objective: "Reduce energy intensity while preserving the declared output constraint.",
    mode: "Shadow recommendation",
    authority: "Shift operator approval required",
    evidence: ["model passport valid", "input schema passed", "policy scope allowed"],
  },
  before: [
    "Research logic remains in a notebook",
    "Assumptions are separated from operations",
    "Recommendations move through manual handoffs",
    "Failures and overrides lose their context",
  ],
  after: [
    "The model has a versioned operating contract",
    "Scientific compute runs through typed projections",
    "Human approval is a first-class workflow state",
    "Every decision and outcome produces evidence",
  ],
  successMeasures: [
    "research-to-operation cycle time",
    "operator decision latency",
    "recommendation acceptance and override reasons",
    "fallback and replay success",
    "domain outcome selected with the design partner",
  ],
} as const;

export const technicalProof = [
  {
    label: "Authority",
    title: "Rust owns state and final mutation.",
    body: "Scientific services can recommend; they do not silently acquire production authority.",
  },
  {
    label: "Compute",
    title: "Julia and Python remain first-class scientific lanes.",
    body: "Existing research code can cross a typed Arrow boundary instead of being rewritten into a generic agent script.",
  },
  {
    label: "Workflow",
    title: "Qianji makes human work and recovery explicit.",
    body: "Checkpoints, claims, completions, policy gates, and audit events become durable workflow facts.",
  },
  {
    label: "Runtime",
    title: "Marlin exposes receipts, sandbox scope, and replay.",
    body: "Long-running agent work remains inspectable after the first successful demo.",
  },
] as const;
