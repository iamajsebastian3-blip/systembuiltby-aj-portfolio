"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  UserPlus, Mail, ClipboardList, FileText, Clock, Video, KeyRound, CheckCircle2, Hourglass, Heart, XCircle,
  Zap, Sparkles, PenTool,
  Database, ShieldCheck, Send, Loader2, Terminal,
  Globe, AtSign, Briefcase, Pencil, GitMerge, Table,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const tabs = ["GoHighLevel", "Trigger.dev", "N8N"];

/* ================================================================
   GHL — light builder canvas, violet/gold, onboarding, moving pulse
================================================================ */
type GNode = { x: number; y: number; icon: LucideIcon; label: string; sub: string; theme?: "trigger" | "active" | "green" | "red" };

const gTop: GNode[] = [
  { x: 90, y: 110, icon: UserPlus, label: "New Client", sub: "Deal won trigger", theme: "trigger" },
  { x: 280, y: 110, icon: Mail, label: "Welcome Email", sub: "Intro + next steps" },
  { x: 470, y: 110, icon: ClipboardList, label: "Onboarding Form", sub: "Collect details" },
  { x: 660, y: 110, icon: FileText, label: "Contract Sent", sub: "E-sign link" },
  { x: 850, y: 110, icon: Clock, label: "24hr Reminder", sub: "Nudge to sign" },
  { x: 1050, y: 110, icon: Video, label: "Kickoff Call", sub: "Onboarding call", theme: "active" },
];
const gBottom: GNode[] = [
  { x: 200, y: 420, icon: KeyRound, label: "Access Granted", sub: "Portal + assets" },
  { x: 380, y: 420, icon: CheckCircle2, label: "Active Client", sub: "Fully onboarded", theme: "green" },
  { x: 620, y: 420, icon: Hourglass, label: "Needs Follow-up", sub: "Not ready yet" },
  { x: 800, y: 420, icon: Heart, label: "Nurture", sub: "Check-in drip" },
  { x: 1050, y: 420, icon: XCircle, label: "No-Show", sub: "Reschedule / close", theme: "red" },
];

function GTile({ n }: { n: GNode }) {
  const Icon = n.icon;
  const border =
    n.theme === "trigger" ? "border-persian/40 bg-persian/[0.08]" :
    n.theme === "active" ? "border-persian/50 bg-white ring-2 ring-persian/20" :
    n.theme === "green" ? "border-emerald-300 bg-emerald-50" :
    n.theme === "red" ? "border-red-300 bg-red-50" :
    "border-black/[0.08] bg-white";
  const icon =
    n.theme === "trigger" || n.theme === "active" ? "text-persian" :
    n.theme === "green" ? "text-emerald-600" :
    n.theme === "red" ? "text-red-500" : "text-gray-600";
  const labelColor = n.theme === "green" ? "text-emerald-700" : n.theme === "red" ? "text-red-600" : "text-gray-800";
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${(n.x / 1140) * 100}%`, top: `${(n.y / 560) * 100}%` }}>
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm ${border}`}>
        <Icon size={24} className={icon} />
      </div>
      <div className={`mt-2 text-xs font-bold ${labelColor}`}>{n.label}</div>
      <div className="text-[10px] text-gray-500">{n.sub}</div>
    </div>
  );
}

