"use client";

const toolkitItems = [
  {
    name: "GoHighLevel",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#00C853" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontWeight="900" fontSize="18" fontFamily="Inter, sans-serif">G</text>
      </svg>
    ),
  },
  {
    name: "Zapier",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#FF4A00" />
        <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1e1e1e" />
        <circle cx="16" cy="14" r="3.5" fill="#F24E1E" />
        <circle cx="24" cy="14" r="3.5" fill="#FF7262" />
        <circle cx="16" cy="22" r="3.5" fill="#A259FF" />
        <circle cx="24" cy="22" r="3.5" fill="#1ABCFE" />
        <circle cx="16" cy="30" r="3.5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: "Claude",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#D4A574" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontWeight="800" fontSize="20" fontFamily="Georgia, serif">C</text>
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#10A37F" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontWeight="800" fontSize="16" fontFamily="Inter, sans-serif">AI</text>
      </svg>
    ),
  },
  {
    name: "VS Code",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#007ACC" />
        <path d="M28 10L16 20L28 30V10Z" fill="white" fillOpacity="0.9" />
        <path d="M16 20L11 16V24L16 20Z" fill="white" fillOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Canva",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#00C4CC" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontWeight="800" fontSize="20" fontFamily="Inter, sans-serif">C</text>
      </svg>
    ),
  },
];

export function ToolkitMarquee() {
  const tripled = [...toolkitItems, ...toolkitItems, ...toolkitItems];

  return (
    <section className="relative py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/25">
          Toolkit I Use Daily
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#08060e] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#08060e] to-transparent" />

        <div className="flex marquee-scroll gap-6 whitespace-nowrap">
          {tripled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-4 shrink-0 rounded-2xl px-7 py-4
                bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
                transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
            >
              {item.logo}
              <span className="text-base font-bold text-white/60">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
