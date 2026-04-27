import { Link as RouterLink } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "react-aria-components";

import { readSiteModel } from "../content/site";
import { TaoLogo } from "./TaoLogo";

type LayoutProps = {
  readonly children: ReactNode;
};

const githubUrl = "https://github.com/tao3k/xiuxian-artisan-workshop";
const docsUrl = `${githubUrl}/tree/main/docs`;

export function Layout({ children }: LayoutProps) {
  const model = readSiteModel();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <RouterLink className="brand-mark" to="/">
          <TaoLogo compact />
        </RouterLink>
        <nav aria-label="Primary navigation" className="site-nav">
          {model.navigation.map((item) => (
            <RouterLink
              activeProps={{ "data-active": "true" }}
              className="nav-link"
              key={item.to}
              to={item.to}
            >
              {item.label}
            </RouterLink>
          ))}
        </nav>
        <Button
          className="github-button"
          onPress={() => {
            window.location.assign(githubUrl);
          }}
        >
          GitHub
        </Button>
      </header>
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <RouterLink className="footer-logo" to="/" aria-label="tao3k xiuxian home">
          <TaoLogo />
        </RouterLink>
        <nav className="footer-socials" aria-label="Project links">
          <a href={githubUrl} aria-label="GitHub repository">
            GH
          </a>
          <RouterLink to="/api" aria-label="API surface">
            API
          </RouterLink>
          <RouterLink to="/deployment" aria-label="Deployment">
            DEP
          </RouterLink>
          <RouterLink to="/contact" aria-label="Contact">
            HI
          </RouterLink>
        </nav>
      </div>

      <nav className="footer-map" aria-label="Footer navigation">
        <div className="footer-column">
          <h2>Product</h2>
          <RouterLink to="/platform">Overview</RouterLink>
          <RouterLink to="/api">API</RouterLink>
          <RouterLink to="/deployment">Deployment</RouterLink>
          <RouterLink to="/enterprise">Enterprise</RouterLink>
          <RouterLink to="/research">Research</RouterLink>
        </div>
        <div className="footer-column">
          <h2>Solutions</h2>
          <RouterLink to="/platform">Agent lifecycle</RouterLink>
          <RouterLink to="/api">HTTP / gRPC</RouterLink>
          <RouterLink to="/deployment">AI infrastructure</RouterLink>
          <RouterLink to="/research">Julia compute</RouterLink>
        </div>
        <div className="footer-column">
          <h2>Resources</h2>
          <a href={docsUrl}>Documentation</a>
          <a href={githubUrl}>GitHub repository</a>
          <RouterLink to="/open-source">Open source</RouterLink>
          <RouterLink to="/contact">Commercial brief</RouterLink>
        </div>
        <div className="footer-column">
          <h2>Company</h2>
          <RouterLink to="/enterprise">For business</RouterLink>
          <RouterLink to="/research">Research moat</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
      </nav>
    </footer>
  );
}
