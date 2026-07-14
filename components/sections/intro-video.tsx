"use client";

import { useState } from "react";

const VIDEO_ID = "0QT3jCMCT74";

export function IntroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative px-6 pt-20 pb-6">
      <div className="mx-auto max-w-4xl">
        {/* Heading block */}
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            Get To Know Me
          </p>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Who I Am, How I Work, And What I{" "}
            <span className="text-persian-light">Actually Deliver.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
            A 90-second look behind the systems, the mindset, the
            workflow, and why my builds keep running long after I&apos;ve handed
            them over.
          </p>
        </div>

        {/* Section label above the frame */}
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
          Watch My Intro
        </p>

        <div
          className="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08]
            bg-gradient-to-br from-[#1a1245] via-[#0f0a25] to-black
            shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              title="Get to know me, intro video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play intro video"
              className="absolute inset-0 h-full w-full cursor-pointer"
            >
              {/* Poster */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Get to know me, intro video"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/15" />

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full
                    border border-white/[0.18] bg-white/[0.08] backdrop-blur-sm
                    shadow-[0_8px_32px_rgba(94,23,235,0.25)]
                    transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow group-hover:border-yellow"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-1 transition-colors group-hover:fill-black"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