function GhlFlow() {
  return (
    <div className="relative aspect-[1140/560] w-full min-w-[860px]">
      <svg viewBox="0 0 1140 560" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ghl-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f6cb1f" />
          </linearGradient>
          <filter id="ghl-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {gTop.slice(0, -1).map((n, i) => {
          const next = gTop[i + 1];
          const d = `M${n.x + 40} 110 H${next.x - 40}`;
          return (
            <g key={`gt-${i}`}>
              <path d={d} stroke="#7c3aed" strokeOpacity={0.4} strokeWidth={2.5} fill="none" />
              <path className="circuit-pulse" d={d} stroke="url(#ghl-pulse)" strokeWidth={5} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="0.28 0.72" filter="url(#ghl-glow)" style={{ ["--dur" as string]: `${2.4 + i * 0.25}s`, animationDelay: `${i * 0.2}s` }} />
            </g>
          );
        })}
        <path d="M660 145 C660 235, 850 235, 850 150" stroke="#7c3aed" strokeOpacity={0.7} strokeWidth={2} strokeDasharray="6 5" fill="none" />
        <path d="M1050 150 C1050 300, 300 250, 200 375" stroke="#9ca3af" strokeOpacity={0.55} strokeWidth={1.75} strokeDasharray="2 5" fill="none" />
        <path d="M1050 150 C1000 320, 700 300, 620 375" stroke="#9ca3af" strokeOpacity={0.55} strokeWidth={1.75} strokeDasharray="2 5" fill="none" />
        <path d="M1050 150 V375" stroke="#9ca3af" strokeOpacity={0.55} strokeWidth={1.75} strokeDasharray="2 5" fill="none" />
        <path d="M240 420 H340" stroke="#7c3aed" strokeOpacity={0.4} strokeWidth={2.5} fill="none" />
        <path className="circuit-pulse" d="M240 420 H340" stroke="url(#ghl-pulse)" strokeWidth={5} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="0.35 0.65" filter="url(#ghl-glow)" style={{ ["--dur" as string]: "2.6s" }} />
        <path d="M660 420 H760" stroke="#7c3aed" strokeOpacity={0.4} strokeWidth={2.5} fill="none" />
      </svg>
      <div className="absolute left-[66%] top-[34%] -translate-x-1/2 text-[11px] font-semibold text-persian">Contract Resent</div>
      {gTop.map((n) => <GTile key={n.label} n={n} />)}
      {gBottom.map((n) => <GTile key={n.label} n={n} />)}
    </div>
  );
}

/* ================================================================
   Trigger.dev — dark run view with LIVE scrolling logs
================================================================ */
const tRuns = [
  { icon: Clock, name: "schedule.cron", detail: "0 8 * * 0", dur: "0ms", ts: "08:00:00", status: "done" as const },
  { icon: Database, name: "fetch.sources", detail: "12 items pulled", dur: "1.2s", ts: "08:00:01", status: "done" as const },
  { icon: Sparkles, name: "ai.generate", detail: "Claude · draft + image", dur: "3.4s", ts: "08:00:02", status: "running" as const },
  { icon: ShieldCheck, name: "retry.guard", detail: "0 retries", dur: "—", ts: "—", status: "queued" as const },
  { icon: Send, name: "publish.output", detail: "LinkedIn · Instagram", dur: "—", ts: "—", status: "queued" as const },
];

const logSeq = [
  { t: "08:00:00", a: "schedule.cron", b: " fired", c: "text-persian-light" },
  { t: "08:00:01", a: "fetch.sources", b: " → 12 items ok", c: "text-emerald-400" },
  { t: "08:00:02", a: "ai.generate", b: " running…", c: "text-yellow" },
  { t: "08:00:05", a: "ai.generate", b: " → draft + image ready", c: "text-emerald-400" },
  { t: "08:00:05", a: "publish.output", b: " queued", c: "text-persian-light" },
  { t: "08:00:06", a: "retry.guard", b: " armed · 0 retries", c: "text-white/50" },
];

