export type SiteNavigationItem = {
  readonly label: string;
  readonly to: string;
  readonly descriptor: string;
};

export const siteNavigation = [
  {
    label: "Platform",
    to: "/platform",
    descriptor: "Know, govern, and operate",
  },
  {
    label: "Solution",
    to: "/solutions",
    descriptor: "Research to operations",
  },
  {
    label: "Research",
    to: "/research",
    descriptor: "Field notes and evidence",
  },
  {
    label: "Developers",
    to: "/open-source",
    descriptor: "Protocols, APIs, and GitHub",
  },
] as const satisfies readonly SiteNavigationItem[];

export const sitePrimaryAction = {
  label: "Start with one model",
  to: "/contact",
} as const;
