import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Search,
  GitBranch,
  FileText,
  Brain,
  Layers,
  ChevronRight,
  Database,
  Cpu,
  Workflow,
} from "lucide-react";

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border-main)] bg-[rgba(255,255,255,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-btn-black)] text-sm font-bold text-white">
            S
          </div>
          <span className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Slingshot
          </span>
        </div>

        <div className="hidden items-center gap-10 md:flex" style={{ fontFamily: "var(--font-body)" }}>
          <a href="#features" className="text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]">How It Works</a>
          <a href="#engines" className="text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]">Technology</a>
        </div>

        <div className="flex items-center gap-3" style={{ fontFamily: "var(--font-body)" }}>
          <button className="hidden rounded-xl px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] sm:block">
            Sign In
          </button>
          <button className="rounded-xl bg-[var(--color-btn-black)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pb-24 pt-24 md:pb-32 md:pt-32">
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,129,242,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-dark)] bg-[var(--color-bg-surface)] px-4 py-2 text-sm text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-body)" }}>
          <Zap className="h-4 w-4 text-[var(--color-accent)]" />
          Knowledge meets execution
        </div>

        {/* Headline */}
        <h1
          className="text-5xl leading-tight tracking-tight text-[var(--color-text-primary)] md:text-7xl md:leading-[1.1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your knowledge.{" "}
          <br className="hidden md:block" />
          Your workflows.{" "}
          <br className="hidden md:block" />
          <span className="italic text-[var(--color-accent)]">One engine.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-tertiary)] md:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Slingshot combines an intelligent knowledge base with a high-performance workflow engine.
          Define workflows in markdown. Execute them against your data.
          Powered by a proprietary RAG engine.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ fontFamily: "var(--font-body)" }}>
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--color-btn-black)] px-8 py-4 text-base font-medium text-white transition-all hover:opacity-90"
          >
            Try the Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border-dark)] px-8 py-4 text-base font-medium text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-fill-main)]">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Product preview */}
      <div className="mx-auto mt-20 max-w-5xl px-8">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-dark)] bg-[var(--color-bg-surface)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
          {/* Mock browser chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border-main)] px-5 py-3.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 rounded-lg bg-[var(--color-fill-main)] px-4 py-1.5 text-center text-xs text-[var(--color-text-disabled)]">
              app.slingshot.dev
            </div>
          </div>
          {/* Mock app content */}
          <div className="flex" style={{ height: "26rem" }}>
            {/* Sidebar */}
            <div className="flex w-16 shrink-0 flex-col items-center gap-3 border-r border-[var(--color-border-main)] bg-[var(--color-bg-surface)] py-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-btn-black)] text-xs font-bold text-white">S</div>
              <div className="mt-4 rounded-lg bg-[var(--color-btn-black)] p-2 text-white"><GitBranch className="h-4 w-4" /></div>
              <div className="rounded-lg p-2 text-[var(--color-text-disabled)]"><FileText className="h-4 w-4" /></div>
            </div>
            {/* Main content mock */}
            <div className="flex-1 bg-[var(--color-bg-main)] p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-6 w-32 rounded bg-[var(--color-fill-dark)]" />
                <div className="h-8 w-28 rounded-lg bg-[var(--color-btn-black)]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Daily Report", status: "idle" },
                  { name: "Email Triage", status: "running" },
                  { name: "Research Agent", status: "error" },
                ].map((wf) => (
                  <div key={wf.name} className="rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${wf.status === "running" ? "bg-[var(--color-fn-success)]" : wf.status === "error" ? "bg-[var(--color-fn-error)]" : "bg-[var(--color-text-disabled)]"}`} />
                      <span className="text-xs text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>{wf.status === "running" ? "Running" : wf.status === "error" ? "Error" : "Idle"}</span>
                    </div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>{wf.name}</div>
                    <div className="mt-1 h-3 w-4/5 rounded bg-[var(--color-fill-light)]" />
                    <div className="mt-5 flex gap-2">
                      <div className="h-8 flex-1 rounded-lg bg-[var(--color-btn-black)]" />
                      <div className="h-8 flex-1 rounded-lg border border-[var(--color-border-dark)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPoints() {
  const points = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Knowledge scattered everywhere",
      desc: "Your docs, notes, and data live in 10 different tools. Finding the right context when you need it is a daily struggle.",
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Workflows that don't actually work",
      desc: "Visual builders look pretty but choke on real complexity. Branching, loops, human-in-the-loop? Good luck.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI without your context",
      desc: "Generic AI tools don't know your data. You waste time copy-pasting context into every prompt.",
    },
  ];

  return (
    <section className="border-t border-[var(--color-border-main)] bg-[var(--color-bg-surface)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
          The problem
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-3xl leading-snug text-[var(--color-text-primary)] md:text-5xl md:leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your tools don't talk to each other.{" "}
          <span className="italic text-[var(--color-text-tertiary)]">Your AI doesn't know your data.</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-main)] p-8">
              <div className="mb-5 inline-flex rounded-xl bg-[var(--color-fill-main)] p-3 text-[var(--color-text-primary)]">
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engines() {
  return (
    <section id="engines" className="border-t border-[var(--color-border-main)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
          The technology
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-3xl leading-snug text-[var(--color-text-primary)] md:text-5xl md:leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Two engines.{" "}
          <span className="italic text-[var(--color-text-tertiary)]">Zero compromise.</span>
        </h2>

        {/* RAG Engine */}
        <div className="mt-20 grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-light)] px-3 py-1 text-sm font-medium text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
              <Search className="h-3.5 w-3.5" />
              RAG Engine
            </div>
            <h3
              className="text-3xl leading-snug text-[var(--color-text-primary)] md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your knowledge,{" "}
              <span className="italic">instantly queryable</span>
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
              Upload docs, PDFs, notes, spreadsheets — anything. Our proprietary retrieval engine indexes everything
              and makes it available to your workflows in milliseconds. Not keyword search. Semantic understanding.
            </p>
            <ul className="mt-6 space-y-3" style={{ fontFamily: "var(--font-body)" }}>
              {["Semantic search across all file types", "Automatic chunking and embedding", "Sub-100ms retrieval at any scale", "Context-aware ranking"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RAG Visual */}
          <div className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-8">
            <div className="space-y-3">
              {/* Search bar mock */}
              <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-bg-main)] px-4 py-3">
                <Search className="h-4 w-4 text-[var(--color-text-disabled)]" />
                <span className="text-sm text-[var(--color-text-disabled)]" style={{ fontFamily: "var(--font-body)" }}>
                  What were last quarter's revenue drivers?
                </span>
              </div>
              {/* Results */}
              {[
                { file: "Q3 Financial Report.pdf", score: "0.94", snippet: "Revenue increased 23% YoY driven by..." },
                { file: "Board Meeting Notes.md", score: "0.87", snippet: "Key growth drivers identified: enterprise..." },
                { file: "Market Analysis.md", score: "0.82", snippet: "Competitive landscape shifted toward..." },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl bg-[var(--color-bg-main)] p-4 transition-colors hover:bg-[var(--color-fill-main)]">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-text-tertiary)]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>{r.file}</span>
                      <span className="shrink-0 rounded bg-[var(--color-fn-success-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-fn-success)]" style={{ fontFamily: "var(--font-body)" }}>{r.score}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>{r.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graph Engine */}
        <div className="mt-32 grid items-center gap-16 md:grid-cols-2">
          {/* Graph Visual */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-8">
              {/* Mini graph */}
              <div className="flex flex-col items-center gap-0">
                {["Fetch Data", "Analyze", "Decide", "Execute"].map((step, i) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`flex w-48 items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-medium ${
                      i < 2
                        ? "border-[var(--color-fn-success)] bg-[var(--color-fn-success-bg)] text-[var(--color-fn-success)]"
                        : i === 2
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                        : "border-[var(--color-border-main)] text-[var(--color-text-disabled)]"
                    }`} style={{ fontFamily: "var(--font-body)" }}>
                      {i < 2 && "✓ "}{step}
                    </div>
                    {i < 3 && (
                      <div className="h-8 w-px bg-[var(--color-border-dark)]" />
                    )}
                  </div>
                ))}
              </div>
              {/* Performance bar */}
              <div className="mt-8 rounded-xl bg-[var(--color-bg-main)] p-4">
                <div className="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
                  <span>Execution time</span>
                  <span className="font-medium text-[var(--color-fn-success)]">1.2s</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-fill-main)]">
                  <div className="h-full w-3/4 rounded-full bg-[var(--color-fn-success)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-fill-main)] px-3 py-1 text-sm font-medium text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
              <Cpu className="h-3.5 w-3.5" />
              Graph Execution Engine
            </div>
            <h3
              className="text-3xl leading-snug text-[var(--color-text-primary)] md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Workflows that{" "}
              <span className="italic">actually execute</span>
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
              Not a visual builder that generates API calls. A real graph execution engine
              that handles branching, parallelism, loops, and human-in-the-loop — all at speed.
              Define in markdown, transpile to a DAG, execute with full observability.
            </p>
            <ul className="mt-6 space-y-3" style={{ fontFamily: "var(--font-body)" }}>
              {["Parallel step execution", "Conditional branching and loops", "Human-in-the-loop decision points", "Real-time execution monitoring"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-text-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Write in markdown",
      desc: "Define your workflow steps, tools, and logic in plain markdown. No drag-and-drop. No visual clutter. Just write what you want to happen.",
      icon: <FileText className="h-7 w-7" />,
    },
    {
      num: "02",
      title: "Graph transpiles instantly",
      desc: "Your markdown is parsed into an execution DAG in real-time. See the graph form as you type. Branch, loop, and parallelize with simple syntax.",
      icon: <GitBranch className="h-7 w-7" />,
    },
    {
      num: "03",
      title: "Execute with full observability",
      desc: "Watch your workflow run step-by-step. See the agent's thinking, tool calls, and results. Intervene when the agent needs a decision.",
      icon: <Zap className="h-7 w-7" />,
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-[var(--color-border-main)] bg-[var(--color-bg-surface)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
          How it works
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-3xl leading-snug text-[var(--color-text-primary)] md:text-5xl md:leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          From idea to execution{" "}
          <span className="italic text-[var(--color-text-tertiary)]">in minutes</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="relative rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-main)] p-8">
              <span className="text-5xl font-bold text-[var(--color-fill-dark)]" style={{ fontFamily: "var(--font-display)" }}>
                {s.num}
              </span>
              <div className="mt-6 mb-4 inline-flex rounded-xl bg-[var(--color-bg-surface)] p-3 text-[var(--color-text-primary)] shadow-[0_1px_3px_var(--color-shadow-xs)]">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section id="features" className="border-t border-[var(--color-border-main)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
          Why Slingshot
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-3xl leading-snug text-[var(--color-text-primary)] md:text-5xl md:leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stop duct-taping tools together
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-body)" }}>
          Others give you pieces. Slingshot gives you the whole picture.
        </p>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)]" style={{ fontFamily: "var(--font-body)" }}>
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[var(--color-border-main)] bg-[var(--color-bg-main)]">
            <div className="p-5 text-sm font-medium text-[var(--color-text-tertiary)]" />
            <div className="p-5 text-center text-sm font-medium text-[var(--color-text-tertiary)]">Others</div>
            <div className="p-5 text-center text-sm font-semibold text-[var(--color-text-primary)]">Slingshot</div>
          </div>
          {/* Rows */}
          {[
            { feature: "Knowledge Base", others: "File storage", slingshot: "RAG-powered retrieval" },
            { feature: "Workflows", others: "Visual drag-and-drop", slingshot: "Markdown → DAG execution" },
            { feature: "AI Context", others: "Generic, no memory", slingshot: "Grounded in your data" },
            { feature: "Execution", others: "API chaining", slingshot: "Graph engine with parallelism" },
            { feature: "Observability", others: "Logs", slingshot: "Real-time agent activity stream" },
          ].map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 ${i < 4 ? "border-b border-[var(--color-border-main)]" : ""}`}>
              <div className="p-5 text-sm font-medium text-[var(--color-text-primary)]">{row.feature}</div>
              <div className="p-5 text-center text-sm text-[var(--color-text-disabled)]">{row.others}</div>
              <div className="p-5 text-center text-sm font-medium text-[var(--color-accent)]">{row.slingshot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="border-t border-[var(--color-border-main)] bg-[var(--color-btn-black)] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-8 text-center">
        <h2
          className="text-3xl leading-snug text-white md:text-5xl md:leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to stop{" "}
          <span className="italic text-[var(--color-accent)]">searching</span>{" "}
          and start{" "}
          <span className="italic text-[var(--color-accent)]">executing</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.5)]" style={{ fontFamily: "var(--font-body)" }}>
          Bring your knowledge and workflows together in one place.
          Start building with Slingshot today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ fontFamily: "var(--font-body)" }}>
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-medium text-[var(--color-btn-black)] transition-all hover:opacity-90"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.2)] px-8 py-4 text-base font-medium text-[rgba(255,255,255,0.7)] transition-all hover:border-[rgba(255,255,255,0.4)] hover:text-white">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-main)] bg-[var(--color-bg-surface)] py-12" style={{ fontFamily: "var(--font-body)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-btn-black)] text-xs font-bold text-white">
            S
          </div>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Slingshot</span>
        </div>

        <div className="flex items-center gap-8 text-sm text-[var(--color-text-tertiary)]">
          <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">Privacy</a>
          <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">Terms</a>
          <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">GitHub</a>
          <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">Twitter</a>
        </div>

        <p className="text-sm text-[var(--color-text-disabled)]">
          &copy; 2026 Slingshot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-main)]">
      <NavBar />
      <Hero />
      <PainPoints />
      <Engines />
      <HowItWorks />
      <Comparison />
      <FinalCTA />
      <Footer />
    </div>
  );
}
