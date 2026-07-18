import { Link as RouterLink } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { RuntimeNodeId, RuntimeTraceLine } from "../content/site";

type RuntimeSurfaceProps = {
  readonly traces: readonly RuntimeTraceLine[];
};

const traceLabels: Record<RuntimeTraceLine["kind"], string> = {
  command: "$",
  ok: "ok",
  trace: "trace",
  proof: "proof",
};

const runtimeNodes: ReadonlyArray<{
  readonly id: RuntimeNodeId;
  readonly name: string;
  readonly role: string;
}> = [
  { id: "wendao", name: "Wendao", role: "knowledge/search" },
  { id: "qianji", name: "Qianji", role: "workflow/control" },
  { id: "qianhuan", name: "Qianhuan", role: "context render" },
  { id: "daochang", name: "Daochang", role: "native host" },
];

const runtimeSignals = [
  { label: "HTTP/gRPC", value: "ready" },
  { label: "Arrow Flight", value: "streaming" },
  { label: "Julia", value: "compute hot" },
  { label: "Audit", value: "verified" },
];

const bottomActions = [
  {
    title: "Explore products",
    body: "See Wendao, Qianji, Qianhuan, Daochang, Arrow Flight, and Julia as one agent lifecycle.",
    cta: "Open products",
    to: "/platform",
  },
  {
    title: "Build with APIs",
    body: "HTTP, gRPC, and Arrow Flight surfaces for high-performance integration with your services.",
    cta: "Inspect APIs",
    to: "/api",
  },
  {
    title: "Plan deployment",
    body: "Local, cloud, and private AI infrastructure paths for models, gateways, and compute.",
    cta: "View deployment",
    to: "/deployment",
  },
] as const;

