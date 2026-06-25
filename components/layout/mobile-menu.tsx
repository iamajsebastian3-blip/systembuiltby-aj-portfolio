"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type NavItem = { label: string; href: string; icon: string; external?: boolean };
type NavSection = { label: string; items: NavItem[] };

const navSections: NavSection[] = [
  {
    label: "Menu",
    items: [
      { label: "Home", href: "/", icon: "🏠" },
      { label: "About", href: "/about", icon: "🤝" },
      { label: "Mentors", href: "/mentors", icon: "🎓" },
      { label: "System Builds", href: "/system-builds", icon: "🎬" },
      { label: "Funnels & Websites", href: "/projects", icon: "🚀" },
      { label: "Services", href: "/services", icon: "🧩" },
      { label: "Packages", href: "/packages", icon: "📦" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "All Tools", href: "/tools", icon: "🧰" },
      { label: "GHL Full Audit", href: "/tools/ghl-audit", icon: "🔥" },
      { label: "Revenue Audit", href: "/tools/revenue-audit", icon: "📊" },
      { label: "Email Health", href: "/tools/email-health", icon: "📧" },
      { label: "Process Map", href: "/tools/process-map", icon: "🗺️" },
    ],
  },
  {
    label: "Links",
    items: [
      { label: "GHL Funnel", href: "https://ajautomate.co/system-builtby-aj", icon: "🔥", external: true },
      { label: "Featured Funnel", href: "https://convert.ajautomate.co/", icon: "🎯", external: true },
      { label: "Featured Website", href: "https://webstudio.ajautomate.co/index.html", icon: "🌐", external: true },
    ],
  },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 left-0 bottom-0 z-50 flex w-[290px] flex-col bg-[#0c0a17]/97 backdrop-blur-xl border-r border-white/[0.08] md:hidden"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[9px] bg-white/[0.06] ring-1 ring-white/[0.1]">
                  <Image src="/aj-logo.webp" alt="AJ" fill className="object-contain p-1" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-extrabold text-white">AJ</span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-yellow">
                    System-Built by AJ
                  </span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {navSections.map((section) => (
                <div key={section.label} className="mb-5 last:mb-0">
                  <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                    {section.label}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => {
                      const active = !item.external && pathname === item.href;
                      const cls = `group flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "border-yellow bg-white/[0.07] font-semibold text-white"
                          : "border-transparent text-white/65 hover:bg-white/[0.05] hover:text-white"
                      }`;
                      return item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className={cls}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/25">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      ) : (
                        <Link key={item.href} href={item.href} onClick={onClose} className={cls}>
                          <span className="text-base">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/[0.08] px-4 py-4">
              <Link
                href="/consult"
                onClick={onClose}
                className="mb-4 flex items-center justify-center rounded-lg bg-yellow px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-dark"
              >
                Free Consultation
              </Link>
              <p className="text-[11px] font-semibold text-white/40">System-Built by AJ</p>
              <p className="text-[11px] text-white/25">Allen Bactad</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
