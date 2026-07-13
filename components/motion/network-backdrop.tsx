"use client";

import { Parallax } from "@/components/motion/parallax";

/**
 * Ambient AI-network backdrop: faint nodes + edges with violet→gold traveling
 * pulses (same visual language as the "Real systems, built to run" section).
 * Non-interactive; sits behind section content with symmetric edge fades so it
 * blends into the near-black page background.
 */
const nodes = [
  [120, 140], [320, 80], [520, 200], [240, 340], [60, 520], [420, 560],
  [700, 120], [880, 300], [1080, 160], [1260, 320], [1000, 520], [1300, 600],
  [760, 640], [1150, 700], [560, 400], [980, 720],
];
const edges = [
  [0, 1], [1, 2], [0, 3], [3, 4], [3, 5], [2, 6], [6, 7], [7, 8],
  [8, 9], [7, 10], [9, 11], [10, 13], [5, 12], [12, 10], [2, 7], [10, 11],
  [2, 14], [14, 5], [14, 7], [7, 15], [15, 12], [10, 15],
];
const pulses = [
  { e: [2, 6], dur: "3.6s", delay: "0s" },
  { e: [6, 7], dur: "4.1s", delay: "0.8s" },
  { e: [7, 8], dur: "3.4s", delay: "1.4s" },
  { e: [7, 10], dur: "4.4s", delay: "0.4s" },
  { e: [10, 13], dur: "3.9s", delay: "1.1s" },
  { e: [3, 5], dur: "4.2s", delay: "1.8s" },
  { e: [14, 7], dur: "3.7s", delay: "0.6s" },
  { e: [7, 15], dur: "4.0s", delay: "1.5s" },
];
const edgePath = (a: number, b: number) => `M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`;

export function NetworkBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="net-pulse" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="800">
            <stop offset="0%" stopColor="#5e17eb" />
            <stop offset="70%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f6cb1f" />
          </linearGradient>
          <filter id="net-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {edges.map(([a, b], i) => (
          <path key={`e-${i}`} d={edgePath(a, b)} stroke="#5e17eb" strokeOpacity={0.32} strokeWidth={1.5} fill="none" />
        ))}
        {pulses.map((p, i) => (
          <path
            key={`p-${i}`}
            className="circuit-pulse"
            d={edgePath(p.e[0], p.e[1])}
            stroke="url(#net-pulse)"
            strokeWidth={2.75}
            fill="none"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            filter="url(#net-glow)"
            style={{ ["--dur" as string]: p.dur, animationDelay: p.delay }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={`n-${i}`} cx={x} cy={y} r={3.5} fill="#7c3aed" fillOpacity={0.85} />
        ))}
      </svg>

      <Parallax className="absolute inset-0" speed={85}>
        <div className="absolute right-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-persian/20 blur-[150px]" />
        <div className="absolute bottom-[6%] left-[12%] h-[320px] w-[320px] rounded-full bg-yellow/10 blur-[140px]" />
      </Parallax>

      {/* symmetric edge fades so the network dissolves into the page bg */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#08060e] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08060e] to-transparent" />
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#08060e] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#08060e] to-transparent" />
    </div>
  );
}
