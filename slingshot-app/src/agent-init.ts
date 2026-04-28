/**
 * Agent initialization — pure Lit/vanilla TS, zero React.
 * Mirrors the pi-web-ui example exactly.
 */
import { Agent } from "@mariozechner/pi-agent-core";
import { getModel } from "@mariozechner/pi-ai";
import {
  ChatPanel,
  AppStorage,
  IndexedDBStorageBackend,
  SettingsStore,
  ProviderKeysStore,
  SessionsStore,
  CustomProvidersStore,
  ApiKeyPromptDialog,
  createJavaScriptReplTool,
  setAppStorage,
} from "@mariozechner/pi-web-ui";
import "@mariozechner/pi-web-ui/app.css";
import { html, render } from "lit";

let initialized = false;
let chatPanel: ChatPanel;

export function showAgent() {
  const container = document.getElementById("agent-container");
  if (container) container.style.display = "block";
}

export function hideAgent() {
  const container = document.getElementById("agent-container");
  if (container) container.style.display = "none";
}

export async function initAgent() {
  if (initialized) return;
  initialized = true;

  const container = document.getElementById("agent-container");
  if (!container) return;

  // Storage — same as pi-web-ui example
  const settings = new SettingsStore();
  const providerKeys = new ProviderKeysStore();
  const sessions = new SessionsStore();
  const customProviders = new CustomProvidersStore();

  const configs = [
    settings.getConfig(),
    SessionsStore.getMetadataConfig(),
    providerKeys.getConfig(),
    customProviders.getConfig(),
    sessions.getConfig(),
  ];

  const backend = new IndexedDBStorageBackend({
    dbName: "slingshot-agent",
    version: 1,
    stores: configs,
  });

  settings.setBackend(backend);
  providerKeys.setBackend(backend);
  customProviders.setBackend(backend);
  sessions.setBackend(backend);

  const storage = new AppStorage(settings, providerKeys, sessions, customProviders, backend);
  setAppStorage(storage);

  // ChatPanel
  chatPanel = new ChatPanel();

  // Agent
  const agent = new Agent({
    initialState: {
      systemPrompt: `You are a helpful AI assistant integrated into Slingshot, a knowledge base and workflow engine.

You have access to these tools:
- JavaScript REPL: Execute JavaScript in a sandboxed browser environment
- Artifacts: Create interactive HTML, SVG, Markdown, and text artifacts

Help users with their questions, create visualizations, process data, and build interactive content.`,
      model: getModel("openrouter", "openai/gpt-4o-mini"),
      thinkingLevel: "off",
      messages: [],
      tools: [],
    },
  });

  await chatPanel.setAgent(agent, {
    onApiKeyRequired: async (provider: string) => {
      return await ApiKeyPromptDialog.prompt(provider);
    },
    toolsFactory: (_agent, _agentInterface, _artifactsPanel, runtimeProvidersFactory) => {
      const replTool = createJavaScriptReplTool();
      replTool.runtimeProvidersFactory = runtimeProvidersFactory;
      return [replTool];
    },
  });

  // Force MessageList to re-render on every agent event.
  // Lit's template binding skips updates when the array reference doesn't change,
  // but the Agent mutates messages in place via .push(). This subscriber
  // works around that by explicitly calling requestUpdate() on the MessageList.
  agent.subscribe(async () => {
    requestAnimationFrame(() => {
      const ml = container.querySelector("message-list");
      if (ml && "requestUpdate" in ml) {
        (ml as any).requestUpdate();
      }
    });
  });

  // Render with Lit's render() — exactly like the example
  render(
    html`
      <div class="w-full h-full flex flex-col overflow-hidden">
        ${chatPanel}
      </div>
    `,
    container,
  );
}
