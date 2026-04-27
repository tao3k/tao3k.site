import { Effect } from "effect";

export type RouteId =
  | "home"
  | "platform"
  | "api"
  | "deployment"
  | "enterprise"
  | "openSource"
  | "research"
  | "contact";

export type NavigationItem = {
  readonly label: string;
  readonly to: string;
};

export type LifecycleStage = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly signal: string;
};

export type PlatformModule = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly inputs: readonly string[];
  readonly outputs: readonly string[];
};

export type PageSection = {
  readonly title: string;
  readonly body: string;
  readonly points: readonly string[];
};

export type PageContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly ctaLabel: string;
  readonly ctaTo: string;
  readonly sections: readonly PageSection[];
};

export type ApiProtocol = {
  readonly id: string;
  readonly label: string;
  readonly fit: string;
  readonly surface: string;
  readonly contract: string;
  readonly latency: string;
  readonly example: string;
  readonly signals: readonly string[];
};

export type DeploymentMode = {
  readonly id: string;
  readonly label: string;
  readonly posture: string;
  readonly summary: string;
  readonly infrastructure: readonly string[];
  readonly modelPlane: readonly string[];
  readonly proof: string;
};

export type EnterpriseValue = {
  readonly id: string;
  readonly label: string;
  readonly before: string;
  readonly after: string;
  readonly proof: string;
  readonly buyerSignal: string;
};

export type ResearchMoat = {
  readonly id: string;
  readonly label: string;
  readonly claim: string;
  readonly evidence: string;
  readonly stack: readonly string[];
};

export type OpenSourceLane = {
  readonly id: string;
  readonly label: string;
  readonly ownership: string;
  readonly surface: string;
  readonly entrypoints: readonly string[];
  readonly proof: string;
};

export type ValidationGate = {
  readonly label: string;
  readonly command: string;
  readonly purpose: string;
};

export type ContactOption = {
  readonly id: string;
  readonly label: string;
  readonly audience: string;
  readonly summary: string;
  readonly route: string;
  readonly signals: readonly string[];
};

export type ProofPoint = {
  readonly title: string;
  readonly body: string;
};

export type RuntimeNodeId = "wendao" | "qianji" | "qianhuan" | "daochang";

export type RuntimeTraceLine = {
  readonly kind: "command" | "ok" | "trace" | "proof";
  readonly nodeId: RuntimeNodeId;
  readonly text: string;
};

export type SiteModel = {
  readonly navigation: readonly NavigationItem[];
  readonly lifecycle: readonly LifecycleStage[];
  readonly modules: readonly PlatformModule[];
  readonly apiProtocols: readonly ApiProtocol[];
  readonly deploymentModes: readonly DeploymentMode[];
  readonly enterpriseValues: readonly EnterpriseValue[];
  readonly researchMoats: readonly ResearchMoat[];
  readonly openSourceLanes: readonly OpenSourceLane[];
  readonly validationGates: readonly ValidationGate[];
  readonly contactOptions: readonly ContactOption[];
  readonly proofPoints: readonly ProofPoint[];
  readonly traces: readonly RuntimeTraceLine[];
  readonly pages: Record<RouteId, PageContent>;
};

