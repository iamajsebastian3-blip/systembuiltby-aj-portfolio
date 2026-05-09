"use client";

const toolkitItems = [
  { name: "GoHighLevel", logo: "/logos/gohighlevel.png" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "ChatGPT", logo: "/logos/openai.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
  { name: "Canva", logo: "/logos/canva.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "ClickUp", logo: "/logos/clickup.svg" },
  { name: "Google Meet", logo: "/logos/googlemeet.svg" },
  { name: "Brave", logo: "/logos/brave.svg" },
];

export function ToolkitMarquee() {
  const tripled = [...toolkitItems, ...toolkitItems, ...toolkitItems];

  return (
    <section className="relative overflow-hidden py-10">
      <div className="mx-auto mb-8 max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/40">
          Toolkit I Use Daily
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-[#08060e] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-[#08060e] to-transparent" />

        <div className="marquee-scroll flex gap-4 whitespace-nowrap">
          {tripled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-xl border border-white/[0.08]
                bg-white/[0.04] px-4 py-3 backdrop-blur-sm
                transition-all hover:-translate-y-[2px] hover:border-white/[0.16] hover:bg-white/[0.07]
                hover:shadow-[0_8px_24px_rgba(94,23,235,0.18)]"
            >
              {/* White tile so every brand mark renders consistently */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-white/85 group-hover:text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
