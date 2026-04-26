import { NextRequest } from "next/server";

export const runtime = "edge";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

type Severity = "pass" | "warning" | "critical" | "unknown";

interface CheckResult {
  key: string;
  title: string;
  subtitle: string;
  count?: number | string;
  status: Severity;
  detail?: string;
  meta?: Record<string, unknown>;
}

interface AuditResponse {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  status: string;
  passed: number;
  warnings: number;
  critical: number;
  scannedAt: string;
  recommendations: string[];
  checks: CheckResult[];
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
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function safeCheck(
  key: string,
  title: string,
  subtitle: string,
  fn: () => Promise<{ count?: number | string; status: Severity; detail?: string; meta?: Record<string, unknown> }>
): Promise<CheckResult> {
  try {
    const result = await fn();
    return { key, title, subtitle, ...result };
  } catch (err) {
    return {
      key,
      title,
      subtitle,
      status: "unknown",
      detail: err instanceof Error ? err.message : "Endpoint unavailable",
    };
  }
}

function pickArray(obj: unknown, ...keys: string[]): unknown[] {
  if (!obj || typeof obj !== "object") return [];
  const o = obj as Record<string, unknown>;
  for (const k of keys) {
    if (Array.isArray(o[k])) return o[k] as unknown[];
  }
  return [];
}

function gradeFor(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function statusFor(grade: string): string {
  switch (grade) {
    case "A": return "Excellent";
    case "B": return "Looking Good";
    case "C": return "Needs Attention";
    case "D": return "At Risk";
    default:  return "Critical Issues";
  }
}

async function generateRecommendations(checks: CheckResult[], apiKey: string): Promise<string[]> {
  if (!apiKey) return [];
  const summary = checks
    .filter((c) => c.status === "warning" || c.status === "critical")
    .map((c) => `- ${c.title}: ${c.status} (count=${c.count ?? "?"})${c.detail ? ` — ${c.detail}` : ""}`)
    .join("\n");

  if (!summary) return [];

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content:
              "You are an expert GoHighLevel consultant. Given a list of audit findings on a sub-account, produce exactly 3 short, actionable recommendations in JSON: {\"recommendations\":[\"...\",\"...\",\"...\"]}. Each recommendation is one or two sentences max. No preamble, no markdown, just JSON.",
          },
          { role: "user", content: `Findings:\n${summary}` },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed.recommendations)) {
      return parsed.recommendations.slice(0, 3).map(String);
    }
    return [];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  let body: { locationId?: string; pit?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const locationId = (body.locationId ?? "").trim();
  const pit = (body.pit ?? "").trim();

  if (!locationId || !pit) {
    return Response.json({ error: "locationId and pit are required" }, { status: 400 });
  }
  if (!/^[A-Za-z0-9_-]{4,}$/.test(locationId)) {
    return Response.json({ error: "Invalid locationId format" }, { status: 400 });
  }
  if (!pit.startsWith("pit-")) {
    return Response.json({ error: "Invalid Private Integration Token (must start with 'pit-')" }, { status: 400 });
  }

  // Run all checks in parallel
  const checks = await Promise.all([
    safeCheck("workflows", "Workflows", "Automation workflows", async () => {
      const data = await ghlFetch(`/workflows/?locationId=${locationId}`, pit);
      const list = pickArray(data, "workflows", "data");
      const drafts = list.filter((w) => {
        const wf = w as Record<string, unknown>;
        return wf.status === "draft" || wf.isDraft === true || wf.published === false;
      }).length;
      const total = list.length;
      const draftRatio = total > 0 ? drafts / total : 0;
      const status: Severity =
        total === 0 ? "warning" : draftRatio > 0.3 ? "warning" : "pass";
      return {
        count: total,
        status,
        detail: drafts > 0 ? `${drafts} draft workflow${drafts === 1 ? "" : "s"} (${Math.round(draftRatio * 100)}%)` : undefined,
        meta: { drafts, total },
      };
    }),

    safeCheck("campaigns", "Campaigns", "Email/SMS campaigns", async () => {
      const data = await ghlFetch(`/campaigns/?locationId=${locationId}`, pit);
      const list = pickArray(data, "campaigns", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
        detail: list.length === 0 ? "Zero campaigns — marketing automation is unused" : undefined,
      };
    }),

    safeCheck("triggerLinks", "Trigger Links", "Tracking links", async () => {
      const data = await ghlFetch(`/links/?locationId=${locationId}`, pit);
      const list = pickArray(data, "links", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No trigger links — limits automation tracking" : undefined,
      };
    }),

    safeCheck("location", "Location Settings", "Business profile completeness", async () => {
      const data = (await ghlFetch(`/locations/${locationId}`, pit)) as Record<string, unknown>;
      const loc = (data.location ?? data) as Record<string, unknown>;
      const fields = ["name", "address", "phone", "email", "website", "timezone"];
      const filled = fields.filter((f) => loc[f] != null && String(loc[f]).trim() !== "").length;
      const completeness = Math.round((filled / fields.length) * 100);
      return {
        count: `${completeness}%`,
        status: completeness >= 80 ? "pass" : completeness >= 50 ? "warning" : "critical",
        detail: `${filled}/${fields.length} core fields filled`,
        meta: { fields, filled },
      };
    }),

    safeCheck("pipelines", "Pipelines", "Sales pipeline stages", async () => {
      const data = await ghlFetch(`/opportunities/pipelines?locationId=${locationId}`, pit);
      const list = pickArray(data, "pipelines", "data");
      const totalStages = list.reduce<number>((acc, p) => {
        const pipeline = p as Record<string, unknown>;
        const stages = Array.isArray(pipeline.stages) ? pipeline.stages.length : 0;
        return acc + stages;
      }, 0);
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : list.length > 0 && totalStages < 3 ? "warning" : "pass",
        detail: `${totalStages} total stages across ${list.length} pipeline${list.length === 1 ? "" : "s"}`,
      };
    }),

    safeCheck("contacts", "Contacts", "Contact database", async () => {
      const data = (await ghlFetch(`/contacts/?locationId=${locationId}&limit=1`, pit)) as Record<string, unknown>;
      const meta = data.meta as Record<string, unknown> | undefined;
      const total = (meta?.total as number) ?? pickArray(data, "contacts").length;
      return {
        count: total,
        status: "pass",
      };
    }),

    safeCheck("customFields", "Custom Fields", "Contact data fields", async () => {
      const data = await ghlFetch(`/locations/${locationId}/customFields`, pit);
      const list = pickArray(data, "customFields", "data");
      return {
        count: list.length,
        status: "pass",
      };
    }),

    safeCheck("calendars", "Calendars", "Booking calendars", async () => {
      const data = await ghlFetch(`/calendars/?locationId=${locationId}`, pit);
      const list = pickArray(data, "calendars", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
        detail: list.length === 0 ? "No calendars set up — booking flow won't work" : undefined,
      };
    }),

    safeCheck("forms", "Forms", "Lead capture forms", async () => {
      const data = await ghlFetch(`/forms/?locationId=${locationId}`, pit);
      const list = pickArray(data, "forms", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No forms — limits lead capture" : undefined,
      };
    }),

    safeCheck("tags", "Tags", "Contact segmentation", async () => {
      const data = await ghlFetch(`/locations/${locationId}/tags`, pit);
      const list = pickArray(data, "tags", "data");
      return {
        count: list.length,
        status: "pass",
      };
    }),

    safeCheck("teamMembers", "Team Members", "Team access setup", async () => {
      const data = await ghlFetch(`/users/?locationId=${locationId}`, pit);
      const list = pickArray(data, "users", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
      };
    }),

    safeCheck("funnels", "Funnels & Websites", "Pages and funnels", async () => {
      const data = await ghlFetch(`/funnels/funnel?locationId=${locationId}`, pit);
      const list = pickArray(data, "funnels", "data");
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No funnels published" : undefined,
      };
    }),
  ]);

  // Score: each pass = 10, warning = 5, critical = 0, unknown = 7 (neutral)
  const weights: Record<Severity, number> = { pass: 10, warning: 5, critical: 0, unknown: 7 };
  const total = checks.length * 10;
  const earned = checks.reduce((acc, c) => acc + weights[c.status], 0);
  const score = Math.round((earned / total) * 100);
  const grade = gradeFor(score);

  const passed = checks.filter((c) => c.status === "pass").length;
  const warnings = checks.filter((c) => c.status === "warning").length;
  const critical = checks.filter((c) => c.status === "critical").length;

  const recommendations = await generateRecommendations(checks, process.env.GROQ_API_KEY ?? "");

  const response: AuditResponse = {
    score,
    grade,
    status: statusFor(grade),
    passed,
    warnings,
    critical,
    scannedAt: new Date().toISOString(),
    recommendations,
    checks,
  };

  return Response.json(response, {
    headers: { "Cache-Control": "no-store" },
  });
}
