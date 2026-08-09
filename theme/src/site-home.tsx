import { memo, useEffect, useMemo, useState } from "react";
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./site-home.css";
import "./site-mobile-fixes.css";
import "./site-polish.css";

type NavigationItem = {
  readonly label: string;
  readonly href: string;
};

const fallbackNavigation: readonly NavigationItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Comparison", href: "/comparison" },
  { label: "Principles", href: "/principles" },
  { label: "Roadmap", href: "/roadmap" },
];

function projectNavigation(shell: unknown): readonly NavigationItem[] {
  if (!shell || typeof shell !== "object") return fallbackNavigation;
  const site = (shell as { readonly site?: unknown }).site;
  if (!site || typeof site !== "object") return fallbackNavigation;
  const theme = (site as { readonly theme?: unknown }).theme;
  if (!theme || typeof theme !== "object") return fallbackNavigation;
  const config = (theme as { readonly config?: unknown }).config;
  if (!config || typeof config !== "object") return fallbackNavigation;
  const navigation = (config as { readonly navigation?: unknown }).navigation;
  if (!Array.isArray(navigation)) return fallbackNavigation;

  const projected = navigation.flatMap((item): NavigationItem[] => {
    if (!item || typeof item !== "object") return [];
    const label = (item as { readonly label?: unknown }).label;
    const href = (item as { readonly href?: unknown }).href;
    return typeof label === "string" && typeof href === "string" ? [{ label, href }] : [];
  });
  return projected.length > 0 ? projected : fallbackNavigation;
}

function BrandMark() {
  return (
    <a className="tao3k-brand" href="/" aria-label="tao3k home">
      <TaoLogo compact />
      <span className="tao3k-brand__sigil" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="tao3k-brand__name">tao3k</span>
    </a>
  );
}

type ColorMode = "night" | "paper";

