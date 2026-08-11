import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import nix from "@shikijs/langs/nix";
import catppuccinMocha from "@shikijs/themes/catppuccin-mocha";
import { useEffect, useState } from "react";
import { deploymentPhases, deploymentPhaseIndex, type DeploymentPhase } from "./deployment-model";
import hivebusCaseSource from "./hivebus-case.nix?raw";

let nixHighlighter: ReturnType<typeof createHighlighterCore> | undefined;
const nixSnippetCache = new Map<DeploymentPhase, string>();

const phaseSource = {
  DECLARE: `hosts = {
  host1.system = "x86_64-linux";
  host2.system = "aarch64-linux";
};`,
  LOAD: `loadedHosts = pops.load.addLoadExtender {
  load = _: ./hosts;
};`,
  COMPOSE: `hivePop =
  ((omnibus.pops.hive.setHosts hosts).addInputs {
    inherit (omnibus.flake.inputs) colmena nixpkgs;
  });`,
  CLOSE: `inherit (hivePop.exports)
  darwinConfigurations
  homeConfigurations
  colmenaHive;`,
  APPLY: `colmenaConfiguration.deployment = {
  allowLocalDeployment = true;
  targetHost = "127.0.0.1";
};`,
  VERIFY: `in {
  inherit hivePop
    darwinConfigurations
    colmenaHive;
}`,
} as const satisfies Record<DeploymentPhase, string>;

const phaseProjection = {
  DECLARE: "2 host records",
  LOAD: "2 typed hosts",
  COMPOSE: "1 composable fleet",
  CLOSE: "4 flake exports",
  APPLY: "3 qualified targets",
  VERIFY: "1 returned receipt",
} as const satisfies Record<DeploymentPhase, string>;

const phaseExplanation = {
  DECLARE: {
    label: "TYPED INVENTORY",
    text: "Architecture and system intent stay attached to each host instead of becoming disconnected deployment variables.",
  },
  LOAD: {
    label: "MODULE EXTENSION",
    text: "Omnibus loads the host set as extensible modules, so a fleet can grow without copying its deployment stack.",
  },
  COMPOSE: {
    label: "PINNED COMPOSITION",
    text: "Hivebus binds hosts and exact flake inputs into one evaluable system identity, not a bag of generated files.",
  },
  CLOSE: {
    label: "ONE SOURCE, FOUR VIEWS",
    text: "The same evaluated closure projects NixOS, Darwin, Home Manager, and Colmena outputs without configuration drift.",
  },
  APPLY: {
    label: "QUALIFIED TARGET",
    text: "Deployment metadata selects an explicit destination while preserving the closure that was built and reviewed.",
  },
  VERIFY: {
    label: "EVIDENCE RETURN",
    text: "The deployed system returns a receipt tied to the same source identity, ready for inspection and requalification.",
  },
} as const satisfies Record<DeploymentPhase, { label: string; text: string }>;

function loadNixHighlighter() {
  nixHighlighter ??= createHighlighterCore({
    langs: [nix],
    themes: [catppuccinMocha],
    engine: createJavaScriptRegexEngine(),
  });
  return nixHighlighter;
}

export type InspectedHost = {
  label: string;
  location: string;
  sourceTarget?: "host1" | "host2" | "composition" | "exports";
} | null;

type DeploymentInspectorProps = {
  activePhase: DeploymentPhase;
  inspectedHost: InspectedHost;
};

