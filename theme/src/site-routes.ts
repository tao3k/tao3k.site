export const primarySiteRouteIds = [
  "platform",
  "products",
  "solutions",
  "comparison",
  "principles",
  "roadmap",
] as const;

export const platformDeploymentRouteIds = [
  "platform/on-premises",
  "platform/hybrid",
  "platform/managed-cloud",
] as const;

export const siteRouteIds = [...primarySiteRouteIds, ...platformDeploymentRouteIds] as const;

export type SiteRouteId = (typeof siteRouteIds)[number];

export type SiteRouteDefinition = Readonly<{
  id: SiteRouteId;
  path: `/${SiteRouteId}`;
  label: string;
  kicker: string;
  title: string;
  summary: string;
}>;

export const siteRoutes: readonly SiteRouteDefinition[] = [
  {
    id: "platform",
    path: "/platform",
    label: "Platform",
    kicker: "One governed lifecycle",
    title: "An evidence–action system, not another isolated AI tool.",
    summary:
      "tao3k connects discovery, scientific qualification, human authority, executable composition, runtime and learning evidence through shared interfaces, including an Arrow data plane that spans local and cloud boundaries.",
  },
  {
    id: "products",
    path: "/products",
    label: "Products",
    kicker: "Open-source ecosystem",
    title: "Independent engines with explicit ownership and one evidence contract.",
    summary:
      "Each project owns a clear systems boundary. Xiuxian Workshop gives people a responsible interface to high-performance knowledge and workflow engines without collapsing them into one opaque platform.",
  },
  {
    id: "solutions",
    path: "/solutions",
    label: "Solutions",
    kicker: "Research ↔ operations",
    title: "Carry scientific meaning into operation—and operational evidence back.",
    summary:
      "The handoff from research to industry must retain assumptions, proofs, policy, authority and outcomes. Governed knowledge operations keep retrieval, decisions, execution and returned evidence connected.",
  },
  {
    id: "comparison",
    path: "/comparison",
    label: "Comparison",
    kicker: "Compare system boundaries",
    title: "The important question is what survives the handoff.",
    summary:
      "Feature lists hide architectural boundaries. tao3k is evaluated by whether knowledge, proof, authority, execution and learning evidence remain connected across the complete lifecycle.",
  },
  {
    id: "principles",
    path: "/principles",
    label: "Principles",
    kicker: "Human agency",
    title: "AI should expand human capability, participation and responsibility.",
    summary:
      "tao3k rejects replacement as the only measure of progress. High-risk authority stays explicit, conclusions stay inspectable and technical progress should increase—not narrow—who can participate.",
  },
  {
    id: "roadmap",
    path: "/roadmap",
    label: "Roadmap",
    kicker: "A long-lived systems program",
    title: "Build the evidence economy in dependency-ordered layers.",
    summary:
      "The roadmap is organized by capabilities that must become trustworthy before the next layer can depend on them—not by promotional version numbers or artificial deadlines.",
  },
  {
    id: "platform/on-premises",
    path: "/platform/on-premises",
    label: "On-Premises",
    kicker: "Customer-owned authority boundary",
    title: "Run the qualified system inside infrastructure you control.",
    summary:
      "Data, identity, secrets, hardware policy and operational authority remain inside the customer boundary while tao3k delivers a reproducible system closure and evidence-bearing updates.",
  },
  {
    id: "platform/hybrid",
    path: "/platform/hybrid",
    label: "Hybrid",
    kicker: "Local authority, elastic capability",
    title: "Keep consequential authority local while qualified workloads move.",
    summary:
      "Hybrid deployment separates the authority and sensitive-data plane from qualified compute and coordination surfaces without turning the boundary into an undocumented integration.",
  },
  {
    id: "platform/managed-cloud",
    path: "/platform/managed-cloud",
    label: "Managed Cloud",
    kicker: "Managed operation with explicit evidence",
    title: "Use a managed system without surrendering artifact or decision identity.",
    summary:
      "tao3k manages service operation while tenant, region, model, artifact, policy and receipt identity remain visible and independently qualifiable.",
  },
];

const primarySiteRouteIdSet = new Set<SiteRouteId>(primarySiteRouteIds);

export const siteNavigation = siteRoutes
  .filter(({ id }) => primarySiteRouteIdSet.has(id))
  .map(({ label, path }) => ({
    label,
    href: path,
  }));

export const platformNavigation = [
  {
    label: "Knowledge & evidence",
    href: "/platform#knowledge-evidence",
    detail: "Searchable records, references and qualification context",
  },
  {
    label: "Data plane",
    href: "/platform#data-plane",
    detail: "Apache Arrow interfaces across local and cloud boundaries",
  },
  {
    label: "Control plane",
    href: "/platform#control-plane",
    detail: "Policy, contracts, quality gates and accountable authority",
  },
  {
    label: "Delivery plane",
    href: "/platform#delivery-plane",
    detail: "Reproducible builds, promotion, rollback and receipts",
  },
  {
    label: "Deployments",
    href: "/platform#deployments",
    detail: "Customer-owned, hybrid and managed operating boundaries",
  },
] as const;

export const productNavigation = [
  {
    label: "Xiuxian Artisan Workshop",
    href: "/products#xiuxian-artisan-workshop",
    detail: "Knowledge and workflow engines in one deployable product system",
  },
  {
    label: "Evidence gates",
    href: "/products#xiuxian-artisan-workshop",
    detail: "Evaluation, rollout and operation remain inspectable",
  },
  {
    label: "Open foundations",
    href: "/products#open-foundations",
    detail: "Independent infrastructure with explicit systems boundaries",
  },
] as const;

export const solutionsNavigation = [
  {
    label: "Knowledge operations",
    href: "/solutions#knowledge-operations",
    detail: "Turn diverse records into usable, attributable knowledge",
  },
  {
    label: "Workflow & decisions",
    href: "/solutions#workflow-decision",
    detail: "Make policy, authority and execution boundaries explicit",
  },
  {
    label: "Qualified AI",
    href: "/solutions#qualified-ai",
    detail: "Inspect evidence and constraints before consequential action",
  },
  {
    label: "Deployment scope",
    href: "/solutions#deployment-scope",
    detail: "Operate locally, in cloud environments or across both",
  },
] as const;

export const resolveSiteRoute = (documentId: string): SiteRouteDefinition | null => {
  const normalized = documentId.replace(/^\/+|\/+$/g, "").toLowerCase();
  return siteRoutes.find(({ id }) => id === normalized) ?? null;
};