function ThemeModeToggle() {
  const [mode, setMode] = useState<ColorMode>("night");

  useEffect(() => {
    const navigation = document.querySelector<HTMLElement>(".theme-variant-navigation");
    if (!navigation) return;

    const synchronize = () => {
      const active = navigation.querySelector<HTMLElement>(
        "[data-theme-variant-option][aria-pressed='true']",
      );
      const value = active?.dataset.themeVariantOption;
      if (value === "night" || value === "paper") setMode(value);
    };

    synchronize();
    const observer = new MutationObserver(synchronize);
    observer.observe(navigation, {
      attributes: true,
      subtree: true,
      attributeFilter: ["aria-pressed"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: ColorMode = mode === "night" ? "paper" : "night";
    document.querySelector<HTMLButtonElement>(`[data-theme-variant-option='${next}']`)?.click();
    setMode(next);
  };

  return (
    <button
      className={`tao3k-mode-toggle is-${mode}`}
      type="button"
      onClick={toggle}
      aria-label={mode === "night" ? "Switch to paper appearance" : "Switch to night appearance"}
      title={mode === "night" ? "Paper appearance" : "Night appearance"}
    >
      <span className="tao3k-mode-toggle__orb" aria-hidden="true" />
    </button>
  );
}

export function Tao3kSiteHeader({ shell }: { readonly shell?: unknown }) {
  const navigation = useMemo(() => projectNavigation(shell), [shell]);
  return (
    <header className="tao3k-header">
      <BrandMark />
      <nav className="tao3k-header__nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a href={item.href} key={`${item.href}:${item.label}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="tao3k-header__actions">
        <ThemeModeToggle />
        <a className="tao3k-header__utility" href="https://github.com/tao3k">
          Open source <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

const evidenceInputs = ["Knowledge", "Code", "Scientific models", "Human records"] as const;

function AdmissibilityStage() {
  return (
    <div className="tao3k-stage" aria-label="Evidence becomes admissible action">
      <div className="tao3k-stage__halo tao3k-stage__halo--outer" />
      <div className="tao3k-stage__halo tao3k-stage__halo--inner" />
      <div className="tao3k-stage__inputs">
        {evidenceInputs.map((input, index) => (
          <div className={`tao3k-stage__input tao3k-stage__input--${index + 1}`} key={input}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {input}
          </div>
        ))}
      </div>
      <div className="tao3k-stage__core">
        <span className="tao3k-stage__core-orbit" aria-hidden="true" />
        <small>QUALIFICATION CORE</small>
        <strong>Evidence</strong>
        <span>owns every transition</span>
      </div>
      <div className="tao3k-stage__output">
        <span>ADMISSIBLE</span>
        <strong>Action</strong>
        <small>searchable · verifiable · evolvable</small>
      </div>
    </div>
  );
}

type LiveNodeData = {
  readonly index: string;
  readonly label: string;
  readonly detail: string;
  readonly state: "waiting" | "active" | "complete";
};

type LiveNode = Node<LiveNodeData, "live-evidence">;

const LiveEvidenceNode = memo(function LiveEvidenceNode({ data }: NodeProps<LiveNode>) {
  return (
    <div className={`tao3k-live-node is-${data.state}`}>
      <Handle type="target" position={Position.Left} />
      <span className="tao3k-live-node__index">{data.index}</span>
      <div>
        <small>{data.state}</small>
        <strong>{data.label}</strong>
        <p>{data.detail}</p>
      </div>
      <i aria-hidden="true" />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const liveStages = [
  ["01", "Record", "provenance attached"],
  ["02", "Retrieve", "owner resolved"],
  ["03", "Qualify", "authority granted"],
  ["04", "Act", "bounded runtime"],
  ["05", "Receipt", "evidence returned"],
] as const;

const terminalLines = [
  "$ tao3k qualify ./cases/research-to-operation.org",
  "[record] source identity + authorship attached",
  "[retrieve] 12 claims resolved to parser-owned evidence",
  "[qualify] policy and proof envelope accepted",
  "[act] bounded operation dispatched",
  "[receipt] evidence://operation/7f3a returned",
] as const;

function LiveEvidenceFlow() {
  const [activeStage, setActiveStage] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) setRunning(false);
    const synchronize = (event: MediaQueryListEvent) => {
      if (event.matches) setRunning(false);
    };
    reducedMotion.addEventListener("change", synchronize);
    return () => reducedMotion.removeEventListener("change", synchronize);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % liveStages.length);
    }, 1450);
    return () => window.clearInterval(timer);
  }, [running]);

  const nodes = useMemo<LiveNode[]>(
    () =>
      liveStages.map(([index, label, detail], stage) => ({
        id: `live-${index}`,
        type: "live-evidence",
        position: { x: stage * 270, y: stage % 2 === 0 ? 30 : 180 },
        data: {
          index,
          label,
          detail,
          state: stage < activeStage ? "complete" : stage === activeStage ? "active" : "waiting",
        },
        draggable: true,
      })),
    [activeStage],
  );

  const edges = useMemo<Edge[]>(
    () =>
      liveStages.slice(0, -1).map((_, stage) => ({
        id: `live-edge-${stage}`,
        source: `live-${liveStages[stage][0]}`,
        target: `live-${liveStages[stage + 1][0]}`,
        type: "smoothstep",
        className:
          stage === activeStage - 1 || (activeStage === 0 && stage === liveStages.length - 2)
            ? "is-active"
            : stage < activeStage
              ? "is-complete"
              : "is-waiting",
      })),
    [activeStage],
  );

  return (
    <section className="tao3k-live" aria-labelledby="live-evidence-title">
      <div className="tao3k-live__heading">
        <div>
          <p className="tao3k-section-index">LIVE / EVIDENCE CIRCUIT</p>
          <h2 id="live-evidence-title">Watch authority move—not disappear.</h2>
        </div>
        <div className="tao3k-live__controls">
          <span>
            <i className={running ? "is-running" : undefined} /> {running ? "RUNNING" : "PAUSED"}
          </span>
          <button type="button" onClick={() => setRunning((value) => !value)}>
            {running ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveStage(0);
              setRunning(true);
            }}
          >
            Replay
          </button>
        </div>
      </div>
      <div className="tao3k-live__surface">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ "live-evidence": LiveEvidenceNode }}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.45}
          maxZoom={1.5}
          panOnScroll
          zoomOnScroll={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(146, 241, 195, 0.16)" gap={28} size={1} />
        </ReactFlow>
      </div>
      <div className="tao3k-live-terminal" aria-live="polite">
        <div className="tao3k-live-terminal__bar">
          <span />
          <span />
          <span />
          <strong>tao3k://qualification-session</strong>
          <i>LIVE</i>
        </div>
        <pre>
          {terminalLines.slice(0, Math.min(activeStage + 2, terminalLines.length)).join("\n")}
        </pre>
        <div className="tao3k-live-terminal__cursor" aria-hidden="true">
          ▋
        </div>
      </div>
    </section>
  );
}