export function DeploymentInspector({ activePhase, inspectedHost }: DeploymentInspectorProps) {
  const activeIndex = deploymentPhaseIndex(activePhase);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [snippetHtml, setSnippetHtml] = useState("");
  const [snippetError, setSnippetError] = useState("");
  const [sourceHtml, setSourceHtml] = useState("");
  const [sourceError, setSourceError] = useState("");

  useEffect(() => {
    const cached = nixSnippetCache.get(activePhase);
    if (cached) {
      setSnippetHtml(cached);
      setSnippetError("");
      return;
    }

    let disposed = false;
    setSnippetHtml("");
    setSnippetError("");
    void loadNixHighlighter()
      .then((highlighter) =>
        highlighter.codeToHtml(phaseSource[activePhase], {
          lang: "nix",
          theme: "catppuccin-mocha",
        }),
      )
      .then((html) => {
        nixSnippetCache.set(activePhase, html);
        if (!disposed) setSnippetHtml(html);
      })
      .catch((reason: unknown) => {
        if (!disposed) setSnippetError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => {
      disposed = true;
    };
  }, [activePhase]);

  useEffect(() => {
    if (!sourceOpen || sourceHtml || sourceError) return;
    let disposed = false;
    void loadNixHighlighter()
      .then((highlighter) =>
        highlighter.codeToHtml(hivebusCaseSource, {
          lang: "nix",
          theme: "catppuccin-mocha",
        }),
      )
      .then((html) => {
        if (!disposed) setSourceHtml(html);
      })
      .catch((reason: unknown) => {
        if (!disposed) setSourceError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => {
      disposed = true;
    };
  }, [sourceError, sourceHtml, sourceOpen]);

  useEffect(() => {
    if (!sourceOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setSourceOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape, { capture: true });
    return () => window.removeEventListener("keydown", closeOnEscape, { capture: true });
  }, [sourceOpen]);

  return (
    <aside className="tao3k-deployment-inspector">
      <header>
        <div>
          <span>HIVEBUS CASE</span>
          <small>
            {inspectedHost
              ? `${inspectedHost.label} · ${inspectedHost.location}`
              : "two hosts · four qualified exports"}
          </small>
        </div>
        <button onClick={() => setSourceOpen(true)} type="button">
          View full Nix source ↗
        </button>
      </header>

      <section className="tao3k-deployment-inspector__code" aria-label="Active Nix source">
        <header>
          <span>{activePhase} / NIX SOURCE</span>
          <small>hivebus-case.nix</small>
        </header>
        {snippetHtml ? (
          <div
            className="tao3k-deployment-inspector__snippet"
            dangerouslySetInnerHTML={{ __html: snippetHtml }}
          />
        ) : (
          <p>{snippetError || "Evaluating Nix source…"}</p>
        )}
        <aside className="tao3k-deployment-inspector__code-note">
          <span>{phaseExplanation[activePhase].label}</span>
          <p>{phaseExplanation[activePhase].text}</p>
        </aside>
      </section>

      <div className="tao3k-deployment-inspector__handoff" aria-hidden="true">
        <i />
        <span>NIX EVALUATES TO</span>
        <strong>{phaseProjection[activePhase]}</strong>
        <b>↓</b>
      </div>

      <footer>
        <i aria-hidden="true" />
        <div>
          <span>ACTIVE EVALUATION</span>
          <strong>{activePhase}</strong>
        </div>
        <p>
          <strong>{deploymentPhases[activeIndex].command.replace(/^\[[^\]]+\]\s*/, "")}</strong>
          <small>{deploymentPhases[activeIndex].output}</small>
        </p>
        <small>{String(activeIndex + 1).padStart(2, "0")} / 06</small>
      </footer>

      {sourceOpen ? (
        <dialog
          aria-labelledby="tao3k-nix-source-title"
          aria-modal="true"
          className="tao3k-nix-source-modal"
          onCancel={(event) => {
            event.preventDefault();
            setSourceOpen(false);
          }}
          open
        >
          <section>
            <header>
              <div>
                <span>HIVEBUS / FULL SOURCE</span>
                <h3 id="tao3k-nix-source-title">One declaration, multiple system projections.</h3>
              </div>
              <button autoFocus onClick={() => setSourceOpen(false)} type="button">
                Close
              </button>
            </header>
            <div className="tao3k-nix-source-modal__bar">
              <a href="https://github.com/tao3k/hivebus" rel="noreferrer" target="_blank">
                tao3k/hivebus ↗
              </a>
              <span>hivebus-case.nix</span>
            </div>
            <div className="tao3k-nix-source-modal__body">
              {sourceHtml ? (
                <div
                  className="tao3k-nix-source-modal__highlight"
                  dangerouslySetInnerHTML={{ __html: sourceHtml }}
                />
              ) : (
                <p>{sourceError || "Loading Nix grammar…"}</p>
              )}
            </div>
          </section>
        </dialog>
      ) : null}
    </aside>
  );
}
