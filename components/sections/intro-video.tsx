"use client";

export function IntroVideo() {
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
            A 90-second look behind the systems &mdash; the mindset, the
            workflow, and why my builds keep running long after I&apos;ve handed
            them over.
          </p>
        </div>

        {/* Section label above the frame */}
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
          Watch My Intro
        </p>

        <div
          className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08]
            bg-gradient-to-br from-[#1a1245] via-[#0f0a25] to-black
            shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          {/* subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Center stack: play button + SOON */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="mb-5 flex h-20 w-20 items-center justify-center rounded-full
                border border-white/[0.18] bg-white/[0.06] backdrop-blur-sm
                shadow-[0_8px_32px_rgba(94,23,235,0.25)]"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <p className="text-5xl font-black tracking-[0.3em] text-white md:text-6xl">
              SOON
            </p>
            <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40">
              Intro Video Coming
            </p>
          </div>

          {/* corner badge */}
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-black/40 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="text-[0.55rem] font-bold uppercase tracking-widest text-white/70">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
