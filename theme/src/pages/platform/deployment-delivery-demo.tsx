import { useEffect, useRef, useState } from "react";
import { deploymentPhases } from "./deployment-model";
import { DeploymentWorkbench } from "./deployment-workbench";
import { TechnologyMark } from "./technology-mark";
import "./deployment-delivery-demo.css";

export function DeploymentDeliveryDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [running, setRunning] = useState(() => !reducedMotion);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) {
        activeStepRef.current = deploymentPhases.length - 1;
        setActiveStep(deploymentPhases.length - 1);
        setRunning(false);
      }
    };
    preference.addEventListener("change", synchronize);
    return () => preference.removeEventListener("change", synchronize);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const next = (activeStepRef.current + 1) % deploymentPhases.length;
      activeStepRef.current = next;
      setActiveStep(next);
    }, 1550);
    return () => window.clearInterval(timer);
  }, [running]);

  const reset = () => {
    activeStepRef.current = 0;
    setActiveStep(0);
    if (!reducedMotion) setRunning(true);
  };

  const phase = deploymentPhases[activeStep];

  return (
    <div className="tao3k-delivery-demo" data-phase={phase.id}>
      <header className="tao3k-delivery-demo__header">
        <div className="tao3k-delivery-demo__identity">
          <span className={running ? "is-running" : undefined} aria-hidden="true" />
          <div>
            <strong>LIVE DELIVERY MODEL</strong>
            <small>source identity → qualified fleet</small>
          </div>
          <div
            aria-label="Bazel hermetic build graph and Nix immutable system closure"
            className="tao3k-delivery-demo__toolmarks"
          >
            <TechnologyMark compact id="bazel" />
            <i aria-hidden="true">→</i>
            <TechnologyMark compact id="nixos" />
          </div>
        </div>
        <p>
          <span>{phase.id}</span>
          {String(activeStep + 1).padStart(2, "0")} / 06
        </p>
        <nav aria-label="Delivery model controls">
          <button
            disabled={reducedMotion}
            onClick={() => setRunning((value) => !value)}
            type="button"
          >
            {running ? "Pause" : "Run"}
          </button>
          <button onClick={reset} type="button">
            Reset
          </button>
        </nav>
      </header>

      <DeploymentWorkbench activePhase={phase.id} />
    </div>
  );
}
