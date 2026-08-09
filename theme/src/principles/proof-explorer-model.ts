export type ProofObligationState =
  | "pending"
  | "checking"
  | "proved"
  | "failed"
  | "witness-required"
  | "authority-required";

export type ProofObligationClass =
  | "capability-qualified"
  | "composition-valid"
  | "handoff-preserves-evidence"
  | "trace-matches-declaration"
  | "high-risk-authority"
  | "admissible-action";

export type ProofEvidenceRef = {
  readonly graphId: string;
  readonly kind: "node" | "edge" | "trace" | "receipt";
  readonly label: string;
  readonly graphOrder: number;
};

export type ProofObligation = {
  readonly id: string;
  readonly className: ProofObligationClass;
  readonly verificationOrder: number;
  readonly symbol: string;
  readonly title: string;
  readonly claim: string;
  readonly formula: string;
  readonly intuition: string;
  readonly finding: string;
  readonly productionRisk: string;
  readonly agentAction: string;
  readonly userAudit: string;
  readonly source: string;
  readonly evidence: readonly ProofEvidenceRef[];
  readonly rule: string;
  readonly lean: string;
  readonly state: ProofObligationState;
  readonly detail: string;
};

export type ProofReceipt = {
  readonly schema: "admissible-action.receipt.v1";
  readonly workflowId: string;
  readonly traceDigest: string;
  readonly obligationCount: number;
  readonly provedCount: number;
  readonly failedCount: number;
  readonly witnessRequiredCount: number;
  readonly authorityRequiredCount: number;
  readonly finalStatus: "admissible" | "blocked" | "needs-human-authority";
};

export type ProofExplorerModel = {
  readonly workflowId: string;
  readonly obligations: readonly ProofObligation[];
  readonly receipt: ProofReceipt;
};

export type ProofRuntimeSnapshot = {
  readonly completedSteps: number;
  readonly stepCount: number;
  readonly running: boolean;
};

const proofStateFor = (
  runtime: ProofRuntimeSnapshot,
  verificationOrder: number,
  terminalState: ProofObligationState = "proved",
): ProofObligationState => {
  if (runtime.completedSteps >= verificationOrder) return terminalState;
  if (runtime.running && runtime.completedSteps + 1 === verificationOrder) return "checking";
  if (!runtime.running && runtime.completedSteps + 1 === verificationOrder) return "pending";
  return "pending";
};

const countState = (obligations: readonly ProofObligation[], state: ProofObligationState): number =>
  obligations.filter((obligation) => obligation.state === state).length;

const finalStatusFor = (obligations: readonly ProofObligation[]): ProofReceipt["finalStatus"] => {
  if (obligations.some((obligation) => obligation.state === "failed")) return "blocked";
  if (obligations.some((obligation) => obligation.state === "authority-required")) {
    return "needs-human-authority";
  }
  if (obligations.every((obligation) => obligation.state === "proved")) return "admissible";
  return "blocked";
};

const stableTraceDigest = (workflowId: string, obligations: readonly ProofObligation[]): string => {
  let hash = 2166136261;
  for (const character of `${workflowId}:${obligations.map(({ id, state }) => `${id}:${state}`).join("|")}`) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `trace-${(hash >>> 0).toString(16).padStart(8, "0")}`;
};

export const createProofReceipt = (
  workflowId: string,
  obligations: readonly ProofObligation[],
): ProofReceipt => ({
  schema: "admissible-action.receipt.v1",
  workflowId,
  traceDigest: stableTraceDigest(workflowId, obligations),
  obligationCount: obligations.length,
  provedCount: countState(obligations, "proved"),
  failedCount: countState(obligations, "failed"),
  witnessRequiredCount: countState(obligations, "witness-required"),
  authorityRequiredCount: countState(obligations, "authority-required"),
  finalStatus: finalStatusFor(obligations),
});

