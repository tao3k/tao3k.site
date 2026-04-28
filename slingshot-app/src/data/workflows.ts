export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "idle" | "running" | "error" | "completed";
  lastRun: string;
  stepCount: number;
  markdown: string;
}

export const workflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Daily Report Generator",
    description:
      "Fetches daily metrics, analyzes trends, and emails a summary report to stakeholders.",
    status: "idle",
    lastRun: "3 hours ago",
    stepCount: 4,
    markdown: `# Daily Report Generator

## Step 1: Fetch Data
Retrieve daily metrics from the analytics API.
- Tool: \`fetchAPI\`
- Params: \`{ endpoint: "/metrics/daily" }\`

## Step 2: Analyze Trends
Compare today's data with the 7-day moving average.
- Tool: \`analyzeTrends\`
- Params: \`{ window: 7 }\`

## Step 3: Generate Summary
Create a human-readable summary of key findings.
- Tool: \`generateText\`
- Input: analysis results

## Step 4: Send Report
Email the report to stakeholders.
- Tool: \`sendEmail\`
- To: \`team@company.com\`
`,
  },
  {
    id: "wf-2",
    name: "Email Triage Assistant",
    description:
      "Monitors your inbox, classifies emails by urgency, and helps you respond to critical messages.",
    status: "running",
    lastRun: "Just now",
    stepCount: 5,
    markdown: `# Email Triage Assistant

## Step 1: Fetch Emails
Connect to the email service and retrieve unread messages.
- Tool: \`fetchEmails\`
- Params: \`{ filter: "unread", limit: 50 }\`

## Step 2: Classify Emails
Analyze subject lines, senders, and content to categorize by urgency.
- Tool: \`classifyEmails\`
- Params: \`{ categories: ["urgent", "normal", "low"] }\`

## Step 3: User Priority Review
Present urgent emails to the user and ask for handling instructions.
- Tool: \`userInput\`
- Prompt: display email summary and offer action choices

## Step 4: Draft Replies
Generate professional reply drafts based on the user's chosen action.
- Tool: \`draftReply\`
- Params: \`{ tone: "professional" }\`

## Step 5: Send Replies
Send the approved reply drafts and archive handled messages.
- Tool: \`sendEmail\`
- Params: \`{ markAsRead: true, archive: true }\`
`,
  },
  {
    id: "wf-3",
    name: "Research Aggregator",
    description:
      "Crawls academic and industry sources, extracts key findings, and compiles a structured research brief.",
    status: "error",
    lastRun: "1 day ago",
    stepCount: 6,
    markdown: `# Research Aggregator

## Step 1: Define Search Queries
Build search queries from the user's research topic and keywords.
- Tool: \`buildQuery\`
- Params: \`{ topic: "user-defined", maxKeywords: 10 }\`

## Step 2: Crawl Sources
Search academic databases, news outlets, and industry blogs.
- Tool: \`webCrawler\`
- Params: \`{ sources: ["arxiv", "scholar", "techcrunch", "hbr"] }\`

## Step 3: Extract Key Findings
Parse each result and extract relevant passages and statistics.
- Tool: \`extractFindings\`
- Params: \`{ maxPerSource: 5 }\`

## Step 4: Deduplicate & Rank
Remove duplicate findings and rank by relevance score.
- Tool: \`deduplicateAndRank\`
- Params: \`{ strategy: "cosine_similarity" }\`

## Step 5: Generate Brief
Compile findings into a structured research brief with citations.
- Tool: \`generateText\`
- Params: \`{ format: "research_brief", citationStyle: "APA" }\`

## Step 6: Export
Save the brief as PDF and upload to the knowledge base.
- Tool: \`exportDocument\`
- Params: \`{ formats: ["pdf", "markdown"] }\`
`,
  },
  {
    id: "wf-4",
    name: "Data Pipeline",
    description:
      "Extracts data from multiple sources, transforms it into a unified schema, and loads it into the warehouse.",
    status: "idle",
    lastRun: "5 hours ago",
    stepCount: 3,
    markdown: `# Data Pipeline

## Step 1: Extract
Pull raw data from configured source systems.
- Tool: \`extractData\`
- Params: \`{ sources: ["postgres", "salesforce", "csv_uploads"] }\`

## Step 2: Transform
Clean, normalize, and reshape data into the target schema.
- Tool: \`transformData\`
- Params: \`{ schema: "unified_v2", dropNulls: true, dedup: true }\`

## Step 3: Load
Insert the transformed data into the data warehouse.
- Tool: \`loadData\`
- Params: \`{ destination: "bigquery", dataset: "analytics_prod", mode: "append" }\`
`,
  },
  {
    id: "wf-5",
    name: "Content Publisher",
    description:
      "Takes a draft blog post, optimizes it for SEO, generates social media snippets, and publishes across platforms.",
    status: "completed",
    lastRun: "30 minutes ago",
    stepCount: 4,
    markdown: `# Content Publisher

## Step 1: Ingest Draft
Load the blog post draft from the knowledge base.
- Tool: \`readDocument\`
- Params: \`{ source: "knowledge_base", docId: "draft-latest" }\`

## Step 2: SEO Optimization
Analyze keyword density, readability, and meta tags. Suggest improvements.
- Tool: \`seoAnalyzer\`
- Params: \`{ targetKeywords: ["ai agents", "automation"], readabilityTarget: "grade-8" }\`

## Step 3: Generate Social Snippets
Create platform-specific teasers for Twitter, LinkedIn, and Threads.
- Tool: \`generateText\`
- Params: \`{ platforms: ["twitter", "linkedin", "threads"], maxLength: 280 }\`

## Step 4: Publish
Push the optimized post and social snippets to each platform.
- Tool: \`publishContent\`
- Params: \`{ blog: "wordpress", social: true, schedule: "immediate" }\`
`,
  },
  {
    id: "wf-6",
    name: "Meeting Summarizer",
    description:
      "Transcribes a meeting recording, extracts action items, and distributes the summary to attendees.",
    status: "idle",
    lastRun: "2 days ago",
    stepCount: 3,
    markdown: `# Meeting Summarizer

## Step 1: Transcribe
Convert the meeting audio or video recording into text.
- Tool: \`transcribeAudio\`
- Params: \`{ model: "whisper-large-v3", language: "en", diarize: true }\`

## Step 2: Extract Action Items
Identify action items, decisions, and owners from the transcript.
- Tool: \`extractActionItems\`
- Params: \`{ format: "structured", includeDeadlines: true }\`

## Step 3: Distribute Summary
Send the meeting summary and action items to all attendees.
- Tool: \`sendEmail\`
- Params: \`{ recipients: "attendees", attachTranscript: true }\`
`,
  },
];
