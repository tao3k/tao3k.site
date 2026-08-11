import { TaoLogo } from "../../src/components/TaoLogo";

import "./site-footer.css";

type FooterLink = Readonly<{
  label: string;
  href: string;
  external?: boolean;
}>;

type FooterGroup = Readonly<{
  label: string;
  links: readonly FooterLink[];
}>;

const footerGroups: readonly FooterGroup[] = [
  {
    label: "Explore",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Products", href: "/products" },
      { label: "Industry systems", href: "/solutions" },
      { label: "Comparison", href: "/comparison" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Principles", href: "/principles" },
      { label: "Roadmap", href: "/roadmap" },
      {
        label: "Contact us",
        href: "https://github.com/tao3k/tao3k.site/issues/new",
        external: true,
      },
      { label: "Field notes", href: "https://github.com/tao3k", external: true },
    ],
  },
  {
    label: "Open source",
    links: [
      { label: "GitHub", href: "https://github.com/tao3k", external: true },
      { label: "Site source", href: "https://github.com/tao3k/tao3k.site", external: true },
      {
        label: "All projects",
        href: "https://github.com/tao3k?tab=repositories",
        external: true,
      },
    ],
  },
] as const;

function FooterLinkItem({ link }: { readonly link: FooterLink }) {
  return (
    <a href={link.href} {...(link.external ? { rel: "noreferrer", target: "_blank" } : {})}>
      {link.label}
      {link.external ? <span aria-hidden="true">↗</span> : null}
    </a>
  );
}

export function Tao3kSiteFooter() {
  return (
    <footer className="tao3k-site-footer" aria-label="Site footer">
      <div className="tao3k-site-footer__layout">
        <nav className="tao3k-site-footer__directory" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <section key={group.label} aria-labelledby={`footer-${group.label.toLowerCase()}`}>
              <h2 id={`footer-${group.label.toLowerCase()}`}>{group.label}</h2>
              <div>
                {group.links.map((link) => (
                  <FooterLinkItem key={link.label} link={link} />
                ))}
              </div>
            </section>
          ))}
        </nav>
      </div>

      <div className="tao3k-site-footer__utility">
        <a className="tao3k-site-footer__brand" href="/" aria-label="tao3k home">
          <TaoLogo compact />
        </a>
        <p className="tao3k-site-footer__copyright">© {new Date().getFullYear()} tao3k</p>
        <a className="tao3k-site-footer__top" href="#top" aria-label="Back to top">
          <span>Back to top</span>
          <b aria-hidden="true">↑</b>
        </a>
      </div>
    </footer>
  );
}