const siteModel: SiteModel = {
  navigation: [
    { label: "Products", to: "/platform" },
    { label: "API", to: "/api" },
    { label: "Deployment", to: "/deployment" },
    { label: "Enterprise", to: "/enterprise" },
    { label: "Open Source", to: "/open-source" },
    { label: "Research", to: "/research" },
    { label: "Contact", to: "/contact" },
  ],
  lifecycle: [
    {
      id: "agent-infra",
      label: "A",
      title: "Native agent infrastructure",
      summary:
        "Rust-owned contracts, native tool routing, runtime security, storage, and model/provider seams.",
      signal: "runtime contracts online",
    },
    {
      id: "knowledge-workflow",
      label: "B",
      title: "Knowledge to workflow",
      summary:
        "Wendao grounds context while Qianji turns ranked knowledge into controlled execution paths.",
      signal: "graph context routed",
    },
    {
      id: "verified-ops",
      label: "C",
      title: "Verified AI operations",
      summary:
        "Qianhuan shapes context and Daochang hosts audited agent work with traceable state transitions.",
      signal: "operation trace verified",
    },
    {
      id: "compute-plane",
      label: "D",
      title: "Compute and transport plane",
      summary:
        "Apache Arrow, Arrow Flight, and Julia connect high-throughput data with analytical computation.",
      signal: "columnar compute flowing",
    },
  ],
  modules: [
    {
      id: "wendao",
      name: "Wendao",
      role: "Knowledge, search, gateway",
      description:
        "Computable graph, retrieval plans, repo intelligence, and high-performance query surfaces.",
      inputs: ["repositories", "documents", "entities", "runtime queries"],
      outputs: ["retrieval plans", "ranked context", "Arrow batches", "gateway traces"],
    },
    {
      id: "qianji",
      name: "Qianji",
      role: "Workflow and control plane",
      description:
        "Flowhub and BPMN control for workflow starts, state advancement, checkpoints, and human tasks.",
      inputs: ["retrieval context", "workflow graphs", "operator actions"],
      outputs: ["execution states", "checkpoints", "task claims", "audit events"],
    },
    {
      id: "qianhuan",
      name: "Qianhuan",
      role: "Context and persona rendering",
      description:
        "Template and persona binding that keeps agent context explicit, inspectable, and role-aware.",
      inputs: ["workflow intent", "knowledge bundles", "persona contracts"],
      outputs: ["rendered context", "role surfaces", "prompt contracts"],
    },
    {
      id: "daochang",
      name: "Daochang",
      role: "Native agent host",
      description:
        "Agent loop runtime for native tool execution, orchestration, and integration with governed services.",
      inputs: ["operator sessions", "tool calls", "runtime settings"],
      outputs: ["agent turns", "native dispatch", "operation telemetry"],
    },
    {
      id: "julia",
      name: "Julia Compute Bridge",
      role: "High-performance analysis",
      description:
        "Numerical, scientific, engineering, and simulation-adjacent compute bound to the agent lifecycle.",
      inputs: ["Arrow data", "model artifacts", "engineering repositories"],
      outputs: ["analysis kernels", "structured findings", "compute reports"],
    },
    {
      id: "arrow-flight",
      name: "Apache Arrow + Flight",
      role: "Columnar transport plane",
      description:
        "High-throughput cross-language transport between Rust services, Python adapters, Julia compute, and customers.",
      inputs: ["columnar records", "service calls", "query results"],
      outputs: ["Flight streams", "typed batches", "consumer-ready data"],
    },
  ],
  apiProtocols: [
    {
      id: "http",
      label: "HTTP",
      fit: "Product integrations, operators, web control surfaces",
      surface: "Search, workflow start, task state, gateway read APIs",
      contract: "JSON request/response with typed ids and trace handles",
      latency: "Interactive request path",
      example: "GET /api/wendao/search?q=contract-feedback&scope=repo",
      signals: ["broad client support", "easy customer onboarding", "gateway friendly"],
    },
    {
      id: "grpc",
      label: "gRPC",
      fit: "Service-to-service runtime integration",
      surface: "Qianji workflow control, checkpoints, state transitions",
      contract: "Protobuf services with explicit lifecycle messages",
      latency: "Low-overhead internal calls",
      example: "QianjiWorkflow.Start({ graph: 'docs-search', checkpoint: true })",
      signals: ["typed service mesh", "streamable state", "operator trace ids"],
    },
    {
      id: "arrow-flight",
      label: "Arrow Flight",
      fit: "High-throughput data, analytics, Julia/Python consumers",
      surface: "Columnar search output, graph features, compute batches",
      contract: "Apache Arrow schemas over Flight streams",
      latency: "Batch and streaming data plane",
      example: "FlightClient.do_get(Ticket('wendao/search/repo-intel'))",
      signals: ["columnar transport", "zero-copy friendly", "compute-ready batches"],
    },
  ],
  deploymentModes: [
    {
      id: "local",
      label: "Local",
      posture: "developer and lab machines",
      summary:
        "Run Wendao/Qianji services close to repositories, private files, and engineering workflows.",
      infrastructure: ["single-node gateway", "local cache roots", "CLI-first operation"],
      modelPlane: [
        "local model endpoints",
        "OpenAI-compatible adapters",
        "no data egress by default",
      ],
      proof: "fast proof-of-value without asking customers to move source material first",
    },
    {
      id: "private",
      label: "Private",
      posture: "on-prem and private network",
      summary:
        "Keep knowledge, workflow state, and audit evidence inside compliance-sensitive boundaries.",
      infrastructure: ["private gateway", "controlled storage plane", "operator checkpoints"],
      modelPlane: ["internal inference", "approved cloud bridge", "policy-bound routing"],
      proof: "enterprise trust story: governed agents without surrendering the data plane",
    },
    {
      id: "cloud",
      label: "Cloud",
      posture: "managed service surface",
      summary:
        "Host gateway, workflow, API, and observability surfaces for teams that want speed and scale.",
      infrastructure: ["hosted APIs", "managed runtime services", "observability hooks"],
      modelPlane: ["cloud model providers", "multi-provider routing", "usage controls"],
      proof: "customer onboarding path for VC-scale growth and repeatable deployments",
    },
    {
      id: "hybrid",
      label: "Hybrid",
      posture: "split control and data planes",
      summary:
        "Run sensitive knowledge locally while exposing governed API and workflow services where teams collaborate.",
      infrastructure: ["local data plane", "cloud control plane", "federated traces"],
      modelPlane: ["local-private fallback", "cloud burst capacity", "tenant-specific policies"],
      proof: "practical bridge between enterprise constraints and modern AI infrastructure",
    },
  ],
  enterpriseValues: [
    {
      id: "governance",
      label: "Governance",
      before: "prompt chains with unclear authority",
      after: "retrieval, workflow, and evidence as first-class contracts",
      proof: "operator checkpoints and persisted trace handles",
      buyerSignal: "risk teams can inspect how an answer or action was produced",
    },
    {
      id: "workflow",
      label: "Workflow",
      before: "one-off agent runs that disappear after completion",
      after: "Qianji-controlled state transitions and human task gates",
      proof: "BPMN/Flowhub graphs, checkpoints, task claims, audit events",
      buyerSignal: "operations leaders can move AI work into governed process",
    },
    {
      id: "compute",
      label: "Compute",
      before: "analysis copied through slow JSON and notebooks",
      after: "Arrow Flight streams feeding Julia/Python/Rust compute",
      proof: "columnar batches and compute-ready schemas",
      buyerSignal: "engineering teams can attach serious analysis to agent workflows",
    },
    {
      id: "deployment",
      label: "Deployment",
      before: "data must leave the customer boundary to create value",
      after: "local, private, cloud, and hybrid runtime choices",
      proof: "split data/control planes with policy-bound model routing",
      buyerSignal: "security-conscious customers can start without surrendering data gravity",
    },
  ],
  researchMoats: [
    {
      id: "graph",
      label: "Computable graph memory",
      claim: "Knowledge is modeled as entity/relation runtime material, not passive markdown.",
      evidence:
        "Wendao retrieval plans, graph neighborhoods, repo intelligence, and ranked context.",
      stack: ["Wendao", "semantic graph", "repo intelligence"],
    },
    {
      id: "control",
      label: "Workflow-native agency",
      claim: "Agent work becomes governed state movement rather than invisible conversation.",
      evidence: "Qianji checkpoints, human tasks, Flowhub/BPMN control, and persisted events.",
      stack: ["Qianji", "Flowhub", "BPMN"],
    },
    {
      id: "transport",
      label: "Columnar transport plane",
      claim: "High-throughput agent infrastructure should not be trapped in JSON-only APIs.",
      evidence: "Apache Arrow schemas, Arrow Flight streams, and cross-language compute consumers.",
      stack: ["Apache Arrow", "Arrow Flight", "Rust/Python/Julia"],
    },
    {
      id: "compute",
      label: "Numerical compute bridge",
      claim: "AI infrastructure needs engineering-grade analysis paths, not just prompt routing.",
      evidence: "Julia kernels can consume Arrow batches and return structured findings.",
      stack: ["Julia", "analysis kernels", "structured reports"],
    },
  ],
  openSourceLanes: [
    {
      id: "wendao",
      label: "Wendao",
      ownership: "knowledge, search, gateway",
      surface: "Repo intelligence, computable graph retrieval, API gateway, docs and ADR audit.",
      entrypoints: ["wendao search", "wendao audit", "HTTP/gRPC/Flight gateway"],
      proof: "search and documentation surfaces are promoted through explicit lint/audit checks",
    },
    {
      id: "qianji",
      label: "Qianji",
      ownership: "workflow and control plane",
      surface: "Flowhub/BPMN workflow execution, checkpoints, task claims, persisted state.",
      entrypoints: ["qianji run", "flowhub graphs", "workflow API"],
      proof: "agent work is represented as governed state movement instead of hidden chat history",
    },
    {
      id: "qianhuan",
      label: "Qianhuan",
      ownership: "context and persona binding",
      surface: "Persona contracts, template binding, provenance-aware context rendering.",
      entrypoints: ["context templates", "persona contracts", "rendered prompt surfaces"],
      proof: "LLM-facing context stays inspectable and subordinate to governed sources",
    },
    {
      id: "daochang",
      label: "Daochang",
      ownership: "native agent host",
      surface: "Agent loop hosting, native tool dispatch, runtime telemetry, operator sessions.",
      entrypoints: ["agent host", "native dispatch", "operation telemetry"],
      proof: "runtime execution remains close to Rust-owned contracts and observable traces",
    },
    {
      id: "compute",
      label: "Arrow + Julia",
      ownership: "transport and high-performance compute",
      surface: "Apache Arrow schemas, Arrow Flight streams, Julia kernels, Python consumers.",
      entrypoints: ["Flight streams", "Julia analysis", "typed data adapters"],
      proof: "analysis-heavy workflows avoid slow JSON-only integration paths",
    },
  ],
  validationGates: [
    {
      label: "Frontend",
      command: "npm run validate",
      purpose: "format, lint, typecheck, and build with oxfmt/oxlint gates",
    },
    {
      label: "Architecture docs",
      command: "wendao audit --load wendao-episteme docs/architecture/*.md",
      purpose: "ADR and architecture pages keep stable identity and policy checks",
    },
    {
      label: "Markdown",
      command: "wendao lint markdown docs",
      purpose: "documentation remains machine-checkable before promotion",
    },
    {
      label: "Whitespace",
      command: "git diff --check && git diff --cached --check",
      purpose: "staged and working-tree snapshots stay clean",
    },
  ],
  contactOptions: [
    {
      id: "demo",
      label: "Customer demo",
      audience: "AI product and platform teams",
      summary:
        "Walk through governed knowledge retrieval, workflow control, deployment posture, and API integration paths.",
      route: "/enterprise",
      signals: ["governed workflow", "private deployment", "integration planning"],
    },
    {
      id: "deployment",
      label: "Deployment discovery",
      audience: "security, infra, and model platform teams",
      summary:
        "Map local, private, cloud, hybrid, and model routing choices against customer data boundaries.",
      route: "/deployment",
      signals: ["local-first", "hybrid control plane", "model policy"],
    },
    {
      id: "api",
      label: "API integration",
      audience: "engineering teams and systems integrators",
      summary:
        "Select the HTTP, gRPC, and Arrow Flight service surfaces that fit the customer's runtime path.",
      route: "/api",
      signals: ["typed contracts", "Flight streams", "workflow services"],
    },
    {
      id: "open-source",
      label: "Open-source collaboration",
      audience: "developers and technical evaluators",
      summary:
        "Start from package boundaries, validation gates, docs, and the xiuxian-artisan-workshop repository.",
      route: "https://github.com/tao3k/xiuxian-artisan-workshop",
      signals: ["Rust workspace", "Wendao/Qianji", "audit culture"],
    },
  ],
  proofPoints: [
    {
      title: "Rust-owned contracts",
      body: "Execution, routing, transport, verification, and persistence stay in native boundaries.",
    },
    {
      title: "Computable graph",
      body: "Wendao treats entities and relations as a runtime substrate, not just passive documents.",
    },
    {
      title: "Arrow Flight transport",
      body: "High-throughput columnar APIs keep service integration out of slow JSON-only paths.",
    },
    {
      title: "Julia compute bridge",
      body: "Engineering and analytical kernels can run where numerical performance matters.",
    },
    {
      title: "Verified workflow control",
      body: "Qianji and Daochang turn agent work into auditable state transitions.",
    },
  ],
  traces: [
    {
      kind: "command",
      nodeId: "wendao",
      text: "wendao search --seed contract-feedback --flight",
    },
    {
      kind: "ok",
      nodeId: "wendao",
      text: "semantic neighborhood ranked by graph + vector fusion",
    },
    {
      kind: "command",
      nodeId: "qianji",
      text: "qianji run --graph docs-search --checkpoint",
    },
    {
      kind: "trace",
      nodeId: "qianhuan",
      text: "context contract rendered with persona + provenance",
    },
    {
      kind: "command",
      nodeId: "daochang",
      text: "julia compute --batch arrow-flight://analysis/repo",
    },
    {
      kind: "proof",
      nodeId: "daochang",
      text: "knowledge -> workflow -> compute -> verified operation",
    },
  ],
  pages: {
    home: {
      eyebrow: "tao3k / xiuxian-artisan-workshop",
      title: "The living infrastructure layer for governed AI agents.",
      summary:
        "A Rust-first platform lifecycle for building native agent infrastructure, turning computable knowledge into workflow control, and operating AI systems with verifiable traces.",
      ctaLabel: "Explore platform",
      ctaTo: "/platform",
      sections: [],
    },
    platform: {
      eyebrow: "Platform lifecycle",
      title: "Wendao, Qianji, Qianhuan, Daochang, Julia, and Arrow Flight in one runtime surface.",
      summary:
        "The platform page maps each capability to its role in the agent lifecycle so customers can see how knowledge, workflow, context, hosting, compute, and transport fit together.",
      ctaLabel: "Inspect API surface",
      ctaTo: "/api",
      sections: [
        {
          title: "Knowledge and search",
          body: "Wendao owns computable graph retrieval, repo intelligence, query surfaces, and gateway contracts.",
          points: ["entity-centric graph", "ranked retrieval plans", "Arrow/Flight query output"],
        },
        {
          title: "Workflow and control",
          body: "Qianji owns Flowhub and BPMN control for checkpoints, human tasks, and state advancement.",
          points: ["workflow starts", "checkpointed execution", "human-task coordination"],
        },
        {
          title: "Context, host, and compute",
          body: "Qianhuan renders context, Daochang hosts native agent work, and Julia extends the plane into high-performance computation.",
          points: ["persona/context binding", "native agent host", "engineering compute bridge"],
        },
      ],
    },
    api: {
      eyebrow: "Service integration",
      title: "High-performance HTTP, gRPC, and Arrow Flight APIs for agent infrastructure.",
      summary:
        "Wendao and Qianji are callable service surfaces. Customers can integrate retrieval, workflow control, checkpoints, human tasks, and columnar data exchange into their own systems.",
      ctaLabel: "Plan deployment",
      ctaTo: "/deployment",
      sections: [
        {
          title: "Wendao API",
          body: "Search, gateway, repo intelligence, and structured data access through HTTP, gRPC, and Arrow Flight paths.",
          points: ["search and retrieval", "repo intelligence", "columnar Flight streams"],
        },
        {
          title: "Qianji API",
          body: "Workflow starts, state advancement, checkpoints, human task coordination, and execution traces.",
          points: ["BPMN and Flowhub control", "checkpoint lifecycle", "trace access"],
        },
        {
          title: "Transport choices",
          body: "HTTP stays broad, gRPC supports service-to-service integration, and Arrow Flight handles high-throughput columnar exchange.",
          points: ["HTTP integration", "gRPC services", "Arrow Flight data plane"],
        },
      ],
    },
    deployment: {
      eyebrow: "Deployment solutions",
      title: "Local, private, cloud, hybrid, and model deployment paths for AI infrastructure.",
      summary:
        "The deployment surface is built for teams that need governed agent infrastructure close to their data, models, and engineering workflows.",
      ctaLabel: "Enterprise posture",
      ctaTo: "/enterprise",
      sections: [
        {
          title: "Local-first and private",
          body: "Run on workstations, lab machines, private networks, and compliance-sensitive environments.",
          points: ["local runtime", "on-prem knowledge", "private workflow state"],
        },
        {
          title: "Cloud and hybrid",
          body: "Host gateways, runtime services, and storage planes in the cloud while preserving local control where needed.",
          points: ["hosted gateway", "hybrid knowledge plane", "cloud runtime services"],
        },
        {
          title: "Model deployment layer",
          body: "Support local models, cloud models, OpenAI-compatible endpoints, and future multi-provider routing.",
          points: ["local inference", "cloud providers", "OpenAI-compatible endpoints"],
        },
      ],
    },
    enterprise: {
      eyebrow: "Customer and VC narrative",
      title: "Turn enterprise knowledge into controlled agent workflows.",
      summary:
        "Xiuxian is not a chatbot wrapper. It is infrastructure for making knowledge, workflow, compute, and auditability part of the same operating surface.",
      ctaLabel: "Read research moat",
      ctaTo: "/research",
      sections: [
        {
          title: "Governed workflow value",
          body: "Move from brittle prompts to explicit retrieval, workflow control, checkpointing, and operational proof.",
          points: ["controlled execution", "audit traces", "operator checkpoints"],
        },
        {
          title: "Engineering intelligence",
          body: "Use Arrow transport and Julia compute to support analysis-heavy engineering and research workflows.",
          points: ["repo intelligence", "numerical analysis", "structured reports"],
        },
        {
          title: "Deployment trust",
          body: "Keep sensitive knowledge local or private while integrating with cloud services and model providers where useful.",
          points: ["private data posture", "hybrid services", "model flexibility"],
        },
      ],
    },
    openSource: {
      eyebrow: "Developer entrance",
      title: "A Rust-first monorepo for native agent infrastructure.",
      summary:
        "The open-source surface points engineers into package groups, docs, RFCs, CLI/API surfaces, and the validation culture behind the platform.",
      ctaLabel: "View GitHub",
      ctaTo: "https://github.com/tao3k/xiuxian-artisan-workshop",
      sections: [
        {
          title: "Package boundaries",
          body: "Wendao, Qianji, Qianhuan, Daochang, storage, parser, repo, and Python adapter surfaces stay explicitly owned.",
          points: ["Rust workspace", "package READMEs", "durable RFCs"],
        },
        {
          title: "CLI and APIs",
          body: "Developer entry points include local clients, service APIs, and workflow/runtime surfaces.",
          points: ["Wendao CLI", "Qianji workflow control", "HTTP/gRPC/Flight services"],
        },
        {
          title: "Validation culture",
          body: "The project favors exact contracts, lint gates, audit traces, and scoped verification before promotion.",
          points: ["markdown lint", "ADR audit", "strict Rust gates"],
        },
      ],
    },
    research: {
      eyebrow: "Technical moat",
      title: "Computable graphs, columnar contracts, and verified workflow control.",
      summary:
        "The research surface explains why agent infrastructure needs more than a passive document vault or a prompt orchestration layer.",
      ctaLabel: "Explore platform",
      ctaTo: "/platform",
      sections: [
        {
          title: "From vault to computable graph",
          body: "Wendao treats entities, relations, graph ranking, and vector/search fusion as runtime material for agents.",
          points: ["typed relations", "graph ranking", "retrieval plans"],
        },
        {
          title: "Columnar contracts for agents",
          body: "Apache Arrow and Arrow Flight make structured data exchange a native capability for analysis-heavy agent workflows.",
          points: ["columnar batches", "cross-language transport", "high-throughput APIs"],
        },
        {
          title: "Rust for contracts, Julia for computation",
          body: "Rust owns execution boundaries and verification. Julia extends the platform into numerical and engineering computation.",
          points: ["native contracts", "high-performance kernels", "verified traces"],
        },
      ],
    },
    contact: {
      eyebrow: "Next step",
      title: "Move from interest to a concrete xiuxian adoption path.",
      summary:
        "Choose the conversation shape: customer demo, deployment discovery, API integration, or open-source collaboration. Each path starts from the same governed infrastructure model.",
      ctaLabel: "View GitHub",
      ctaTo: "https://github.com/tao3k/xiuxian-artisan-workshop",
      sections: [
        {
          title: "For customers",
          body: "Start with the deployment and API surface that matches your data boundary and operating model.",
          points: ["local/private/cloud/hybrid", "HTTP/gRPC/Arrow Flight", "model routing"],
        },
        {
          title: "For investors",
          body: "Evaluate the category thesis: governed agent infrastructure with workflow, compute, and proof.",
          points: ["technical moat", "enterprise data gravity", "open-source credibility"],
        },
        {
          title: "For developers",
          body: "Enter through the repository, package ownership, CLI/API surfaces, and validation gates.",
          points: ["Rust-first workspace", "Wendao/Qianji boundaries", "audit-ready docs"],
        },
      ],
    },
  },
};

export const loadSiteModel = Effect.succeed(siteModel);

export function readSiteModel(): SiteModel {
  return Effect.runSync(loadSiteModel);
}

export function readPage(route: RouteId): PageContent {
  return Effect.runSync(Effect.map(loadSiteModel, (model) => model.pages[route]));
}
