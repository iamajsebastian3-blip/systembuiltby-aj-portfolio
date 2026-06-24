"use client";

import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const mentors = [
  {
    name: "Jay-Cee Tan",
    alias: "Cece Tan",
    emoji: "🤖",
    role: "GoHighLevel Educator · Automation Expert",
    image: "/mentors/cece-tan.webp",
    description:
      "One of the leading GoHighLevel educators and automation experts in the Philippines. Through her training programs and community, I developed a strong foundation in CRM systems, sales funnels, lead generation, workflow automation, and client delivery using GoHighLevel.",
  },
  {
    name: "RJ Martinez",
    alias: "Kuys RJ",
    emoji: "⚡",
    role: "AI Automation · Technical VA Educator",
    image: "/mentors/kuys-rj.webp",
    description:
      "A respected AI Automation and Technical VA educator known for helping professionals leverage AI tools to streamline business operations. His teachings expanded my understanding of AI workflows, process automation, productivity systems, and practical AI implementation for businesses.",
  },
  {
    name: "Nuno Tavares",
    alias: null as string | null,
    emoji: "🧠",
    role: "GoHighLevel + AI · Automation Strategist",
    image: "/mentors/nuno-tavares.webp",
    description:
      "An internationally recognized GoHighLevel expert, automation strategist, and educator. Nuno is known for combining GoHighLevel with modern AI tools such as Claude to build scalable business systems. Through his content and training, I gained deeper insights into advanced GHL architecture, AI-assisted development, automation strategy, and system design.",
  },
  {
    name: "Nate Herk",
    alias: null as string | null,
    emoji: "🔥",
    role: "AI Entrepreneur · AI Agents & Automation",
    image: "/mentors/nate-herk.webp",
    description:
      "A leading AI entrepreneur and educator known for teaching businesses and agencies how to leverage Claude, AI agents, and automation systems to increase productivity and scale operations. His content helped me understand AI-powered workflows, prompt engineering, AI business systems, and practical applications of AI in client delivery.",
  },
];

export function MentorsContent() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
        {/* Hero */}
        <section className="bg-persian/20 backdrop-blur-xl px-6 py-16 md:py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow">
                I Learned From the Best
              </p>
              <h1 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
                The Mentors Who Shaped My Craft
              </h1>
              <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-lg">
                I didn&apos;t figure this out alone. I enrolled in their courses, invested in
                their programs, and learned directly from the people leading the GoHighLevel,
                automation, and AI space — and their teaching shaped how I build.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mentors */}
        <section className="relative px-6 py-14 md:py-20">
          <div className="pointer-events-none absolute left-[10%] top-1/4 h-[400px] w-[400px] rounded-full bg-persian/10 blur-[120px]" />
          <div className="relative mx-auto max-w-[1050px] space-y-16 md:space-y-24">
            {mentors.map((m, i) => {
              const reverse = i % 2 === 1;
              return (
                <ScrollReveal key={m.name}>
                  <div className="grid items-center gap-7 md:grid-cols-2 md:gap-12">
                    {/* Image */}
                    <div className={reverse ? "md:order-2" : ""}>
                      <div className="relative mx-auto max-w-[340px] md:max-w-[420px]">
                        <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-br from-yellow/25 via-transparent to-persian/30 opacity-70 blur-lg" />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-yellow/20 bg-[#120c2a]">
                          <Image
                            src={m.image}
                            alt={m.name}
                            fill
                            sizes="(max-width: 768px) 90vw, 420px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Text */}
                    <div className={reverse ? "md:order-1" : ""}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
                        {m.role}
                      </p>
                      <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-[32px]">
                        <span className="mr-1">{m.emoji}</span>
                        {m.name}
                        {m.alias && (
                          <span className="text-xl font-medium text-white/45"> ({m.alias})</span>
                        )}
                      </h2>
                      <p className="text-[15px] leading-relaxed text-white/65">{m.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Closing statement */}
            <ScrollReveal>
              <div className="mx-auto max-w-3xl border-t border-white/10 pt-12 text-center">
                <p className="text-[15px] leading-relaxed text-white/70 md:text-base">
                  I continuously invest in learning from industry leaders in GoHighLevel, AI
                  Automation, and Business Systems. By combining their proven methodologies with
                  hands-on client experience, I design and implement AI-powered automation systems,
                  intelligent workflows, and business-process solutions that help companies reduce
                  manual work, improve efficiency, and scale operations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <ScrollReveal>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
              <p className="text-sm text-white/55">
                Want a system built by someone who learned from the best?
              </p>
              <Link
                href="/consult"
                className="inline-flex items-center gap-2 rounded-[9px] bg-yellow px-7 py-3 text-sm font-extrabold text-black transition-all duration-200 hover:translate-y-[-2px] hover:bg-yellow-dark hover:shadow-[0_8px_28px_rgba(246,203,31,0.35)]"
              >
                Book a Free Consultation →
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </PageTransition>
  );
}
