import { useEffect } from "react";
import { initAgent, showAgent, hideAgent } from "../agent-init";

export default function AgentChat() {
  useEffect(() => {
    initAgent();
    showAgent();
    return () => hideAgent();
  }, []);

  return null;
}
