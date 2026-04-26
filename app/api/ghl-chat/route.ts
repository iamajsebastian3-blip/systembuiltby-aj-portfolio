import { NextRequest } from "next/server";

export const runtime = "edge";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

interface AuditCheck {
  key: string;
  title: string;
  count?: number | string;
  status: string;
  detail?: string;
  items?: Array<{ id?: string; name: string; meta?: Record<string, unknown> }>;
}

interface AuditSummary {
  score: number;
  grade: string;
  status: string;
  scannedAt: string;
  checks: AuditCheck[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface IncomingBody {
  messages: ChatMessage[];
  audit: AuditSummary;
  locationId: string;
  pit: string;
}

interface CsvAttachment {
  type: "csv";
  filename: string;
  content: string;
}

async function ghlFetch(path: string, pit: string): Promise<unknown> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`GHL API ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

function pickArray(obj: unknown, ...keys: string[]): unknown[] {
  if (!obj || typeof obj !== "object") return [];
  const o = obj as Record<string, unknown>;
  for (const k of keys) {
    if (Array.isArray(o[k])) return o[k] as unknown[];
  }
  return [];
}

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function rowsToCsv(headers: string[], rows: Record<string, unknown>[]): string {
  const lines = [headers.map(csvEscape).join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => csvEscape(r[h])).join(","));
  }
  return lines.join("\n");
}

const tools = [
  {
    type: "function",
    function: {
      name: "get_workflow_details",
      description:
        "Fetch a single workflow's full configuration (trigger settings, actions). Use when the user asks about a specific workflow's setup, what triggers it, or which calendar/form it's connected to.",
      parameters: {
        type: "object",
        properties: {
          workflowId: { type: "string", description: "The workflow ID from the audit data" },
        },
        required: ["workflowId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_contacts",
      description:
        "Fetch a page of contacts with email, phone, tags, and other fields. Use when the user wants to see contact details, look someone up, or get more than the small preview already in the audit.",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max number of contacts (default 50, max 100)" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "export_csv",
      description:
        "Generate a downloadable CSV. Use when the user explicitly asks for a CSV/spreadsheet/export of contacts, tags, workflows, or custom fields. After calling, briefly tell the user the file is ready below your message.",
      parameters: {
        type: "object",
        properties: {
          dataset: {
            type: "string",
            enum: ["contacts", "tags", "workflows", "customFields"],
            description: "Which dataset to export",
          },
        },
        required: ["dataset"],
      },
    },
  },
];

interface ToolCallResult {
  toolCallId: string;
  name: string;
  content: string;
  attachment?: CsvAttachment;
}

async function executeTool(
  name: string,
  rawArgs: string,
  locationId: string,
  pit: string,
  audit: AuditSummary
): Promise<{ content: string; attachment?: CsvAttachment }> {
  let args: Record<string, unknown> = {};
  try {
    args = JSON.parse(rawArgs || "{}");
  } catch {
    return { content: JSON.stringify({ error: "Invalid arguments" }) };
  }

  if (name === "get_workflow_details") {
    const id = String(args.workflowId ?? "");
    if (!id) return { content: JSON.stringify({ error: "workflowId required" }) };
    try {
      const data = await ghlFetch(`/workflows/${id}?locationId=${locationId}`, pit);
      return { content: JSON.stringify(data).slice(0, 6000) };
    } catch (err) {
      return { content: JSON.stringify({ error: err instanceof Error ? err.message : "fetch failed" }) };
    }
  }

  if (name === "get_contacts") {
    const limit = Math.min(100, Math.max(1, Number(args.limit ?? 50)));
    try {
      const data = (await ghlFetch(`/contacts/?locationId=${locationId}&limit=${limit}`, pit)) as Record<string, unknown>;
      const contacts = pickArray(data, "contacts").slice(0, limit).map((c) => {
        const ct = c as Record<string, unknown>;
        return {
          id: ct.id,
          firstName: ct.firstName,
          lastName: ct.lastName,
          email: ct.email,
          phone: ct.phone,
          tags: ct.tags,
          dateAdded: ct.dateAdded,
        };
      });
      return { content: JSON.stringify({ count: contacts.length, contacts }).slice(0, 8000) };
    } catch (err) {
      return { content: JSON.stringify({ error: err instanceof Error ? err.message : "fetch failed" }) };
    }
  }

  if (name === "export_csv") {
    const dataset = String(args.dataset ?? "");
    try {
      if (dataset === "contacts") {
        const data = (await ghlFetch(`/contacts/?locationId=${locationId}&limit=100`, pit)) as Record<string, unknown>;
        const rows = pickArray(data, "contacts").map((c) => {
          const ct = c as Record<string, unknown>;
          const tags = Array.isArray(ct.tags) ? (ct.tags as unknown[]).join(";") : "";
          return {
            id: ct.id,
            firstName: ct.firstName,
            lastName: ct.lastName,
            email: ct.email,
            phone: ct.phone,
            tags,
            dateAdded: ct.dateAdded,
          };
        });
        const csv = rowsToCsv(["id", "firstName", "lastName", "email", "phone", "tags", "dateAdded"], rows as Record<string, unknown>[]);
        return {
          content: JSON.stringify({ ok: true, count: rows.length }),
          attachment: { type: "csv", filename: `contacts_${locationId}.csv`, content: csv },
        };
      }
      if (dataset === "tags") {
        const tagsCheck = audit.checks.find((c) => c.key === "tags");
        const rows = (tagsCheck?.items ?? []).map((t) => ({ id: t.id, name: t.name }));
        const csv = rowsToCsv(["id", "name"], rows as Record<string, unknown>[]);
        return {
          content: JSON.stringify({ ok: true, count: rows.length }),
          attachment: { type: "csv", filename: `tags_${locationId}.csv`, content: csv },
        };
      }
      if (dataset === "workflows") {
        const wfCheck = audit.checks.find((c) => c.key === "workflows");
        const rows = (wfCheck?.items ?? []).map((w) => ({
          id: w.id,
          name: w.name,
          status: (w.meta?.status as string) ?? "",
          version: (w.meta?.version as string) ?? "",
        }));
        const csv = rowsToCsv(["id", "name", "status", "version"], rows as Record<string, unknown>[]);
        return {
          content: JSON.stringify({ ok: true, count: rows.length }),
          attachment: { type: "csv", filename: `workflows_${locationId}.csv`, content: csv },
        };
      }
      if (dataset === "customFields") {
        const cfCheck = audit.checks.find((c) => c.key === "customFields");
        const rows = (cfCheck?.items ?? []).map((f) => ({
          id: f.id,
          name: f.name,
          type: (f.meta?.type as string) ?? "",
        }));
        const csv = rowsToCsv(["id", "name", "type"], rows as Record<string, unknown>[]);
        return {
          content: JSON.stringify({ ok: true, count: rows.length }),
          attachment: { type: "csv", filename: `customFields_${locationId}.csv`, content: csv },
        };
      }
      return { content: JSON.stringify({ error: "Unknown dataset" }) };
    } catch (err) {
      return { content: JSON.stringify({ error: err instanceof Error ? err.message : "export failed" }) };
    }
  }

  return { content: JSON.stringify({ error: "Unknown tool" }) };
}

function systemPromptFor(audit: AuditSummary): string {
  const auditJson = JSON.stringify(
    {
      score: audit.score,
      grade: audit.grade,
      status: audit.status,
      scannedAt: audit.scannedAt,
      checks: audit.checks.map((c) => ({
        key: c.key,
        title: c.title,
        status: c.status,
        count: c.count,
        detail: c.detail,
        itemCount: c.items?.length ?? 0,
        items: (c.items ?? []).slice(0, 25).map((i) => ({ id: i.id, name: i.name, meta: i.meta })),
      })),
    },
    null,
    0
  ).slice(0, 12000);

  return `You are an expert GoHighLevel (HighLevel/GHL) consultant helping a user understand their just-completed sub-account audit.

You have full read access to the audit results below. You also have tools to fetch additional data on demand (specific workflow details, more contacts, CSV exports).

# Audit snapshot
${auditJson}

# Behavior rules
- Answer concisely. 1–4 short paragraphs max. Bullet lists for enumerations.
- For questions about specific items (workflow X, calendar Y), use the audit data first. If it's not there or the user wants deeper details on a specific workflow, call the get_workflow_details tool.
- For "list / show me / give me" requests on contacts, call get_contacts.
- For "export / CSV / spreadsheet / download" requests, call export_csv with the right dataset.
- When you generate a CSV, mention briefly that the file is available below your message — the UI shows a download button automatically.
- Do not invent items, IDs, counts, or recommendations not in the data.
- If a tool returns an error, explain plainly and suggest how to fix it (token scopes, etc.).
- Stay focused on this audit. If asked off-topic things, redirect politely.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server is missing GROQ_API_KEY" }, { status: 500 });
  }

