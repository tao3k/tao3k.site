import { PrinciplesFlow } from "../../principles/principles-flow";
import { TrustKernelFoliage } from "../../visuals/trust-kernel-foliage";
import trustKernelHero from "../../assets/tao3k-trust-kernel-hero-v1.webp";
import "./principles-page.css";
import "./trust-kernel.css";
function TrustKernelScene() {
  return (
    <div className="tao3k-trust-hero__scene" aria-hidden="true">
      <img className="tao3k-trust-hero__plate" src={trustKernelHero} alt="" />
      <TrustKernelFoliage source={trustKernelHero} />
      <span className="tao3k-trust-hero__rail-signal" />
    </div>
  );
}

function TrustKernelHero() {
  return (
    <section className="tao3k-trust-hero" aria-labelledby="trust-kernel-title">
      <TrustKernelScene />
      <div className="tao3k-trust-hero__copy">
        <p className="tao3k-route-kicker">tao3k / PRINCIPLES / POSITION</p>
        <h1 id="trust-kernel-title">Intelligence must earn the right to act.</h1>
        <p>
          Its value is not measured only by how much labor it removes, but by how much human
          capability it compounds. tao3k builds for people to understand, decide, create, and act
          with AI without surrendering evidence or authority.
        </p>
      </div>
      <div className="tao3k-trust-hero__telemetry" aria-label="Human capability commitments">
        <span>
          HUMAN CAPABILITY <b>COMPOUNDS</b>
        </span>
        <span>
          KNOWLEDGE <b>BECOMES AGENCY</b>
        </span>
        <span>
          AUTHORITY <b>REMAINS HUMAN</b>
        </span>
      </div>
    </section>
  );
}

export function PrinciplesPage() {
  return (
    <div className="tao3k-principles-page">
      <TrustKernelHero />
      <PrinciplesFlow />
    </div>
  );
}
