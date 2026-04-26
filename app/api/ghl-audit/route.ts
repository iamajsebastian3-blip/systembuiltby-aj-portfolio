import { NextRequest } from "next/server";

export const runtime = "edge";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const ITEMS_PER_CHECK = 200;

type Severity = "pass" | "warning" | "critical" | "unknown";

interface CheckItem {
  id?: string;
  name: string;
  meta?: Record<string, string | number | boolean>;
}

interface CheckResult {
  key: string;
  title: string;
  subtitle: string;
  count?: number | string;
  status: Severity;
  detail?: string;
  meta?: Record<string, unknown>;
  items?: CheckItem[];
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
  fn: () => Promise<{
    count?: number | string;
    status: Severity;
    detail?: string;
    meta?: Record<string, unknown>;
    items?: CheckItem[];
  }>
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

function asString(v: unknown): string | undefined {
  if (v == null) return undefined;
  return String(v);
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
  const snapshot = checks
    .map((c) => {
      const status = c.status.toUpperCase();
      const count = c.count ?? "n/a";
      const detail = c.detail ? ` — ${c.detail}` : "";
      return `[${status}] ${c.title} (count=${count})${detail}`;
    })
    .join("\n");

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
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content:
              "You are an expert GoHighLevel (HighLevel/GHL) consultant performing a FULL ACCOUNT AUDIT. " +
              "Given a snapshot of every audit check (passed, warning, critical) on a sub-account, " +
              "produce 5-7 best-practice recommendations covering BOTH problems AND optimizations. " +
              "Cover: workflow hygiene, campaign/marketing automation usage, lead capture coverage, " +
              "pipeline structure, calendar/booking setup, A2P 10DLC compliance hint when relevant, " +
              "tag/segmentation hygiene, team access, and missing pieces. " +
              "Each recommendation: 1-2 sentences, action-oriented, specific to the data shown. " +
              "Format strictly as JSON: {\"recommendations\":[\"...\",\"...\",...]}. No preamble, no markdown.",
          },
          { role: "user", content: `Account audit snapshot:\n${snapshot}` },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed.recommendations)) {
      return parsed.recommendations.slice(0, 7).map(String);
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
      const status: Severity = total === 0 ? "warning" : draftRatio > 0.3 ? "warning" : "pass";
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((w) => {
        const wf = w as Record<string, unknown>;
        const isDraft = wf.status === "draft" || wf.isDraft === true || wf.published === false;
        return {
          id: asString(wf.id),
          name: asString(wf.name) ?? "(unnamed)",
          meta: {
            status: isDraft ? "draft" : "published",
            ...(wf.version != null ? { version: String(wf.version) } : {}),
          },
        };
      });
      return {
        count: total,
        status,
        detail: drafts > 0 ? `${drafts} draft workflow${drafts === 1 ? "" : "s"} (${Math.round(draftRatio * 100)}%)` : undefined,
        meta: { drafts, total },
        items,
      };
    }),

    safeCheck("campaigns", "Campaigns", "Email/SMS campaigns", async () => {
      const data = await ghlFetch(`/campaigns/?locationId=${locationId}`, pit);
      const list = pickArray(data, "campaigns", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((c) => {
        const cm = c as Record<string, unknown>;
        return {
          id: asString(cm.id),
          name: asString(cm.name) ?? "(unnamed)",
          meta: {
            ...(cm.status ? { status: String(cm.status) } : {}),
            ...(cm.type ? { type: String(cm.type) } : {}),
          },
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
        detail: list.length === 0 ? "Zero campaigns — marketing automation is unused" : undefined,
        items,
      };
    }),

    safeCheck("triggerLinks", "Trigger Links", "Tracking links", async () => {
      const data = await ghlFetch(`/links/?locationId=${locationId}`, pit);
      const list = pickArray(data, "links", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((l) => {
        const lk = l as Record<string, unknown>;
        return {
          id: asString(lk.id),
          name: asString(lk.name) ?? asString(lk.fieldKey) ?? "(unnamed)",
          meta: lk.redirectTo ? { redirectTo: String(lk.redirectTo) } : undefined,
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No trigger links — limits automation tracking" : undefined,
        items,
      };
    }),

    safeCheck("location", "Location Settings", "Business profile completeness", async () => {
      const data = (await ghlFetch(`/locations/${locationId}`, pit)) as Record<string, unknown>;
      const loc = (data.location ?? data) as Record<string, unknown>;
      const fields = ["name", "address", "phone", "email", "website", "timezone"];
      const filled = fields.filter((f) => loc[f] != null && String(loc[f]).trim() !== "").length;
      const completeness = Math.round((filled / fields.length) * 100);
      const items: CheckItem[] = fields.map((f) => ({
        name: f,
        meta: {
          filled: loc[f] != null && String(loc[f]).trim() !== "",
          value: loc[f] != null ? String(loc[f]).slice(0, 60) : "(empty)",
        },
      }));
      return {
        count: `${completeness}%`,
        status: completeness >= 80 ? "pass" : completeness >= 50 ? "warning" : "critical",
        detail: `${filled}/${fields.length} core fields filled`,
        meta: { fields, filled },
        items,
      };
    }),

    safeCheck("pipelines", "Pipelines", "Sales pipeline stages", async () => {
      const data = await ghlFetch(`/opportunities/pipelines?locationId=${locationId}`, pit);
      const list = pickArray(data, "pipelines", "data");
      let totalStages = 0;
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((p) => {
        const pipeline = p as Record<string, unknown>;
        const stages = Array.isArray(pipeline.stages) ? pipeline.stages.length : 0;
        totalStages += stages;
        return {
          id: asString(pipeline.id),
          name: asString(pipeline.name) ?? "(unnamed)",
          meta: { stages },
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : list.length > 0 && totalStages < 3 ? "warning" : "pass",
        detail: `${totalStages} total stages across ${list.length} pipeline${list.length === 1 ? "" : "s"}`,
        items,
      };
    }),

    safeCheck("contacts", "Contacts", "Contact database", async () => {
      const data = (await ghlFetch(`/contacts/?locationId=${locationId}&limit=20`, pit)) as Record<string, unknown>;
      const meta = data.meta as Record<string, unknown> | undefined;
      const list = pickArray(data, "contacts");
      const total = (meta?.total as number) ?? list.length;
      const items: CheckItem[] = list.slice(0, 20).map((c) => {
        const ct = c as Record<string, unknown>;
        const fullName = [asString(ct.firstName), asString(ct.lastName)].filter(Boolean).join(" ");
        return {
          id: asString(ct.id),
          name: fullName || asString(ct.contactName) || asString(ct.email) || "(unnamed)",
          meta: {
            ...(ct.email ? { email: String(ct.email) } : {}),
            ...(ct.phone ? { phone: String(ct.phone) } : {}),
          },
        };
      });
      return {
        count: total,
        status: "pass",
        detail: items.length > 0 ? `Showing first ${items.length} of ${total}` : undefined,
        items,
      };
    }),

    safeCheck("customFields", "Custom Fields", "Contact data fields", async () => {
      const data = await ghlFetch(`/locations/${locationId}/customFields`, pit);
      const list = pickArray(data, "customFields", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((f) => {
        const fld = f as Record<string, unknown>;
        return {
          id: asString(fld.id),
          name: asString(fld.name) ?? asString(fld.fieldKey) ?? "(unnamed)",
          meta: fld.dataType ? { type: String(fld.dataType) } : undefined,
        };
      });
      return { count: list.length, status: "pass", items };
    }),

    safeCheck("calendars", "Calendars", "Booking calendars", async () => {
      const data = await ghlFetch(`/calendars/?locationId=${locationId}`, pit);
      const list = pickArray(data, "calendars", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((c) => {
        const cal = c as Record<string, unknown>;
        return {
          id: asString(cal.id),
          name: asString(cal.name) ?? "(unnamed)",
          meta: {
            ...(cal.isActive != null ? { active: Boolean(cal.isActive) } : {}),
            ...(cal.slotDuration != null ? { slotMinutes: Number(cal.slotDuration) } : {}),
          },
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
        detail: list.length === 0 ? "No calendars set up — booking flow won't work" : undefined,
        items,
      };
    }),

    safeCheck("forms", "Forms", "Lead capture forms", async () => {
      const data = await ghlFetch(`/forms/?locationId=${locationId}`, pit);
      const list = pickArray(data, "forms", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((f) => {
        const fm = f as Record<string, unknown>;
        return {
          id: asString(fm.id),
          name: asString(fm.name) ?? "(unnamed)",
          meta: fm.formType ? { type: String(fm.formType) } : undefined,
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No forms — limits lead capture" : undefined,
        items,
      };
    }),

    safeCheck("tags", "Tags", "Contact segmentation", async () => {
      const data = await ghlFetch(`/locations/${locationId}/tags`, pit);
      const list = pickArray(data, "tags", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((t) => {
        const tg = t as Record<string, unknown>;
        return {
          id: asString(tg.id),
          name: asString(tg.name) ?? "(unnamed)",
        };
      });
      return { count: list.length, status: "pass", items };
    }),

    safeCheck("teamMembers", "Team Members", "Team access setup", async () => {
      const data = await ghlFetch(`/users/?locationId=${locationId}`, pit);
      const list = pickArray(data, "users", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((u) => {
        const usr = u as Record<string, unknown>;
        const fullName = [asString(usr.firstName), asString(usr.lastName)].filter(Boolean).join(" ");
        return {
          id: asString(usr.id),
          name: fullName || asString(usr.name) || asString(usr.email) || "(unnamed)",
          meta: {
            ...(usr.email ? { email: String(usr.email) } : {}),
            ...(usr.role ? { role: String(usr.role) } : {}),
          },
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "critical" : "pass",
        items,
      };
    }),

    safeCheck("funnels", "Funnels & Websites", "Pages and funnels", async () => {
      const data = await ghlFetch(`/funnels/funnel?locationId=${locationId}`, pit);
      const list = pickArray(data, "funnels", "data");
      const items: CheckItem[] = list.slice(0, ITEMS_PER_CHECK).map((f) => {
        const fn = f as Record<string, unknown>;
        return {
          id: asString(fn.id),
          name: asString(fn.name) ?? "(unnamed)",
          meta: fn.status ? { status: String(fn.status) } : undefined,
        };
      });
      return {
        count: list.length,
        status: list.length === 0 ? "warning" : "pass",
        detail: list.length === 0 ? "No funnels published" : undefined,
        items,
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
