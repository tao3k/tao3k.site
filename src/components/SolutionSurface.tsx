import { Link as RouterLink } from "@tanstack/react-router";

import { evidenceStages, referenceScenario } from "../content/positioning";

export function SolutionSurface() {
  return (
    <article className="tao-solution-page">
      <header className="tao-solution-hero">
        <div>
          <p className="tao-kicker">Research-to-Operations / Reference Solution</p>
          <h1>{referenceScenario.title}</h1>
        </div>
        <div className="tao-solution-intro">
          <p>{referenceScenario.summary}</p>
          <p>
            This is an illustrative reference architecture, not a customer result. A production
            pilot selects the model, operating boundary, authority policy, and measurable outcome
            with the design partner.
          </p>
          <RouterLink className="tao-action tao-action-primary" to="/contact">
            Start with one model
          </RouterLink>
        </div>
      </header>

      <section className="tao-solution-context" aria-labelledby="solution-context-title">
        <div>
          <p className="tao-kicker">The starting point</p>
          <h2 id="solution-context-title">
            Research value exists. Operational authority does not.
          </h2>
        </div>
        <p>{referenceScenario.context}</p>
      </section>

      <section className="tao-solution-compare" aria-label="Before and after tao3k">
        <article>
          <span>Before tao3k</span>
          <ul>
            {referenceScenario.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>With tao3k</span>
          <ul>
            {referenceScenario.after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="tao-solution-chain" aria-labelledby="solution-chain-title">
        <div className="tao-section-heading tao-section-heading-inline">
          <div>
            <p className="tao-kicker">The evidence chain</p>
            <h2 id="solution-chain-title">Every transition earns the right to continue.</h2>
          </div>
          <p>
            The model does not jump from a notebook into production. Each stage produces a durable
            fact that the next stage can validate, reject, or replay.
          </p>
        </div>
        <ol>
          {evidenceStages.map((stage) => (
            <li key={stage.id}>
              <div className="tao-solution-step-index">
                <span>{stage.step}</span>
                <strong>{stage.label}</strong>
              </div>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.summary}</p>
              </div>
              <dl>
                <div>
                  <dt>Owner</dt>
                  <dd>{stage.owner}</dd>
                </div>
                <div>
                  <dt>State</dt>
                  <dd>{stage.status}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="tao-solution-authority" aria-labelledby="solution-authority-title">
        <div>
          <p className="tao-kicker">Human authority</p>
          <h2 id="solution-authority-title">The operator is part of the execution model.</h2>
          <p>
            Approval is not a decorative pause. Identity, scope, decision, adjustment, rejection,
            and reasoning become first-class workflow evidence.
          </p>
        </div>
        <div className="tao-solution-recommendation">
          <header>
            <span>Illustrative recommendation</span>
            <strong>{referenceScenario.recommendation.title}</strong>
          </header>
          <dl>
            <div>
              <dt>Objective</dt>
              <dd>{referenceScenario.recommendation.objective}</dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>{referenceScenario.recommendation.mode}</dd>
            </div>
            <div>
              <dt>Required authority</dt>
              <dd>{referenceScenario.recommendation.authority}</dd>
            </div>
          </dl>
          <div className="tao-solution-decision-row" aria-hidden="true">
            <span>Approve</span>
            <span>Adjust</span>
            <span>Reject</span>
          </div>
        </div>
      </section>

      <section className="tao-solution-measures" aria-labelledby="solution-measures-title">
        <div>
          <p className="tao-kicker">Pilot evidence</p>
          <h2 id="solution-measures-title">
            Measure the system, the people, and the domain result.
          </h2>
        </div>
        <ol>
          {referenceScenario.successMeasures.map((measure, index) => (
            <li key={measure}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{measure}</strong>
            </li>
          ))}
        </ol>
      </section>

      <footer className="tao-solution-footer">
        <p className="tao-kicker">The first engagement</p>
        <h2>One model. One workflow. One jointly defined outcome.</h2>
        <p>
          The goal of the first pilot is not broad automation. It is to prove that a valuable model
          can cross into operations without losing provenance, authority, or recoverability.
        </p>
        <div>
          <RouterLink className="tao-action tao-action-primary" to="/contact">
            Start with one model
          </RouterLink>
          <RouterLink className="tao-action tao-action-secondary" to="/platform">
            Explore the platform
          </RouterLink>
        </div>
      </footer>
    </article>
  );
}