function LiveLogs() {
  const [feed, setFeed] = useState(() => logSeq.slice(0, 3));
  const idx = useRef(3);
  useEffect(() => {
    const id = setInterval(() => {
      setFeed((f) => [...f, logSeq[idx.current % logSeq.length]].slice(-4));
      idx.current += 1;
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/40 p-3">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
        <Terminal size={12} /> Live Logs
      </div>
      <div className="flex flex-col gap-0.5 font-mono text-[11px] leading-relaxed">
        {feed.map((l, i) => (
          <div key={`${l.t}-${i}`} className={`text-white/40 ${i === feed.length - 1 ? "animate-[fadeIn_0.4s_ease]" : ""}`}>
            [{l.t}] <span className="text-white/70">{l.a}</span><span className={l.c}>{l.b}</span>
          </div>
        ))}
        <div className="text-white/40">
          <span className="inline-block h-3 w-1.5 animate-pulse bg-persian-light align-middle" />
        </div>
      </div>
    </div>
  );
}

function TriggerFlow() {
  return (
    <div className="min-w-[560px] bg-[#0b0b12] p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-sm font-semibold text-white/85">weekly-content</div>
          <div className="font-mono text-xs text-white/40">run_a1b2c3 · attempt 1/3</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/50">4.6s</span>
          <span className="rounded-full bg-persian/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-persian-light">Running</span>
        </div>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[54%] rounded-full bg-gradient-to-r from-persian to-persian-light" />
      </div>
      <div className="relative">
        <div className="absolute bottom-4 left-[19px] top-4 w-px bg-white/10" />
        <div className="flex flex-col gap-2.5">
          {tRuns.map((t) => {
            const Icon = t.icon;
            const done = t.status === "done";
            const running = t.status === "running";
            return (
              <div key={t.name} className={`relative flex items-center gap-4 rounded-xl border px-4 py-3 ${running ? "border-persian/40 bg-persian/10" : "border-white/[0.06] bg-white/[0.02]"}`}>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${done ? "bg-emerald-500/15 text-emerald-400" : running ? "bg-persian/20 text-persian-light" : "bg-white/[0.05] text-white/30"}`}>
                  {running ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm font-semibold text-white/90">{t.name}</div>
                  <div className="truncate text-xs text-white/40">{t.detail}</div>
                  {running && <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full w-[70%] rounded-full bg-persian-light" /></div>}
                </div>
                <div className="shrink-0 text-right">
                  <div className={`font-mono text-xs ${done ? "text-emerald-400" : running ? "text-persian-light" : "text-white/25"}`}>{done ? `✓ ${t.dur}` : t.dur}</div>
                  <div className="font-mono text-[10px] text-white/25">{t.ts}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <LiveLogs />
    </div>
  );
}

/* ================================================================
   N8N — real dark canvas (weekly analytics report)
================================================================ */
type NNode = { x: number; y: number; icon: LucideIcon; title: string; sub?: string; color: string; trigger?: boolean };
const n8: NNode[] = [
  { x: 40, y: 190, icon: Clock, title: "Run weekly", color: "#22c55e", trigger: true },
  { x: 210, y: 60, icon: Globe, title: "Get Facebook analytics", color: "#1877f2" },
  { x: 210, y: 190, icon: AtSign, title: "Get Twitter analytics", color: "#38bdf8" },
  { x: 210, y: 320, icon: Briefcase, title: "Get LinkedIn analytics", color: "#0a66c2" },
  { x: 440, y: 60, icon: Pencil, title: "Format FB metrics", color: "#a78bfa" },
  { x: 440, y: 190, icon: Pencil, title: "Format Twitter metrics", color: "#a78bfa" },
  { x: 440, y: 320, icon: Pencil, title: "Format LinkedIn metrics", color: "#a78bfa" },
  { x: 660, y: 190, icon: GitMerge, title: "Merge", color: "#94a3b8" },
  { x: 850, y: 110, icon: Table, title: "Write to sheet", color: "#22c55e" },
  { x: 850, y: 270, icon: Mail, title: "Send a report", color: "#ef4444" },
];
const n8Edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [2, 5], [3, 6],
  [4, 7], [5, 7], [6, 7],
  [7, 8], [7, 9],
];
const NW = 56; // node width/height

function N8nFlow() {
  const cx = (i: number) => n8[i].x + NW;
  const cyv = (i: number) => n8[i].y + NW / 2;
  return (
    <div className="relative aspect-[1000/430] w-full min-w-[820px] rounded-lg bg-[#1c1c22]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
      <svg viewBox="0 0 1000 430" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="n8-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f6cb1f" />
          </linearGradient>
        </defs>
        {n8Edges.map(([a, b], i) => {
          const x1 = cx(a), y1 = cyv(a), x2 = n8[b].x, y2 = cyv(b);
          const d = `M${x1} ${y1} C${x1 + 45} ${y1}, ${x2 - 45} ${y2}, ${x2} ${y2}`;
          return (
            <g key={`e-${i}`}>
              <path d={d} stroke="#4b5563" strokeWidth={1.75} fill="none" />
              <path className="circuit-pulse" d={d} stroke="url(#n8-pulse)" strokeWidth={3} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="0.24 0.76" style={{ ["--dur" as string]: `${2.8 + (i % 3) * 0.4}s`, animationDelay: `${(i % 4) * 0.25}s` }} />
            </g>
          );
        })}
      </svg>
      {n8.map((n) => {
        const Icon = n.icon;
        return (
          <div key={n.title} className="absolute flex flex-col items-center" style={{ left: `${(n.x / 1000) * 100}%`, top: `${(n.y / 430) * 100}%`, width: NW }}>
            <div className={`flex items-center justify-center border shadow-md ${n.trigger ? "rounded-l-2xl rounded-r-md" : "rounded-xl"} border-white/10 bg-[#2a2a33]`} style={{ height: NW, width: NW }}>
              <Icon size={22} style={{ color: n.color }} />
            </div>
            <span className="mt-1.5 w-28 text-center text-[10px] font-medium leading-tight text-white/70">{n.title}</span>
            {n.sub && <span className="text-[9px] text-white/35">{n.sub}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================ */
const meta = [
  { title: "Client Onboarding", subtitle: "One trigger fires. The whole onboarding runs itself.", chrome: "light" as const },
  { title: "Trigger.dev — Run", subtitle: "Schedule it once. It runs on autopilot.", chrome: "dark" as const },
  { title: "N8N — Weekly Analytics Report", subtitle: "Connect anything to everything.", chrome: "dark" as const },
];

// Scales a fixed-design-width block down to fit narrow screens (whole diagram stays visible)
function FitToWidth({ designWidth, children }: { designWidth: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const o = outer.current;
    const ic = inner.current;
    if (!o || !ic) return;
    const update = () => {
      const s = Math.min(1, o.clientWidth / designWidth);
      setScale(s);
      setHeight(ic.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(ic);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height }}>
      <div ref={inner} style={{ width: designWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

export function AutomationFlows() {
  const [active, setActive] = useState(0);
  const m = meta[active];

  return (
    <section className="relative overflow-hidden py-16 lg:py-28">
      <ScrollReveal>
        <div className="mx-auto mb-10 max-w-2xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-persian-light">The Automations</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            One trigger. The whole system runs itself.
          </h2>
        </div>
      </ScrollReveal>

      <div className="mx-auto mb-8 flex max-w-md flex-wrap justify-center gap-2 px-6">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${active === i ? "border-persian/60 bg-persian text-white" : "border-white/[0.10] bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"}`}>
            {t}
          </button>
        ))}
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FitToWidth designWidth={1100}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.10] shadow-[0_28px_80px_rgba(0,0,0,0.6)]">
            <div className={`flex items-center gap-2 border-b px-4 py-3 ${m.chrome === "dark" ? "border-white/10 bg-[#16161f]" : "border-black/10 bg-[#e7e4f0]"}`}>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className={`flex-1 text-center text-xs font-semibold ${m.chrome === "dark" ? "text-white/50" : "text-gray-500"}`}>{m.title}</span>
            </div>

            <div>
              {active === 0 && (
                <div className="bg-[#f3f2f8] px-6 py-9" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                  <p className="mb-8 text-center text-sm font-medium text-gray-500">{m.subtitle}</p>
                  <GhlFlow />
                  <div className="mt-8 flex min-w-max flex-wrap justify-center gap-3">
                    {[{ icon: Zap, label: "GoHighLevel CRM" }, { icon: PenTool, label: "E-Sign & Docs" }, { icon: Sparkles, label: "AI Assistant" }].map((p) => {
                      const Icon = p.icon;
                      return <span key={p.label} className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm"><Icon size={14} className="text-persian" />{p.label}</span>;
                    })}
                  </div>
                </div>
              )}
              {active === 1 && <TriggerFlow />}
              {active === 2 && (
                <div className="bg-[#14141a] p-6 sm:p-8">
                  <p className="mb-6 text-center text-sm font-medium text-white/45">{m.subtitle}</p>
                  <N8nFlow />
                </div>
              )}
            </div>
          </div>
          </FitToWidth>
        </div>
      </ScrollReveal>
    </section>
  );
}
