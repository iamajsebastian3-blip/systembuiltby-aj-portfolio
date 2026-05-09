"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

interface DropdownItem {
  label: string;
  emoji: string;
  href: string;
  description: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
  dividerAfter?: number;
}

const solutionsDropdown: NavDropdown = {
  label: "Gallery",
  items: [
    { label: "About", emoji: "\u{1F91D}", href: "/about", description: "Who I am & how I work" },
    { label: "Portfolio", emoji: "\u{1F4C1}", href: "/projects", description: "Automations, funnels, websites, apps" },
    { label: "Services", emoji: "\u{1F9E9}", href: "/services", description: "All 8 service categories" },
    { label: "Packages", emoji: "\u{1F4E6}", href: "/packages", description: "Starter \u00B7 Growth \u00B7 Scale" },
  ],
};

const workDropdown: NavDropdown = {
  label: "Link",
  items: [
    { label: "GHL Funnel", emoji: "\u{1F525}", href: "https://ajautomate.co/system-builtby-aj", description: "GoHighLevel funnel showcase" },
    { label: "Featured Funnel", emoji: "\u{1F3AF}", href: "https://convert.ajautomate.co/", description: "Live funnel showcase" },
    { label: "Featured Website", emoji: "\u{1F310}", href: "https://webstudio.ajautomate.co/index.html", description: "Live website showcase" },
  ],
};

const toolsDropdown: NavDropdown = {
  label: "Tools",
  items: [
    { label: "All Tools", emoji: "\u{1F9F0}", href: "/tools", description: "Browse every free tool" },
    { label: "GHL Full Audit", emoji: "\u{1F525}", href: "/tools/ghl-audit", description: "Health-scan any GHL sub-account" },
    { label: "Revenue Audit", emoji: "\u{1F4CA}", href: "/tools/revenue-audit", description: "Find the leaks. Quantify the upside." },
    { label: "Email Health Tools", emoji: "\u{1F4E7}", href: "/tools/email-health", description: "Domain, sender & deliverability checks" },
    { label: "Process Map", emoji: "\u{1F5FA}\u{FE0F}", href: "/tools/process-map", description: "Render GHL workflow diagrams from Mermaid" },
  ],
  dividerAfter: 0,
};

const routeToActiveNav: Record<string, string> = {
  "/": "Home",
  "/about": "Gallery",
  "/projects": "Gallery",
  "/packages": "Gallery",
  "/services": "Gallery",
  "/tools": "Tools",
  "/tools/ghl-audit": "Tools",
  "/tools/revenue-audit": "Tools",
  "/tools/email-health": "Tools",
  "/tools/process-map": "Tools",
  "/consult": "Home",
  "/portfolio": "Link",
};

function getActiveNav(pathname: string): string {
  return routeToActiveNav[pathname] || "";
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Image
          src="/aj-logo.png"
          alt="System-Built By AJ"
          width={120}
          height={120}
          className="object-contain"
          priority
        />
      </div>
      <span className="font-black uppercase text-sm tracking-wide">
        <span className="text-white">SYSTEM-BUILT </span>
        <span className="text-yellow">BY AJ</span>
      </span>
    </Link>
  );
}

function DropdownMenu({
  dropdown,
  isOpen,
  onToggle,
  dropdownRef,
}: {
  dropdown: NavDropdown;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
      >
        {dropdown.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute top-full left-0 mt-3 w-64 bg-[#0d0b14]/90 backdrop-blur-xl border border-white/[0.08] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {dropdown.items.map((item, index) => (
            <div key={item.href}>
              {dropdown.dividerAfter !== undefined &&
                index === dropdown.dividerAfter + 1 && (
                  <div className="my-1 mx-3 border-t border-white/10" />
                )}
              <Link
                href={item.href}
                className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
              >
                <span className="text-base mt-0.5">{item.emoji}</span>
                <div>
                  <div className="text-sm text-white group-hover:text-yellow transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const activeNav = getActiveNav(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const solutionsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        openDropdown &&
        !solutionsRef.current?.contains(target) &&
        !workRef.current?.contains(target) &&
        !toolsRef.current?.contains(target)
      ) {
        setOpenDropdown(null);
      }
    },
    [openDropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#08060e]/80 backdrop-blur-xl border-b border-white/[0.06] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(94,23,235,0.15)]" : ""
        }`}
      >
        <nav className="mx-auto max-w-[1280px] px-4 sm:px-6 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                activeNav === "Home"
                  ? "text-persian-light font-medium"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Home
            </Link>

            <DropdownMenu
              dropdown={solutionsDropdown}
              isOpen={openDropdown === "Gallery"}
              onToggle={() => toggleDropdown("Gallery")}
              dropdownRef={solutionsRef}
            />

            <DropdownMenu
              dropdown={toolsDropdown}
              isOpen={openDropdown === "Tools"}
              onToggle={() => toggleDropdown("Tools")}
              dropdownRef={toolsRef}
            />

            <DropdownMenu
              dropdown={workDropdown}
              isOpen={openDropdown === "Work"}
              onToggle={() => toggleDropdown("Work")}
              dropdownRef={workRef}
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <Link
              href="/consult"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-yellow text-black text-sm font-bold rounded-md hover:bg-yellow-dark transition-colors"
            >
              Free Consultation
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 text-white/70 hover:text-white"
              aria-label="Open menu"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="21" y2="1" />
                <line x1="1" y1="8" x2="21" y2="8" />
                <line x1="1" y1="15" x2="21" y2="15" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
