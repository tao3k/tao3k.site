export type LogEntryType =
  | "thinking"
  | "tool_call"
  | "tool_result"
  | "user_input"
  | "user_response";

export interface LogEntry {
  id: string;
  stepId: string;
  type: LogEntryType;
  timestamp: string;
  content: string;
  toolName?: string;
  toolParams?: Record<string, unknown>;
  toolResult?: string;
  choices?: string[];
  selectedChoice?: string;
  hasTextInput?: boolean;
}

export const executionLog: LogEntry[] = [
  {
    id: "log-1",
    stepId: "step-1",
    type: "thinking",
    timestamp: "10:32:01 AM",
    content:
      "Connecting to email service to fetch unread messages...",
  },
  {
    id: "log-2",
    stepId: "step-1",
    type: "tool_call",
    timestamp: "10:32:02 AM",
    content: "Calling fetchEmails to retrieve unread messages.",
    toolName: "fetchEmails",
    toolParams: { filter: "unread", limit: 50 },
  },
  {
    id: "log-3",
    stepId: "step-1",
    type: "tool_result",
    timestamp: "10:32:04 AM",
    content: "Email fetch completed.",
    toolResult:
      "Found 12 unread emails. Senders include: manager@company.com, client@acme.co, newsletter@techdigest.io, hr@company.com, and 8 others.",
  },
  {
    id: "log-4",
    stepId: "step-2",
    type: "thinking",
    timestamp: "10:32:05 AM",
    content:
      "Analyzing email subjects and senders to categorize by urgency. Looking for keywords like 'urgent', 'deadline', 'ASAP', and known high-priority senders.",
  },
  {
    id: "log-5",
    stepId: "step-2",
    type: "tool_call",
    timestamp: "10:32:06 AM",
    content: "Classifying all 12 emails by urgency level.",
    toolName: "classifyEmails",
    toolParams: {
      emailIds: [
        "e1",
        "e2",
        "e3",
        "e4",
        "e5",
        "e6",
        "e7",
        "e8",
        "e9",
        "e10",
        "e11",
        "e12",
      ],
      categories: ["urgent", "normal", "low"],
    },
  },
  {
    id: "log-6",
    stepId: "step-2",
    type: "tool_result",
    timestamp: "10:32:09 AM",
    content: "Classification complete.",
    toolResult:
      'Classified 12 emails: 3 urgent, 7 normal, 2 low priority.\n\nUrgent:\n- e1: "Q2 Deadline — Action Required" from manager@company.com\n- e2: "Expedited Delivery Request" from client@acme.co\n- e5: "Server Outage Alert" from monitoring@infra.company.com\n\nNormal: e3, e4, e6, e7, e8, e9, e11\nLow: e10, e12',
  },
  {
    id: "log-7",
    stepId: "step-3",
    type: "thinking",
    timestamp: "10:32:10 AM",
    content:
      'Found 3 urgent emails. The first is from your manager about the Q2 deadline. Subject: "Q2 Deadline — Action Required". The email requests confirmation that all deliverables will be submitted by May 15. I need your input on how to handle this.',
  },
  {
    id: "log-8",
    stepId: "step-3",
    type: "user_input",
    timestamp: "10:32:11 AM",
    content:
      "Your manager sent an urgent email about the Q2 deadline. They're asking for confirmation that all deliverables will be submitted by May 15. How should I handle it?",
    choices: [
      "Draft a reply confirming the deadline",
      "Snooze for 1 hour",
      "Mark as read and archive",
      "Forward to team lead",
    ],
    hasTextInput: true,
  },
  {
    id: "log-9",
    stepId: "step-3",
    type: "user_response",
    timestamp: "10:32:45 AM",
    content: "User selected an action for the manager's email.",
    selectedChoice: "Draft a reply confirming the deadline",
  },
  {
    id: "log-10",
    stepId: "step-4",
    type: "thinking",
    timestamp: "10:32:46 AM",
    content:
      "Drafting a professional reply confirming the Q2 deadline. I'll reference the deliverables list and confirm the May 15 target date.",
  },
  {
    id: "log-11",
    stepId: "step-4",
    type: "tool_call",
    timestamp: "10:32:47 AM",
    content: "Generating a reply draft for the manager's email.",
    toolName: "draftReply",
    toolParams: {
      emailId: "e1",
      tone: "professional",
      action: "confirm_deadline",
      context:
        "Confirm all Q2 deliverables will be submitted by May 15.",
    },
  },
  {
    id: "log-12",
    stepId: "step-4",
    type: "tool_result",
    timestamp: "10:32:50 AM",
    content: "Reply draft generated.",
    toolResult:
      'Subject: Re: Q2 Deadline — Action Required\n\nHi,\n\nThank you for the reminder. I can confirm that all Q2 deliverables are on track for submission by May 15. The team completed the sprint review yesterday and we\'re ahead on the remaining items.\n\nI\'ll send a detailed status update by end of day Wednesday. Please let me know if you\'d like to discuss anything before then.\n\nBest regards',
  },
  {
    id: "log-13",
    stepId: "step-4",
    type: "thinking",
    timestamp: "10:32:51 AM",
    content:
      "Reply drafted and ready for review. Moving on to the second urgent email — a client request from client@acme.co about an expedited delivery.",
  },
  {
    id: "log-14",
    stepId: "step-3",
    type: "tool_call",
    timestamp: "10:32:52 AM",
    content: "Retrieving full details of the client's urgent email.",
    toolName: "getEmailDetails",
    toolParams: {
      emailId: "e2",
      includeAttachments: true,
    },
  },
  {
    id: "log-15",
    stepId: "step-3",
    type: "tool_result",
    timestamp: "10:32:54 AM",
    content: "Email details retrieved.",
    toolResult:
      'From: client@acme.co\nSubject: Expedited Delivery Request\n\nHi team,\n\nWe need order #4821 delivered by Friday instead of the original date of next Wednesday. Our production schedule moved up and we can\'t afford delays. We understand this may require overtime on your end and are willing to cover a rush fee.\n\nPlease confirm ASAP.\n\nThanks,\nSarah Chen\nACME Corp',
  },
  {
    id: "log-16",
    stepId: "step-3",
    type: "user_input",
    timestamp: "10:32:55 AM",
    content:
      "A client (Sarah Chen, ACME Corp) is requesting expedited delivery of order #4821 by Friday instead of next Wednesday. This will likely require overtime approval. They've offered to cover a rush fee. How do you want to proceed?",
    choices: [
      "Approve overtime and confirm expedited delivery",
      "Negotiate a later date with the client",
      "Escalate to management for approval",
    ],
    hasTextInput: true,
  },
  {
    id: "log-17",
    stepId: "step-3",
    type: "thinking",
    timestamp: "10:32:56 AM",
    content:
      "Waiting for user input on the client request...",
  },
];