export function RuntimeSurface({ traces }: RuntimeSurfaceProps) {
  const heroRef = useRef<HTMLElement>(null);
  const pointerFrame = useRef<number | null>(null);
  const [activeTraceIndex, setActiveTraceIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<RuntimeNodeId | null>(null);
  const activeTrace = traces[activeTraceIndex] ?? traces[0];
  const activeNodeId = selectedNode ?? activeTrace?.nodeId ?? "wendao";

  const selectedTraceIndex = useMemo(() => {
    if (!selectedNode) {
      return activeTraceIndex;
    }

    const matchIndex = traces.findIndex((line) => line.nodeId === selectedNode);
    return matchIndex >= 0 ? matchIndex : activeTraceIndex;
  }, [activeTraceIndex, selectedNode, traces]);

  useEffect(() => {
    if (selectedNode) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveTraceIndex((index) => (index + 1) % traces.length);
    }, 1280);

    return () => window.clearInterval(intervalId);
  }, [selectedNode, traces.length]);

  const activateNode = (nodeId: RuntimeNodeId) => {
    setSelectedNode((current) => (current === nodeId ? null : nodeId));
    const matchIndex = traces.findIndex((line) => line.nodeId === nodeId);
    if (matchIndex >= 0) {
      setActiveTraceIndex(matchIndex);
    }
  };

  const updateWaterPointer = useCallback((clientX: number, clientY: number) => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    const rect = hero.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.min(100, Math.max(0, x));
    const clampedY = Math.min(100, Math.max(0, y));

    if (pointerFrame.current !== null) {
      window.cancelAnimationFrame(pointerFrame.current);
    }

    pointerFrame.current = window.requestAnimationFrame(() => {
      hero.style.setProperty("--water-x", `${clampedX.toFixed(2)}%`);
      hero.style.setProperty("--water-y", `${clampedY.toFixed(2)}%`);
      hero.style.setProperty("--water-drift-x", `${((clampedX - 50) * 0.42).toFixed(2)}px`);
      hero.style.setProperty("--water-surface-x", `${((50 - clampedX) * 0.21).toFixed(2)}px`);
      hero.style.setProperty("--water-reflect-x", `${((clampedX - 50) * 0.84).toFixed(2)}px`);
    });
  }, []);

  const resetWaterPointer = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    hero.style.setProperty("--water-x", "52%");
    hero.style.setProperty("--water-y", "46%");
    hero.style.setProperty("--water-drift-x", "0px");
    hero.style.setProperty("--water-surface-x", "0px");
    hero.style.setProperty("--water-reflect-x", "0px");
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(pointerFrame.current);
      }
    };
  }, []);

  return (
    <section
      className="runtime-hero"
      aria-labelledby="home-title"
      onPointerLeave={resetWaterPointer}
      onPointerMove={(event) => updateWaterPointer(event.clientX, event.clientY)}
      ref={heroRef}
    >
      <div className="hero-stage">
        <WaterBackdrop />
        <div className="runtime-grid">
          <div className="hero-copy">
            <p className="eyebrow">tao3k / xiuxian-artisan-workshop</p>
            <h1 id="home-title">The living infrastructure layer for governed AI agents.</h1>
            <p className="hero-summary">
              A Rust-first platform lifecycle for building native agent infrastructure, turning
              computable knowledge into workflow control, and operating AI systems with verifiable
              traces.
            </p>
            <div className="hero-actions">
              <RouterLink className="primary-action" to="/platform">
                Explore platform
              </RouterLink>
              <RouterLink className="secondary-action" to="/api">
                Inspect APIs
              </RouterLink>
            </div>
          </div>

          <div className="runtime-panel" aria-label="Animated runtime trace">
            <div className="panel-head">
              <span>Wendao -&gt; Qianji -&gt; Qianhuan -&gt; Daochang</span>
              <span>knowledge -&gt; workflow -&gt; context -&gt; host</span>
            </div>
            <section className="graph-stage" aria-label="Runtime lifecycle graph">
              <div className="edge edge-a" />
              <div className="edge edge-b" />
              <div className="edge edge-c" />
              {runtimeNodes.map((node) => (
                <button
                  aria-pressed={activeNodeId === node.id}
                  className={`graph-node node-${node.id}`}
                  data-active={activeNodeId === node.id}
                  key={node.id}
                  onClick={() => activateNode(node.id)}
                  type="button"
                >
                  <strong>{node.name}</strong>
                  <span>{node.role}</span>
                </button>
              ))}
            </section>
            <div className="terminal-feed">
              {traces.map((line, index) => (
                <div
                  className={`trace-line trace-${line.kind}`}
                  data-active={selectedTraceIndex === index}
                  data-muted={selectedNode !== null && line.nodeId !== selectedNode}
                  key={`${line.kind}-${line.text}`}
                >
                  <span>{traceLabels[line.kind]}</span>
                  {line.text}
                </div>
              ))}
            </div>
            <div className="signal-strip" aria-label="Runtime signals">
              {runtimeSignals.map((signal) => (
                <div key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <HomeBottomShowcase />
    </section>
  );
}

function HomeBottomShowcase() {
  return (
    <section className="home-bottom-showcase" aria-labelledby="home-bottom-title">
      <div className="showcase-orbit" aria-hidden="true" />
      <div className="showcase-copy">
        <p className="eyebrow">runtime operating fabric</p>
        <h2 id="home-bottom-title">AI-native agent infrastructure, ready for real systems.</h2>
        <p>
          Turn repositories, workflow state, API calls, Arrow Flight streams, and Julia compute into
          governed AI operations that customers can inspect, integrate, and deploy.
        </p>
      </div>

      <div className="showcase-actions">
        {bottomActions.map((action) => (
          <article className="showcase-action" key={action.title}>
            <h3>{action.title}</h3>
            <p>{action.body}</p>
            <RouterLink to={action.to} className="showcase-link">
              {action.cta}
            </RouterLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function WaterBackdrop() {
  return (
    <div className="water-backdrop" aria-hidden="true">
      <div className="water-sky" />
      <div className="water-horizon" />
      <div className="water-surface" />
      <div className="water-reflection" />
      <div className="water-cursor" />
    </div>
  );
}
