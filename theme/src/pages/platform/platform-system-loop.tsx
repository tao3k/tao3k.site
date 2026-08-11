import { useState } from "react";
import { TechnologyMark, technologyIdByEvidence } from "./technology-mark";
import "./platform-system-loop.css";

const platformResponsibilities = [
  {
    id: "evidence",
    label: "Evidence",
    verb: "Preserve",
    problem: "Enterprise knowledge loses source, ownership and change history between tools.",
    responsibility:
      "Preserve source identity, provenance, rights and versioned records before interpretation begins.",
    outcome: "Inspectable evidence",
    evidence: ["Orgize", "Org Zhixing", "ASP"],
  },
  {
    id: "knowledge",
    label: "Knowledge & Data",
    verb: "Understand",
    problem: "Files, tables, code and domain meaning remain disconnected and repeatedly copied.",
    responsibility:
      "Organize semantic knowledge and typed analytical state without erasing the authority of origin.",
    outcome: "Queryable domain context",
    evidence: ["Apache Arrow", "Parquet", "DuckDB"],
  },
  {
    id: "reason",
    label: "Reason & Science",
    verb: "Reason",
    problem: "Model answers hide assumptions, search paths and scientific applicability.",
    responsibility:
      "Combine semantic search, graph reasoning and scientific computation while exposing assumptions and uncertainty.",
    outcome: "Qualified computational evidence",
    evidence: ["GQL", "Ascent", "Julia", "WendaoGraphs.jl"],
  },
  {
    id: "qualify",
    label: "Qualify",
    verb: "Admit",
    problem: "Capability and confidence are mistaken for permission to act.",
    responsibility:
      "Evaluate contracts, proof obligations, policy and accountable human authority before consequential operation.",
    outcome: "Admissible action",
    evidence: ["Lean", "Cedar", "Evidence Contracts"],
  },
  {
    id: "operate",
    label: "Operate",
    verb: "Act",
    problem:
      "Agent execution hides live state, effects, interruption and recovery behind a chat interface.",
    responsibility:
      "Compile explicit organization and checkpoints, enforce admitted work at runtime and return effect receipts.",
    outcome: "Governed runtime receipt",
    evidence: ["POO Flow", "Marlin"],
  },
  {
    id: "deliver",
    label: "Deliver",
    verb: "Reproduce",
    problem:
      "A working prototype cannot be reproduced safely across enterprise authority boundaries.",
    responsibility:
      "Carry one software and system identity through construction, realization, target projection and environment qualification.",
    outcome: "Qualified system deployment",
    evidence: ["Bazel", "Nix", "Omnibus", "Hive"],
  },
] as const;

type ResponsibilityId = (typeof platformResponsibilities)[number]["id"];

export function PlatformSystemLoop() {
  const [activeId, setActiveId] = useState<ResponsibilityId>("evidence");
  const active =
    platformResponsibilities.find((responsibility) => responsibility.id === activeId) ??
    platformResponsibilities[0];

  return (
    <section className="tao3k-platform-system" aria-labelledby="platform-system-title">
      <header>
        <p className="tao3k-route-kicker">ONE SYSTEM / SIX RESPONSIBILITIES</p>
        <h2 id="platform-system-title">Action is only half the loop.</h2>
        <p>
          Evidence moves toward qualified operation. Every outcome returns as material that can be
          searched, inspected, contested and used to requalify what happens next.
        </p>
      </header>

      <div className="tao3k-platform-system__loop" role="tablist" aria-label="Platform system loop">
        {platformResponsibilities.map((responsibility, index) => (
          <button
            aria-controls="platform-responsibility-panel"
            aria-selected={responsibility.id === active.id}
            className={responsibility.id === active.id ? "is-active" : undefined}
            key={responsibility.id}
            onClick={() => setActiveId(responsibility.id)}
            onFocus={() => setActiveId(responsibility.id)}
            role="tab"
            type="button"
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{responsibility.label}</strong>
            <span>{responsibility.verb}</span>
          </button>
        ))}
        <div className="tao3k-platform-system__return" aria-hidden="true">
          RETURN EVIDENCE
        </div>
      </div>

      <article
        className="tao3k-platform-system__detail"
        id="platform-responsibility-panel"
        role="tabpanel"
      >
        <div>
          <small>ENTERPRISE FAILURE</small>
          <p>{active.problem}</p>
        </div>
        <div>
          <small>PLATFORM RESPONSIBILITY</small>
          <h3>{active.responsibility}</h3>
        </div>
        <div className="tao3k-platform-system__evidence">
          <small>IMPLEMENTATION EVIDENCE</small>
          <ul>
            {active.evidence.map((item) => (
              <li key={item}>
                {technologyIdByEvidence[item] ? (
                  <TechnologyMark compact id={technologyIdByEvidence[item]} />
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
          <p>{active.outcome}</p>
        </div>
      </article>
    </section>
  );
}
