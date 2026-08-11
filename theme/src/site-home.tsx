import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { platformNavigation } from "./site-routes";
import "./site-home.css";
import "./site-mobile-fixes.css";
import "./site-polish.css";

type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavigationChild[];
};

type NavigationChild = {
  readonly label: string;
  readonly href: string;
  readonly detail: string;
};

const platformMenuPreviews: Readonly<
  Record<
    string,
    { readonly question: string; readonly stages: readonly string[]; readonly result: string }
  >
> = {
  platform: {
    question: "How does the complete system move?",
    stages: ["Native evidence", "Qualified action", "Searchable receipt"],
    result: "One governed path from knowledge to operation and back.",
  },
  "on-premises": {
    question: "What remains inside your boundary?",
    stages: ["Customer data + identity", "Local policy", "Local runtime"],
    result: "The customer infrastructure remains the operating authority.",
  },
  hybrid: {
    question: "What may cross the boundary?",
    stages: ["Local evidence", "Declared gateway", "Elastic compute", "Receipt return"],
    result: "Capability moves; consequential authority stays local.",
  },
  "managed-cloud": {
    question: "What makes managed operation inspectable?",
    stages: ["Qualified tenant", "Named model + region", "Operation receipt"],
    result: "Evidence remains portable, attributable and usable as an exit path.",
  },
};

