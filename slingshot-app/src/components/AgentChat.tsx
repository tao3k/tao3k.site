import { useEffect, useRef } from "react";
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

// Module-level singletons — survive React re-renders and route changes
let storageInitialized = false;
let chatPanelSingleton: ChatPanel | null = null;
let agentInitialized = false;

function initStorage() {
  if (storageInitialized) return;

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
  storageInitialized = true;
}

function getChatPanel(): ChatPanel {
  if (!chatPanelSingleton) {
    chatPanelSingleton = new ChatPanel();
  }
  return chatPanelSingleton;
}

async function initAgent(chatPanel: ChatPanel) {
  if (agentInitialized) return;
  agentInitialized = true;

  const agent = new Agent({
    initialState: {
      systemPrompt: `You are a helpful AI assistant integrated into Slingshot, a knowledge base and workflow engine.

You have access to these tools:
- JavaScript REPL: Execute JavaScript in a sandboxed browser environment
- Artifacts: Create interactive HTML, SVG, Markdown, and text artifacts

Help users with their questions, create visualizations, process data, and build interactive content.`,
      model: getModel("anthropic", "claude-sonnet-4-5-20250929"),
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
}

export default function AgentChat() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    initStorage();

    const chatPanel = getChatPanel();

    // Re-attach the singleton to this container (handles re-mounts)
    if (chatPanel.parentElement !== container) {
      container.appendChild(chatPanel);
    }

    initAgent(chatPanel);

    // On unmount, detach but do NOT destroy the singleton
    return () => {
      if (chatPanel.parentElement === container) {
        container.removeChild(chatPanel);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full"
    />
  );
}
