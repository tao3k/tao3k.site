import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Tao3kRuntimeState, Tao3kThemeHeader, Tao3kThemeHero, tao3kZhixingTheme } from "./index";

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
          <h2>A theme that belongs to tao3k.site and travels through Zhixing.</h2>
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
