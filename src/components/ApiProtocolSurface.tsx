import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";

import type { ApiProtocol } from "../content/site";

type ApiProtocolSurfaceProps = {
  readonly protocols: readonly ApiProtocol[];
};

export function ApiProtocolSurface({ protocols }: ApiProtocolSurfaceProps) {
  return (
    <section className="protocol-surface" aria-labelledby="protocol-surface-title">
      <div className="surface-heading">
        <p className="eyebrow">API contract plane</p>
        <h2 id="protocol-surface-title">Three protocol paths, one governed service boundary.</h2>
      </div>
      <Tabs className="protocol-tabs">
        <TabList aria-label="API protocols" className="protocol-tab-list">
          {protocols.map((protocol) => (
            <Tab className="protocol-tab" id={protocol.id} key={protocol.id}>
              <span>{protocol.label}</span>
              <small>{protocol.latency}</small>
            </Tab>
          ))}
        </TabList>
        {protocols.map((protocol) => (
          <TabPanel className="protocol-panel" id={protocol.id} key={protocol.id}>
            <div className="protocol-copy">
              <p className="module-role">{protocol.fit}</p>
              <h3>{protocol.label}</h3>
              <dl className="protocol-facts">
                <div>
                  <dt>Surface</dt>
                  <dd>{protocol.surface}</dd>
                </div>
                <div>
                  <dt>Contract</dt>
                  <dd>{protocol.contract}</dd>
                </div>
              </dl>
            </div>
            <div className="protocol-code">
              <span>call</span>
              <code>{protocol.example}</code>
            </div>
            <div className="protocol-signals">
              {protocol.signals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  );
}
