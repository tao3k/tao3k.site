import bazelMark from "./assets/technology/bazel.svg";
import gerbilMark from "./assets/technology/gerbil.svg";
import juliaMark from "./assets/technology/julia.svg";
import leanMark from "./assets/technology/lean.svg";
import nixosMark from "./assets/technology/nixos.svg";
import pythonMark from "./assets/technology/python.svg";
import rustMark from "./assets/technology/rust.svg";
import "./technology-mark.css";

export type TechnologyId = "bazel" | "julia" | "lean" | "nixos" | "python" | "rust" | "scheme";

const technologies = {
  scheme: {
    label: "Gambit + Gerbil Scheme",
    mark: gerbilMark,
    role: "Composable actor system",
    showLambda: true,
  },
  rust: { label: "Rust", mark: rustMark, role: "Typed systems foundation" },
  julia: { label: "Julia", mark: juliaMark, role: "Scientific graph compute" },
  lean: { label: "Lean", mark: leanMark, role: "Formal qualification" },
  python: { label: "Python", mark: pythonMark, role: "Automation and integration" },
  bazel: { label: "Bazel", mark: bazelMark, role: "Hermetic build graph" },
  nixos: { label: "Nix / NixOS", mark: nixosMark, role: "Immutable system closure" },
} satisfies Record<
  TechnologyId,
  { label: string; mark: string; role: string; showLambda?: boolean }
>;

export const technologyIdByEvidence: Partial<Record<string, TechnologyId>> = {
  Bazel: "bazel",
  Julia: "julia",
  Nix: "nixos",
};

type TechnologyMarkProps = { compact?: boolean; id: TechnologyId; role?: string };

export function TechnologyMark({ compact = false, id, role }: TechnologyMarkProps) {
  const technology = technologies[id];
  return (
    <span
      className={`tao3k-technology-mark${compact ? " tao3k-technology-mark--compact" : ""}`}
      data-technology={id}
    >
      <span className="tao3k-technology-mark__visual" aria-hidden="true">
        {"showLambda" in technology && technology.showLambda && (
          <span className="tao3k-technology-mark__lambda">λ</span>
        )}
        <img alt="" decoding="async" height="52" loading="lazy" src={technology.mark} width="52" />
      </span>
      <span className="tao3k-technology-mark__copy">
        <strong>{technology.label}</strong>
        {!compact && <small>{role ?? technology.role}</small>}
      </span>
    </span>
  );
}

export function TechnologyRail() {
  const technologyOrder: TechnologyId[] = [
    "scheme",
    "rust",
    "julia",
    "lean",
    "python",
    "bazel",
    "nixos",
  ];
  return (
    <section className="tao3k-technology-rail" aria-labelledby="technology-rail-title">
      <header>
        <p className="tao3k-route-kicker">IMPLEMENTATION SURFACES</p>
        <h2 id="technology-rail-title">Use the language that fits the responsibility.</h2>
      </header>
      <div className="tao3k-technology-rail__marks">
        {technologyOrder.map((id) => (
          <TechnologyMark id={id} key={id} />
        ))}
      </div>
    </section>
  );
}
