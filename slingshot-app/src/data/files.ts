export type FileType = "folder" | "markdown" | "pdf" | "image" | "spreadsheet";

export interface KBFile {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  modified: string;
  children?: KBFile[];
  content?: string;
}

export const files: KBFile[] = [
  {
    id: "folder-research",
    name: "Research",
    type: "folder",
    modified: "Apr 25, 2026",
    children: [
      {
        id: "file-ai-papers",
        name: "AI Papers.md",
        type: "markdown",
        size: "8 KB",
        modified: "Apr 24, 2026",
        content: `# AI Papers

## Transformer Architectures in 2026

Recent advances in transformer-based models have shifted the focus from scaling parameter counts to improving inference efficiency. Mixture-of-experts architectures now dominate the leaderboard, achieving comparable accuracy to dense models at a fraction of the compute cost. Several papers from ICML 2026 demonstrate that sparse routing can reduce FLOPs by 60% without measurable degradation on standard benchmarks.

## Agentic Systems and Tool Use

A growing body of work explores how language models can reliably plan and execute multi-step tasks by invoking external tools. The key challenge remains error recovery: when a tool call fails or returns unexpected data, current systems often lack the ability to re-plan gracefully. Two promising directions include hierarchical planning with verification checkpoints and learned retry policies that adapt based on failure type.

## Retrieval-Augmented Generation

RAG continues to evolve beyond simple vector-store lookup. Hybrid retrieval methods that combine dense embeddings with BM25 sparse retrieval consistently outperform either approach in isolation. The latest work introduces "adaptive chunking," which dynamically adjusts document segmentation based on query complexity, leading to a 15% improvement in answer accuracy on long-form QA tasks.`,
      },
      {
        id: "file-market-analysis",
        name: "Market Analysis.md",
        type: "markdown",
        size: "15 KB",
        modified: "Apr 22, 2026",
        content: `# Market Analysis — AI Agent Platforms

## Executive Summary

The AI agent platform market is projected to reach $14.2B by 2028, growing at a CAGR of 34%. Enterprise adoption accelerated sharply in Q1 2026, driven by mature tool-calling APIs and improved reliability guarantees. The competitive landscape has consolidated around three tiers: hyperscaler offerings (Azure AI Agent Service, Google Vertex Agents), pure-play startups (LangChain, CrewAI, Slingshot), and vertical-specific solutions in healthcare, legal, and finance.

## Key Trends

Developer experience is the primary differentiator for mid-market adoption. Platforms that offer visual workflow builders alongside code-first SDKs capture the broadest user base. Pricing models are shifting from per-token to per-task billing, which better aligns vendor revenue with customer value. Security and auditability have moved from "nice to have" to hard requirements, with SOC 2 Type II and HIPAA compliance now table stakes for enterprise deals.

## Competitive Positioning

Slingshot's strength lies in its human-in-the-loop execution model, which addresses the trust gap that blocks enterprise deployment of fully autonomous agents. Our workflow-first approach lets non-technical users define agent behavior while still giving developers full control over tool integrations and error handling. The primary risk is execution speed — fully autonomous competitors can complete tasks 3-5x faster when human review is not required.`,
      },
      {
        id: "file-competitor-notes",
        name: "Competitor Notes.md",
        type: "markdown",
        size: "6 KB",
        modified: "Apr 20, 2026",
        content: `# Competitor Notes

## LangChain / LangGraph

LangGraph has become the de facto open-source framework for building stateful, multi-actor agent applications. Their managed cloud service (LangSmith) adds observability and evaluation. Key weakness: steep learning curve for non-developers, limited built-in UI components.

## CrewAI

Focused on multi-agent collaboration with role-based delegation. Strong community adoption for prototyping but struggles with production reliability at scale. Their recent Series B gives them runway to address infrastructure gaps.

## Microsoft AutoGen

Backed by Microsoft Research, AutoGen emphasizes conversational multi-agent patterns. Deep integration with Azure services is an advantage for enterprises already in the Microsoft ecosystem but creates vendor lock-in concerns for others.`,
      },
    ],
  },
  {
    id: "folder-meeting-notes",
    name: "Meeting Notes",
    type: "folder",
    modified: "Apr 26, 2026",
    children: [
      {
        id: "file-sprint-review",
        name: "Sprint Review.md",
        type: "markdown",
        size: "4 KB",
        modified: "Apr 26, 2026",
        content: `# Sprint Review — Week of Apr 21

## Completed

The team shipped the workflow editor redesign, which now supports drag-and-drop step reordering and inline tool configuration. Backend latency for workflow execution improved by 22% after switching to streaming responses for long-running tool calls. The knowledge base file upload endpoint was hardened with virus scanning and file-type validation.

## In Progress

The execution graph visualization is functional but needs polish — node animations stutter on graphs with more than 20 nodes. OAuth integration for Gmail and Slack tools is blocked on security review. Mobile-responsive layout for the dashboard is 60% complete.

## Action Items

- Alex: file a ticket for graph rendering performance
- Maria: follow up with security on OAuth scope review
- Team: prioritize mobile layout for next sprint`,
      },
      {
        id: "file-team-standup",
        name: "Team Standup.md",
        type: "markdown",
        size: "2 KB",
        modified: "Apr 27, 2026",
        content: `# Team Standup — Apr 27, 2026

## Updates

**Alex**: Wrapping up the execution log panel. Tool call entries now render with syntax-highlighted params. Will start on the user-input step UI tomorrow.

**Maria**: OAuth flow for Gmail is approved by security. Starting integration tests today. Slack OAuth still pending — security wants a narrower scope than what the Slack API requires.

**Jordan**: Fixed a race condition in the workflow runner where parallel tool calls could deadlock. Added regression tests. Picking up the mobile dashboard layout next.`,
      },
      {
        id: "file-q2-planning",
        name: "Q2 Planning.md",
        type: "markdown",
        size: "12 KB",
        modified: "Apr 18, 2026",
        content: `# Q2 2026 Planning

## Objectives

1. **Launch public beta** — Open the platform to early-access users by May 15. Target 200 active beta testers by end of June.
2. **Enterprise pilot** — Close 3 paid pilot agreements with companies in the 500-2000 employee range. Focus on teams that currently use Zapier or Make for workflow automation.
3. **Platform reliability** — Achieve 99.9% uptime for the workflow execution engine. Implement automatic retry with exponential backoff for transient tool failures.

## Key Results

- Ship the knowledge base v2 with folder management, search, and file previews.
- Add support for at least 8 new tool integrations (Gmail, Slack, Notion, Jira, GitHub, HubSpot, Stripe, Twilio).
- Reduce median workflow execution time by 30% through parallel step execution and caching.

## Resource Allocation

Engineering headcount remains at 6 for Q2. We will allocate 60% of capacity to product features, 25% to infrastructure and reliability, and 15% to developer experience (docs, SDK, CLI tools).`,
      },
    ],
  },
  {
    id: "folder-projects",
    name: "Projects",
    type: "folder",
    modified: "Apr 23, 2026",
    children: [
      {
        id: "file-slingshot-roadmap",
        name: "Slingshot Roadmap.md",
        type: "markdown",
        size: "10 KB",
        modified: "Apr 23, 2026",
        content: `# Slingshot Product Roadmap

## Phase 1: Foundation (Q1 2026) ✅

Core workflow engine with sequential step execution. Basic tool integrations (HTTP, email, file I/O). Simple web UI for creating and monitoring workflows. Knowledge base with markdown file storage.

## Phase 2: Intelligence (Q2 2026) — Current

Human-in-the-loop execution with interactive user-input steps. Execution graph visualization with real-time status updates. Parallel step execution for independent tool calls. Knowledge base v2 with folders, search, and rich file support.

## Phase 3: Scale (Q3 2026)

Multi-agent workflows where steps can delegate to sub-agents. Workflow marketplace for sharing and discovering community templates. Advanced analytics dashboard with cost tracking and performance insights. Enterprise features: SSO, RBAC, audit logging, and data residency controls.`,
      },
      {
        id: "file-budget-2026",
        name: "Budget 2026.pdf",
        type: "pdf",
        size: "240 KB",
        modified: "Apr 10, 2026",
      },
    ],
  },
  {
    id: "file-api-reference",
    name: "API Reference.md",
    type: "markdown",
    size: "22 KB",
    modified: "Apr 25, 2026",
    content: `# Slingshot API Reference

## Authentication

All API requests require a Bearer token in the Authorization header. Tokens can be generated from the Settings page or via the CLI with \`slingshot auth login\`. Tokens expire after 30 days and can be revoked at any time.

## Workflows

\`POST /api/workflows\` — Create a new workflow from a markdown definition. The request body should include \`name\`, \`description\`, and \`markdown\` fields. Returns the created workflow object with a unique \`id\`.

\`GET /api/workflows/:id/execute\` — Start a workflow execution. Returns a streaming response with server-sent events for each step transition, tool call, and user-input prompt. The client should listen for \`step\`, \`tool_call\`, \`tool_result\`, \`user_input\`, and \`complete\` event types.

## Knowledge Base

\`POST /api/kb/files\` — Upload a file to the knowledge base. Supports markdown, PDF, images, and spreadsheets up to 50 MB. Use multipart/form-data encoding. Optional \`folderId\` parameter to place the file in a specific folder.

\`GET /api/kb/files\` — List all files and folders. Returns a tree structure with nested children for folders. Supports \`search\` query parameter for full-text search across file names and markdown content.`,
  },
  {
    id: "file-quick-notes",
    name: "Quick Notes.md",
    type: "markdown",
    size: "3 KB",
    modified: "Apr 27, 2026",
    content: `# Quick Notes

## Ideas

- Add a "duplicate workflow" button so users can fork and modify existing workflows without starting from scratch.
- Consider a "dry run" mode that simulates tool calls without actually executing them — useful for testing and debugging.
- The knowledge base search should support semantic search, not just keyword matching.

## Bugs to Investigate

- Workflow status sometimes shows "running" even after all steps complete. Might be a WebSocket disconnect issue.
- File upload fails silently for files with special characters in the name. Need to sanitize filenames on the server.

## Links

- Design mockups: Figma project (see bookmarks)
- Competitor teardown: see Research/Competitor Notes.md`,
  },
  {
    id: "file-architecture-diagram",
    name: "Architecture Diagram.png",
    type: "image",
    size: "1.2 MB",
    modified: "Apr 15, 2026",
  },
];