export function Tao3kSiteHome(_props: { readonly title?: string } = {}) {
  return (
    <main className="tao3k-home">
      <section className="tao3k-home-hero">
        <div className="tao3k-home-hero__copy">
          <p className="tao3k-eyebrow">EVIDENCE-NATIVE AI INFRASTRUCTURE</p>
          <h1>
            Intelligence must earn
            <span>the right to act.</span>
          </h1>
          <p className="tao3k-home-hero__lede">
            tao3k turns knowledge, code, scientific models and human records into admissible
            action—and turns every action back into searchable, verifiable and evolvable evidence.
          </p>
          <div className="tao3k-home-hero__actions">
            <a className="tao3k-button tao3k-button--primary" href="/platform">
              Enter the platform <span aria-hidden="true">→</span>
            </a>
            <a className="tao3k-button tao3k-button--quiet" href="/principles">
              Read our principles
            </a>
          </div>
        </div>
        <AdmissibilityStage />
      </section>

      <LiveEvidenceFlow />

      <section className="tao3k-home-thesis" aria-labelledby="home-thesis-title">
        <p className="tao3k-section-index">01 / THE POSITION</p>
        <div>
          <h2 id="home-thesis-title">
            AI should not cross a consequential boundary on confidence alone.
          </h2>
          <p>
            Research, software and operations lose trust at their handoffs. tao3k makes those
            handoffs explicit: claims carry provenance, decisions carry qualification, and execution
            returns evidence.
          </p>
        </div>
        <div className="tao3k-home-thesis__seal" aria-label="Evidence loop">
          <span>CLAIM</span>
          <span>QUALIFY</span>
          <span>ACT</span>
          <span>RETURN</span>
        </div>
      </section>

      <section className="tao3k-home-proof" aria-labelledby="home-proof-title">
        <div className="tao3k-home-proof__heading">
          <p className="tao3k-section-index">02 / THE COMMITMENT</p>
          <h2 id="home-proof-title">A long-lived evidence ecosystem, not an opaque AI moment.</h2>
        </div>
        <div className="tao3k-home-proof__statements">
          <article>
            <span>01</span>
            <h3>Human agency remains sovereign.</h3>
            <p>
              People retain benefit, responsibility, contestability and authority where risk is
              high.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Open source is operating discipline.</h3>
            <p>
              Core reasoning surfaces stay inspectable so trust can be earned, challenged and
              improved.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Every operation improves the record.</h3>
            <p>
              Qualified outcomes become higher-quality information for the next model, team and
              decision.
            </p>
          </article>
        </div>
      </section>

      <section className="tao3k-home-exit">
        <div>
          <p className="tao3k-section-index">EXPLORE THE SYSTEM</p>
          <h2>See how evidence survives the path from research to real operations.</h2>
        </div>
        <a href="/solutions" aria-label="Explore solutions">
          <span>Research → Operations</span>
          <strong aria-hidden="true">↗</strong>
        </a>
      </section>
    </main>
  );
}
import { TaoLogo } from "../../src/components/TaoLogo";