export const createPrinciplesProofExplorerModel = (
  runtime: ProofRuntimeSnapshot = { completedSteps: 0, stepCount: 0, running: false },
): ProofExplorerModel => {
  const workflowId = "tao3k-human-capability";
  const obligations: readonly ProofObligation[] = [
    {
      id: "capability-qualified",
      className: "capability-qualified",
      verificationOrder: 1,
      symbol: "Γ ⊢ cap",
      title: "Capability qualifies the profile",
      claim: "The person and AI profile have declared capabilities for the selected action.",
      formula: "Γ ⊢ HasCapability(human, ai, action) ⇒ QualifiedProfile(action)",
      intuition: "A system may start only after the capability is named and typed.",
      finding: "Capability boundary detected before the workflow can start.",
      productionRisk:
        "Without this gate, an AI step can execute with an undefined owner or ambiguous permission.",
      agentAction:
        "Ask the implementation agent to bind each action to a named capability profile.",
      userAudit: "Confirm the workflow owner and allowed action scope before deployment.",
      source: "Scheme profile composition",
      evidence: [
        {
          graphId: "human-capability",
          graphOrder: 1,
          kind: "node",
          label: "Capability composition",
        },
      ],
      rule: "profile.capability-qualified",
      lean: "theorem capability_qualifies_profile\n  (g : WorkflowGraph) (h : HasDeclaredCapability g human ai action) :\n  QualifiedProfile g action := by\n  exact qualify_profile h",
      state: proofStateFor(runtime, 1),
      detail:
        "The graph exposes capability as a qualification boundary instead of treating model output as authority.",
    },
    {
      id: "composition-valid",
      className: "composition-valid",
      verificationOrder: 2,
      symbol: "D ⇝ T",
      title: "Composition is structurally valid",
      claim: "The workflow composition follows the declared Scheme graph structure.",
      formula: "Project(SchemeDecl, RuntimeTrace) ⇒ ValidComposition(RuntimeTrace)",
      intuition:
        "The graph is not trusted because it renders; it is trusted because it projects from the declaration.",
      finding: "Composition proof checks whether the rendered graph still matches the Scheme plan.",
      productionRisk:
        "A visual workflow can look correct while the runtime executes a different branch order.",
      agentAction: "Regenerate the topology from the Scheme declaration and reject drifted nodes.",
      userAudit: "Review whether every visible branch has an expected business meaning.",
      source: "POO Flow composition",
      evidence: [
        { graphId: "compose", graphOrder: 6, kind: "node", label: "Knowledge composition" },
      ],
      rule: "scheme.composition-valid",
      lean: "theorem scheme_composition_valid\n  (decl : SchemeDeclaration) (trace : RuntimeTrace) :\n  ProjectsTo decl trace -> ValidComposition trace := by\n  intro projection\n  exact projection.valid",
      state: proofStateFor(runtime, 2),
      detail:
        "The execution projection is accepted only when its case/profile structure matches the Scheme-owned composition.",
    },
    {
      id: "handoff-preserves-evidence",
      className: "handoff-preserves-evidence",
      verificationOrder: 3,
      symbol: "E₀ → E₁",
      title: "Handoff preserves evidence",
      claim: "Evidence remains attached when action moves between person, AI, and runtime.",
      formula: "CarriesEvidence(edge, E₀, E₁) ⇒ Reachable(E₁)",
      intuition: "A handoff is valid only if the next actor can still inspect the evidence.",
      finding: "Evidence continuity is checked across the handoff edge.",
      productionRisk:
        "If evidence is dropped, the next agent may act from stale context or unverifiable memory.",
      agentAction: "Attach source receipts to the handoff payload and fail closed when missing.",
      userAudit: "Inspect the evidence packet before approving downstream automation.",
      source: "Runtime handoff edge",
      evidence: [
        { graphId: "evidence-return", graphOrder: 10, kind: "edge", label: "Evidence return" },
      ],
      rule: "trace.handoff-preserves-evidence",
      lean: "theorem handoff_preserves_evidence\n  (before after : EvidenceState) (edge : HandoffEdge) :\n  CarriesEvidence edge before after -> EvidenceReachable after := by\n  intro carried\n  exact carried.reachable",
      state: proofStateFor(runtime, 3),
      detail:
        "The trace keeps evidence addressable across handoff, so the user can inspect why the next step is permitted.",
    },
    {
      id: "trace-matches-declaration",
      className: "trace-matches-declaration",
      verificationOrder: 4,
      symbol: "Replay(T)=D",
      title: "Trace matches declaration",
      claim: "Runtime facts correspond to the declared Scheme steps and edges.",
      formula: "Replay(RuntimeTrace) = SchemeDecl ⇒ TraceConforms(SchemeDecl, RuntimeTrace)",
      intuition: "The runtime trace must replay back into the same declared workflow.",
      finding:
        "Runtime replay checks whether actual execution still conforms to the declared plan.",
      productionRisk:
        "A long-running AI workflow can silently diverge after retries, tool failures, or policy changes.",
      agentAction: "Compare trace replay against the declaration and produce a diff for repair.",
      userAudit: "Review any divergence before trusting the result as an operational receipt.",
      source: "Execution trace",
      evidence: [
        { graphId: "qualify", graphOrder: 8, kind: "trace", label: "Qualification trace" },
      ],
      rule: "lean.trace-matches-declaration",
      lean: "theorem trace_matches_declaration\n  (decl : SchemeDeclaration) (trace : RuntimeTrace) :\n  Replay trace = some decl -> TraceConforms decl trace := by\n  intro replay_ok\n  exact replay_conformance replay_ok",
      state: proofStateFor(runtime, 4),
      detail:
        "Lean states the invariant explicitly: a replayed runtime trace must conform to the Scheme declaration before it can support authority.",
    },
    {
      id: "high-risk-authority",
      className: "high-risk-authority",
      verificationOrder: 5,
      symbol: "risk ⇒ H",
      title: "Human authority remains explicit",
      claim: "High-risk action cannot bypass human responsibility or benefit.",
      formula: "HighRisk(action) ∧ GovernedBy(policy, action) ⇒ RequiresHumanAuthority(action)",
      intuition:
        "Formal proof can prepare authority, but it cannot erase the responsible human boundary.",
      finding: "High-risk authority is detected; the proof blocks automatic admission.",
      productionRisk:
        "If this bypasses review, the system can make consequential decisions without accountability.",
      agentAction: "Escalate to a human authority checkpoint with policy and evidence attached.",
      userAudit: "Decide whether the business context permits this action and who owns the risk.",
      source: "Human authority policy",
      evidence: [{ graphId: "act", graphOrder: 9, kind: "node", label: "Human authority" }],
      rule: "policy.high-risk-authority",
      lean: "theorem high_risk_requires_human_authority\n  (a : Action) (p : Policy) :\n  HighRisk a -> GovernedBy p a -> RequiresHumanAuthority a := by\n  intro risk governed\n  exact p.requires_authority risk governed",
      state: proofStateFor(runtime, 5, "authority-required"),
      detail:
        "The system can prepare admissible evidence, but a consequential action remains blocked until a responsible human confirms authority.",
    },
    {
      id: "admissible-action",
      className: "admissible-action",
      verificationOrder: 6,
      symbol: "Σ proofs",
      title: "Action receipt is not automatically admissible",
      claim: "The final action receives qualification only after obligations are explained.",
      formula:
        "AllProved(obligations) ∧ Explains(receipt, obligations) ⇒ AdmissibleAction(receipt)",
      intuition:
        "The receipt becomes admissible only when the proof obligations are inspectable together.",
      finding: "The final receipt is not admitted until all obligations explain the action.",
      productionRisk:
        "A result without an admissible receipt becomes hard to debug, audit, or reuse for training data.",
      agentAction:
        "Bundle proof status, trace digest, and unresolved obligations into the receipt.",
      userAudit:
        "Use the receipt to decide whether to accept, contest, or send the workflow back for repair.",
      source: "Admissible action receipt",
      evidence: [{ graphId: "learn", graphOrder: 11, kind: "receipt", label: "Returned receipt" }],
      rule: "receipt.admissible-action",
      lean: "theorem admissible_action_requires_receipt\n  (o : Obligations) (r : Receipt) :\n  AllProved o -> Explains r o -> AdmissibleAction r := by\n  intro proved explains\n  exact admissible_from_receipt proved explains",
      state: proofStateFor(runtime, 6, "witness-required"),
      detail:
        "The receipt is intentionally visible as an object that can be audited, contested, and improved.",
    },
  ];
  return {
    workflowId,
    obligations,
    receipt: createProofReceipt(workflowId, obligations),
  };
};
