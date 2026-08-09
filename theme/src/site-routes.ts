export const siteRouteIds = [
  "platform",
  "products",
  "solutions",
  "comparison",
  "principles",
  "roadmap",
] as const;

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
      "tao3k connects discovery, scientific qualification, human authority, executable composition, agent runtime and learning evidence without erasing the meaning carried between them.",
  },
  {
    id: "products",
    path: "/products",
    label: "Products",
    kicker: "Open-source ecosystem",
    title: "Independent engines with explicit ownership and one evidence contract.",
    summary:
      "Each project owns a clear systems boundary. Together they form a lifecycle that can be inspected, replaced and extended without collapsing into one opaque platform.",
  },
  {
    id: "solutions",
    path: "/solutions",
    label: "Solutions",
    kicker: "Research ↔ operations",
    title: "Carry scientific meaning into operation—and operational evidence back.",
    summary:
      "The handoff from research to industry must retain assumptions, proofs, policy, authority and outcomes. Shipping faster is not enough when the handoff destroys trust.",
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
];

export const siteNavigation = siteRoutes.map(({ label, path }) => ({
  label,
  href: path,
}));

export const resolveSiteRoute = (documentId: string): SiteRouteDefinition | null => {
  const normalized = documentId.replace(/^\/+|\/+$/g, "").toLowerCase();
  return siteRoutes.find(({ id }) => id === normalized) ?? null;
};
