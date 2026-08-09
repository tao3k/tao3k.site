import { StrictMode } from "react";
import { createRoot as createReactRoot, type Root } from "react-dom/client";

import { Tao3kRuntimeState, Tao3kThemeHeader, Tao3kThemeHero, tao3kZhixingTheme } from "./index";

declare global {
  interface Window {
    __tao3kThemePreviewRoot?: Root;
  }
}

const createRoot = (container: Parameters<typeof createReactRoot>[0]): Root => {
  const root = window.__tao3kThemePreviewRoot ?? createReactRoot(container);
  window.__tao3kThemePreviewRoot = root;
  return root;
};

const shell = {
  site: { title: "tao3k.site" },
  staticSite: { sources: [{ id: "home" }, { id: "platform" }, { id: "research" }] },
};

function Preview() {
  return (
    <div className="tao3k-zhixing-preview">
      <Tao3kThemeHeader shell={shell} />
      <main>
        <Tao3kThemeHero title="The living infrastructure layer for governed AI agents." />
        <article className="tao3k-zhixing-document">
          <p className="tao3k-zhixing-kicker">DOWNSTREAM CAPABILITY PROOF</p>
          <h2>A governed interface for living agent infrastructure.</h2>
          <p>
            This provider is built in an independent repository. Zhixing owns the protocol,
            isolation boundary, content runtime, and remote loading contract; tao3k.site owns the
            visual system and theme implementation.
          </p>
          <div className="tao3k-zhixing-proof-grid">
            {tao3kZhixingTheme.manifest.capabilities.map((capability) => (
              <section key={capability}>
                <span>0{tao3kZhixingTheme.manifest.capabilities.indexOf(capability) + 1}</span>
                <strong>{capability}</strong>
              </section>
            ))}
          </div>
          <section className="tao3k-zhixing-field-note" aria-labelledby="field-note-title">
            <div>
              <p className="tao3k-zhixing-kicker">FIELD NOTE 01</p>
              <h3 id="field-note-title">Contracts make customization safe.</h3>
            </div>
            <p>
              The remote theme can change typography, composition, and interaction without taking
              ownership of routing, Org identity, attachment resolution, or runtime policy. The
              boundary is enforced before the first component renders.
            </p>
          </section>
        </article>
      </main>
      <Tao3kRuntimeState shell={shell} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