  let body: IncomingBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages, audit, locationId, pit } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages required" }, { status: 400 });
  }
  if (!audit || !Array.isArray(audit.checks)) {
    return Response.json({ error: "audit context required" }, { status: 400 });
  }
  if (!locationId || !pit || !pit.startsWith("pit-")) {
    return Response.json({ error: "valid locationId and pit required" }, { status: 400 });
  }

  const sanitized = messages
    .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  // Build conversation chain with tool support. Up to 4 tool-call rounds before forcing a final answer.
  type ChatTurn =
    | { role: "system" | "user" | "assistant"; content: string; tool_calls?: unknown }
    | { role: "tool"; tool_call_id: string; name: string; content: string };

  const history: ChatTurn[] = [
    { role: "system", content: systemPromptFor(audit) },
    ...sanitized,
  ];

  const attachments: CsvAttachment[] = [];

  for (let round = 0; round < 4; round++) {
    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 800,
        messages: history,
        tools,
        tool_choice: "auto",
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return Response.json({ error: `Upstream error: ${errText}` }, { status: 502 });
    }

    const data = await upstream.json();
    const message = data.choices?.[0]?.message;
    if (!message) {
      return Response.json({ error: "No message returned" }, { status: 502 });
    }

    const toolCalls = (message.tool_calls ?? []) as Array<{
      id: string;
      function: { name: string; arguments: string };
    }>;

    if (!toolCalls.length) {
      return Response.json({
        content: message.content ?? "",
        attachments,
      });
    }

    history.push({
      role: "assistant",
      content: message.content ?? "",
      tool_calls: toolCalls,
    });

    const toolResults: ToolCallResult[] = await Promise.all(
      toolCalls.map(async (call) => {
        const result = await executeTool(call.function.name, call.function.arguments, locationId, pit, audit);
        return {
          toolCallId: call.id,
          name: call.function.name,
          content: result.content,
          attachment: result.attachment,
        };
      })
    );

    for (const r of toolResults) {
      history.push({
        role: "tool",
        tool_call_id: r.toolCallId,
        name: r.name,
        content: r.content,
      });
      if (r.attachment) attachments.push(r.attachment);
    }
  }

  return Response.json({
    content: "I called several tools but couldn't finish the answer. Try asking again, or rephrase the request.",
    attachments,
  });
}
