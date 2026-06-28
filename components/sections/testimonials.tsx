"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

type TextTestimonial = {
  type: "text";
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

type VideoTestimonial = {
  type: "video";
  name: string;
  role: string;
  videoId: string;
};

type Testimonial = TextTestimonial | VideoTestimonial;

const testimonials: Testimonial[] = [
  {
    type: "text",
    name: "Patricia Villanueva",
    role: "COO · Brightpath Solutions",
    avatar: "/avatars/patricia.webp",
    quote:
      "AJ didn’t just ‘set up’ our HighLevel. He rebuilt the entire logic behind how our leads move. Before him, we had automations but no structure. Now everything flows perfectly.",
  },
  {
    type: "video",
    name: "Josh Broach",
    role: "Retirement Consultant for Teachers",
    videoId: "VAuLfl_P5ms",
  },
  {
    type: "text",
    name: "Daniel Reyes",
    role: "Founder & CEO · Northgate Consulting",
    avatar: "/avatars/daniel.webp",
    quote:
      "We hired AJ to fix broken workflows. What we got was a fully engineered sales infrastructure. He mapped the pipeline, corrected trigger logic, and eliminated every bottleneck.",
  },
];

const Stars = () => (
  <p className="mb-4 text-xs tracking-[3px] text-yellow/80">
    &#9733; &#9733; &#9733; &#9733; &#9733;
  </p>
);

function TextCard({ t }: { t: TextTestimonial }) {
  return (
    <div className="flex h-full flex-col p-6 rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:-translate-y-[2px] hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      <Stars />
      <p className="mb-6 flex-1 text-[0.8rem] leading-relaxed text-white/45">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="h-px bg-white/[0.06] mb-4" />
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-2 ring-white/[0.08]"
        />
        <div>
          <p className="text-sm font-bold text-persian-light">{t.name}</p>
          <p className="text-xs text-white/30">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ t }: { t: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`;

  return (
    <div className="group relative h-full min-h-[340px] overflow-hidden rounded-xl border border-white/[0.07] bg-black/40 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
          title={`${t.name} testimonial`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play ${t.name} video testimonial`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Poster */}
          <img
            src={poster}
            alt={`${t.name} video testimonial`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/55 transition-colors group-hover:from-black/45 group-hover:to-black/45" />

          {/* Name label */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.12] text-xs font-bold text-white ring-2 ring-white/20 backdrop-blur-sm">
              {t.name.charAt(0)}
            </span>
            <div className="text-left">
              <p className="text-sm font-bold leading-tight text-white drop-shadow">
                {t.name}
              </p>
              <p className="text-[11px] leading-tight text-white/70 drop-shadow">
                {t.role}
              </p>
            </div>
          </div>

          {/* Star rating */}
          <span className="absolute left-4 bottom-4 text-xs tracking-[3px] text-yellow drop-shadow">
            &#9733; &#9733; &#9733; &#9733; &#9733;
          </span>

          {/* Red YouTube play button */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#FF0000] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-0 right-[20%] w-[400px] h-[400px] bg-persian/10 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
              System Feedback
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
              What Clients Say
            </h2>
          </div>
        </ScrollReveal>

        {/* Outer glass container */}
        <ScrollReveal>
          <div className="rounded-2xl p-5 md:p-7 bg-white/[0.03] backdrop-blur-md border border-white/[0.06]">
            <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="h-full">
                  {t.type === "video" ? (
                    <VideoCard t={t} />
                  ) : (
                    <TextCard t={t} />
                  )}
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
