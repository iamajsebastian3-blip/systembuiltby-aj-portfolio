"use client";

import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

const modules = [
  {
    id: "MOD_01",
    title: "Structure Before Scale",
    body: "I build the foundation first so growth doesn't break your business architecture.",
  },
  {
    id: "MOD_02",
    title: "Systems Over Tools",
    body: "Tools change. Logic doesn't. I build the infrastructure layer, not the software dependency.",
  },
  {
    id: "MOD_03",
    title: "Clarity and Execution",
    body: "Every trigger, tag, and transition serves a measurable function. No wasted motion. No orphaned steps.",
  },
  {
    id: "MOD_04",
    title: "Intentional Automation",
    body: "Automation should feel human — not mechanical. Scale without sacrificing experience.",
  },
];

export function Philosophy() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
            Methodology
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            The System-First Philosophy
          </h2>
        </div>

        {/* 2x2 grid */}
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {modules.map((mod) => (
            <StaggerItem key={mod.id}>
              <div className="group rounded-[14px] border border-white/[0.08] bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-yellow/30 hover:bg-white/[0.07]">
                <span className="mb-3 inline-block text-xs font-semibold tracking-widest text-yellow">
                  {mod.id}
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-white">
                  {mod.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {mod.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