const fallbackNavigation: readonly NavigationItem[] = [
  { label: "Platform", href: "/platform", children: platformNavigation },
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
    const rawChildren = (item as { readonly children?: unknown }).children;
    const children = Array.isArray(rawChildren)
      ? rawChildren.flatMap((child): NavigationChild[] => {
          if (!child || typeof child !== "object") return [];
          const childLabel = (child as { readonly label?: unknown }).label;
          const childHref = (child as { readonly href?: unknown }).href;
          const detail = (child as { readonly detail?: unknown }).detail;
          return typeof childLabel === "string" &&
            typeof childHref === "string" &&
            typeof detail === "string"
            ? [{ label: childLabel, href: childHref, detail }]
            : [];
        })
      : undefined;
    return typeof label === "string" && typeof href === "string"
      ? [{ label, href, ...(children && children.length > 0 ? { children } : {}) }]
      : [];
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

function PlatformNavigationMenu({ items }: { readonly items: readonly NavigationChild[] }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeItem = items[activeIndex] ?? items[0];
  const activePreviewId = activeItem?.href.split("/").at(-1) ?? "platform";
  const activePreview = platformMenuPreviews[activePreviewId] ?? platformMenuPreviews.platform;

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof globalThis.Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div
      className={`tao3k-platform-menu${open ? " is-open" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setOpen(false);
      }}
      ref={rootRef}
    >
      <button
        aria-controls="tao3k-platform-navigation"
        aria-expanded={open}
        className="tao3k-platform-menu__trigger"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        type="button"
      >
        Platform <span aria-hidden="true">⌄</span>
      </button>
      <div
        aria-hidden={!open}
        className="tao3k-platform-menu__panel"
        id="tao3k-platform-navigation"
      >
        <div className="tao3k-platform-menu__frame">
          <section className="tao3k-platform-menu__directory">
            <header>
              <small>PLATFORM / DEPLOYMENT SURFACES</small>
              <strong>One qualified system. Choose where its authority lives.</strong>
            </header>
            <nav aria-label="Platform navigation">
              {items.map((item, index) => (
                <a
                  className={activeIndex === index ? "is-active" : undefined}
                  href={item.href}
                  key={item.href}
                  onFocus={() => setActiveIndex(index)}
                  onPointerEnter={() => setActiveIndex(index)}
                  tabIndex={open ? 0 : -1}
                >
                  <span>{String(index).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </nav>
          </section>
          {activeItem ? (
            <aside aria-label={`${activeItem.label} preview`} data-deployment={activePreviewId}>
              <div className="tao3k-platform-menu__authority-map">
                <small>{activePreview.question}</small>
                <ol>
                  {activePreview.stages.map((stage, index) => (
                    <li key={stage}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{stage}</strong>
                    </li>
                  ))}
                </ol>
                <p>{activePreview.result}</p>
              </div>
              <small>QUALIFIED DEPLOYMENT</small>
              <strong>{activeItem.label}</strong>
              <p>{activeItem.detail}</p>
            </aside>
          ) : null}
        </div>
        <footer>
          <span>DEPLOYMENT IS AN AUTHORITY MODEL</span>
          <small>Same reproducible core · independently qualified boundary</small>
        </footer>
      </div>
    </div>
  );
}

export function Tao3kSiteHeader({ shell }: { readonly shell?: unknown }) {
  const navigation = useMemo(() => projectNavigation(shell), [shell]);
  return (
    <header className="tao3k-header">
      <BrandMark />
      <nav className="tao3k-header__nav" aria-label="Primary navigation">
        {navigation.map((item) =>
          item.children ? (
            <PlatformNavigationMenu items={item.children} key={`${item.href}:${item.label}`} />
          ) : (
            <a href={item.href} key={`${item.href}:${item.label}`}>
              {item.label}
            </a>
          ),
        )}
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

const systemBoundaries = [
  {
    layer: "MODELS & CODING AGENTS",
    purpose: "Generate, reason and help complete a task.",
  },
  {
    layer: "CLOUD & MODEL PLATFORMS",
    purpose: "Host, scale and make intelligence available.",
  },
  {
    layer: "TAO3K",
    purpose: "Preserve evidence, qualify action, recover work and return receipts.",
  },
] as const;

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

const liveNodeTypes = { "live-evidence": LiveEvidenceNode };

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

const initialLiveNodes: LiveNode[] = liveStages.map(([index, label, detail], stage) => ({
  id: `live-${index}`,
  type: "live-evidence",
  position: { x: stage * 270, y: stage % 2 === 0 ? 30 : 180 },
  data: { index, label, detail, state: stage === 0 ? "active" : "waiting" },
}));

function LiveEvidenceFlow() {
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState<LiveNode>(initialLiveNodes);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [running, setRunning] = useState(() => !reducedMotion);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) setRunning(false);
    };
    reducedMotion.addEventListener("change", synchronize);
    return () => reducedMotion.removeEventListener("change", synchronize);
  }, []);

  const setStage = useCallback(
    (nextStage: number) => {
      activeStageRef.current = nextStage;
      setActiveStage(nextStage);
      setNodes((current) =>
        current.map((node, stage) => ({
          ...node,
          data: {
            ...node.data,
            state: stage < nextStage ? "complete" : stage === nextStage ? "active" : "waiting",
          },
        })),
      );
    },
    [setNodes],
  );

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage((activeStageRef.current + 1) % liveStages.length);
    }, 1450);
    return () => window.clearInterval(timer);
  }, [running, setStage]);

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
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            disabled={reducedMotion}
            aria-pressed={running}
          >
            {running ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStage(0);
              if (!reducedMotion) setRunning(true);
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
          nodeTypes={liveNodeTypes}
          onNodesChange={onNodesChange}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.45}
          maxZoom={1.5}
          panOnScroll
          zoomOnScroll={false}
          onlyRenderVisibleElements
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(146, 241, 195, 0.16)" gap={28} size={1} />
        </ReactFlow>
      </div>
      <div className="tao3k-live-terminal" aria-live="off">
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
          <p className="tao3k-eyebrow">THE SYSTEM AROUND AI</p>
          <h1>
            Build AI systems
            <span>that can continue.</span>
          </h1>
          <p className="tao3k-home-hero__lede">
            For vertical enterprises, product partners and serious users, tao3k provides the
            evidence, authority, durable state and recovery system around AI.
          </p>
          <p className="tao3k-home-hero__human">
            Use the best models. Keep your own system. tao3k does not replace models, clouds or
            coding agents; it makes their work traceable, qualified, recoverable and reusable.
          </p>
          <div className="tao3k-home-hero__actions">
            <a className="tao3k-button tao3k-button--primary" href="/platform">
              Explore the system <span aria-hidden="true">→</span>
            </a>
            <a className="tao3k-button tao3k-button--quiet" href="/solutions">
              See industry systems
            </a>
          </div>
        </div>
        <AdmissibilityStage />
      </section>

      <section className="tao3k-home-system-boundary" aria-labelledby="system-boundary-title">
        <header>
          <p className="tao3k-section-index">THE DISTINCTION</p>
          <h2 id="system-boundary-title">Not another model, cloud, or chat window.</h2>
          <p>
            Vertical products bring their domain expertise and interfaces. tao3k supplies the system
            layer that lets intelligence survive beyond one session, provider or model cycle.
          </p>
        </header>
        <ol>
          {systemBoundaries.map((item, index) => (
            <li className={index === 2 ? "is-tao3k" : undefined} key={item.layer}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.layer}</strong>
              <p>{item.purpose}</p>
            </li>
          ))}
        </ol>
        <aside>
          <strong>Vertical systems are built on tao3k.</strong>
          <p>
            Clinical conversations, scientific evidence review, industrial intervention and personal
            research are scenarios or partner products—not separate tao3k SaaS claims.
          </p>
        </aside>
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
