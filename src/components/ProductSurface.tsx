import type { PlatformModule } from "../content/site";

type ProductSurfaceProps = {
  readonly modules: readonly PlatformModule[];
};

export function ProductSurface({ modules }: ProductSurfaceProps) {
  return (
    <section className="product-surface" aria-labelledby="product-surface-title">
      <div className="product-heading">
        <div>
          <p className="eyebrow">[ products ]</p>
          <h2 id="product-surface-title">Independent infrastructure products.</h2>
        </div>
        <span>knowledge / workflow / context / host / compute / transport</span>
      </div>
      <div className="product-grid">
        {modules.map((module) => (
          <article className={`product-card product-${module.id}`} key={module.id}>
            <ProductPreview id={module.id} />
            <div className="product-copy">
              <span>{module.role}</span>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </div>
            <div className="product-io">
              <div>
                <small>Inputs</small>
                {module.inputs.slice(0, 3).map((input) => (
                  <code key={input}>{input}</code>
                ))}
              </div>
              <div>
                <small>Outputs</small>
                {module.outputs.slice(0, 3).map((output) => (
                  <code key={output}>{output}</code>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductPreview({ id }: { readonly id: string }) {
  return (
    <div className="product-preview" aria-hidden="true">
      <span className="preview-node preview-node-a" />
      <span className="preview-node preview-node-b" />
      <span className="preview-node preview-node-c" />
      <span className="preview-line preview-line-a" />
      <span className="preview-line preview-line-b" />
      <span className="preview-line preview-line-c" />
      <span className="preview-chip preview-chip-a" />
      <span className="preview-chip preview-chip-b" />
      <span className="preview-chip preview-chip-c" />
      <span className={`preview-mark preview-mark-${id}`} />
    </div>
  );
}
