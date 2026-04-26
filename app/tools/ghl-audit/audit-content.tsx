"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/motion/page-transition";
import { AuditChat } from "./audit-chat";

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
  items?: CheckItem[];
}

interface AuditResponse {
  score: number;
  grade: string;
  status: string;
  passed: number;
  warnings: number;
  critical: number;
  scannedAt: string;
  recommendations: string[];
  checks: CheckResult[];
}

interface AuditCredentials {
  locationId: string;
  pit: string;
}

type Phase = "input" | "scanning" | "results" | "error";

const ICONS: Record<string, React.ReactNode> = {
  workflows: <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  campaigns: <Icon path="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
  triggerLinks: <Icon path="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
  location: <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  pipelines: <Icon path="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
  contacts: <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  customFields: <Icon path="M4 6h16M4 10h16M4 14h16M4 18h16" />,
  calendars: <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  forms: <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  tags: <Icon path="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />,
  teamMembers: <Icon path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  funnels: <Icon path="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
};

function Icon({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const SEVERITY_DOT: Record<Severity, string> = {
  pass: "bg-emerald-400",
  warning: "bg-amber-400",
  critical: "bg-rose-500",
  unknown: "bg-slate-500",
};

const SEVERITY_BADGE: Record<Severity, string> = {
  pass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  unknown: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export function GhlAuditContent() {
  const [phase, setPhase] = useState<Phase>("input");
  const [locationId, setLocationId] = useState("");
  const [pit, setPit] = useState("");
  const [showPit, setShowPit] = useState(false);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [creds, setCreds] = useState<AuditCredentials | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // Animate the scan progress bar
  useEffect(() => {
    if (phase !== "scanning") return;
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => Math.min(95, p + Math.random() * 8));
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const runScan = async () => {
    if (!locationId.trim() || !pit.trim()) return;
    setError("");
    setPhase("scanning");
    try {
      const res = await fetch("/api/ghl-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId: locationId.trim(), pit: pit.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Scan failed");
      }
      setProgress(100);
      setTimeout(() => {
        setResult(json);
        setCreds({ locationId: locationId.trim(), pit: pit.trim() });
        setPhase("results");
      }, 400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("input");
    setResult(null);
    setCreds(null);
    setError("");
    setProgress(0);
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="mx-auto max-w-[960px] px-4 sm:px-8 py-12">
          {/* Title block */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-yellow">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">GHL Sub-Account Audit</h1>
            </div>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl">
              Detect misconfigurations, missing automations, and optimization opportunities in any GHL sub-account.
            </p>
          </div>

          {/* When to use */}
          <div className="mb-8 rounded-xl border border-persian/20 bg-persian/[0.06] p-4">
            <div className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-yellow mt-0.5">💡</span>
              <p>
                <span className="font-bold text-white">When to use this:</span> Scan client sub-accounts monthly to catch abandoned draft workflows, missing calendars, empty pipelines, and incomplete business profiles before they become client complaints. VAs managing multiple accounts can audit each one in seconds instead of clicking through every setting manually.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5 sm:p-7"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                      <span className="text-yellow">📍</span>
                      Location ID
                    </label>
                    <input
                      type="text"
                      value={locationId}
                      onChange={(e) => setLocationId(e.target.value)}
                      placeholder="e.g. abc123XYZ..."
                      className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-base sm:text-sm placeholder:text-white/25 focus:border-persian/60 focus:outline-none transition-colors"
                    />
                    <p className="mt-1.5 text-[0.7rem] text-white/35">Settings &gt; Business Profile &gt; Location ID</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                      <span className="text-yellow">🔑</span>
                      Private Integration Token
                    </label>
                    <div className="relative">
                      <input
                        type={showPit ? "text" : "password"}
                        value={pit}
                        onChange={(e) => setPit(e.target.value)}
                        placeholder="pit-xxxxxxxx-xxxx..."
                        className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 pr-10 text-white text-base sm:text-sm placeholder:text-white/25 focus:border-persian/60 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPit((s) => !s)}
                        aria-label={showPit ? "Hide token" : "Show token"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-white/80 transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {showPit ? (
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </>
                          ) : (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1.5 text-[0.7rem] text-white/35">Settings &gt; Integrations &gt; Private Integrations</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    onClick={runScan}
                    disabled={!locationId.trim() || !pit.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-persian px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(94,23,235,0.35)] hover:shadow-[0_12px_32px_rgba(94,23,235,0.5)] hover:bg-persian-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Run Health Scan
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300/80">
                  <span>🛡️</span>
                  <span>Your API key is used for this scan only and is never stored.</span>
                </div>
              </motion.div>
            )}

            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-12 text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-persian/30 border border-persian/40 mb-6"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f6cb1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </motion.div>
                <h2 className="text-xl font-bold text-white mb-3">Scanning sub-account…</h2>
                <div className="mx-auto max-w-md w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-persian to-yellow"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
                <p className="text-sm text-white/50">Running 12 health checks across your GHL configuration</p>
              </motion.div>
            )}

            {phase === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center"
              >
                <p className="text-rose-200 font-bold mb-2">Scan failed</p>
                <p className="text-sm text-rose-100/70 mb-4">{error}</p>
                <button
                  onClick={reset}
                  className="rounded-lg bg-white/[0.06] border border-white/[0.1] px-4 py-2 text-sm text-white hover:bg-white/[0.1] transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {phase === "results" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <ScoreCard result={result} />
                {result.recommendations.length > 0 && <RecommendationsCard recs={result.recommendations} />}
                <ChecksList checks={result.checks} />
                {creds && (
                  <AuditChat
                    audit={{
                      score: result.score,
                      grade: result.grade,
                      status: result.status,
                      scannedAt: result.scannedAt,
                      checks: result.checks,
                    }}
                    locationId={creds.locationId}
                    pit={creds.pit}
                  />
                )}
                <div className="text-center pt-2">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-lg bg-persian px-5 py-2.5 text-sm font-bold text-white hover:shadow-[0_8px_24px_rgba(94,23,235,0.4)] hover:bg-persian-dark transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                    </svg>
                    Scan Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

function ScoreCard({ result }: { result: AuditResponse }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (result.score / 100) * circumference;
  const scanned = new Date(result.scannedAt).toLocaleString();

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10">
        <div className="relative shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <motion.circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              transform="rotate(-90 70 70)"
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#f6cb1f" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white leading-none">{result.score}</span>
            <span className="mt-1 text-xs font-bold text-yellow">{result.grade}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="text-2xl font-black text-white mb-3">{result.status}</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {result.passed} passed
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 bg-amber-500/15 text-amber-300">
              ⚠ {result.warnings} warnings
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-rose-500/30 bg-rose-500/15 text-rose-300">
              ✕ {result.critical} critical
            </span>
          </div>
          <p className="text-xs text-white/40">Scanned {scanned}</p>
        </div>
      </div>
    </div>
  );
}

function RecommendationsCard({ recs }: { recs: string[] }) {
  return (
    <div className="rounded-2xl border border-persian/25 bg-persian/[0.07] backdrop-blur-md p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow">✨</span>
        <h3 className="text-base font-bold text-yellow">AI Recommendations</h3>
      </div>
      <ol className="space-y-3">
        {recs.map((r, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow/20 border border-yellow/40 text-xs font-bold text-yellow">
              {i + 1}
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChecksList({ checks }: { checks: CheckResult[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Detailed Results</p>
      <div className="space-y-2">
        {checks.map((c) => (
          <CheckRow key={c.key} check={c} />
        ))}
      </div>
    </div>
  );
}

function CheckRow({ check }: { check: CheckResult }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/[0.04] transition-colors"
      >
        <span className={`shrink-0 w-2 h-2 rounded-full ${SEVERITY_DOT[check.status]}`} />
        <span className="shrink-0 text-white/50">{ICONS[check.key] ?? <Icon path="M5 13l4 4L19 7" />}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{check.title}</p>
          <p className="text-[0.7rem] text-white/40 truncate">{check.subtitle}</p>
        </div>
        {check.count !== undefined && (
          <span className={`shrink-0 inline-flex items-center justify-center min-w-[44px] h-6 px-2 rounded text-xs font-bold border ${SEVERITY_BADGE[check.status]}`}>
            {check.count}
          </span>
        )}
        <span className={`shrink-0 ${check.status === "pass" ? "text-emerald-400" : check.status === "warning" ? "text-amber-400" : check.status === "critical" ? "text-rose-400" : "text-slate-500"}`}>
          {check.status === "pass" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          ) : check.status === "critical" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
          ) : check.status === "warning" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          )}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-white/30">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
              <p className="text-sm text-white/55 mb-3">
                {check.detail ?? (check.status === "pass" ? "Looks good — no issues detected." : check.status === "unknown" ? "Couldn't reach this endpoint. Verify your token has the right scope." : "Action recommended.")}
              </p>
              {check.items && check.items.length > 0 && (
                <ItemsList items={check.items} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ItemsList({ items }: { items: CheckItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 8);
  const hiddenCount = items.length - visible.length;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-black/30 divide-y divide-white/[0.04]">
      {visible.map((item, i) => (
        <div key={item.id ?? `${item.name}-${i}`} className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
          <div className="min-w-0 flex-1">
            <p className="text-white/85 font-medium truncate">{item.name}</p>
            {item.meta && Object.keys(item.meta).length > 0 && (
              <p className="text-white/35 truncate mt-0.5">
                {Object.entries(item.meta)
                  .map(([k, v]) => `${k}: ${typeof v === "boolean" ? (v ? "yes" : "no") : v}`)
                  .join(" · ")}
              </p>
            )}
          </div>
          {item.id && (
            <code className="shrink-0 text-[0.62rem] text-white/30 font-mono">{item.id.slice(-6)}</code>
          )}
        </div>
      ))}
      {hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full px-3 py-2 text-xs text-yellow hover:text-yellow-dark text-center font-bold transition-colors"
        >
          Show {hiddenCount} more
        </button>
      )}
    </div>
  );
}
