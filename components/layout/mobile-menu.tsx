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

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "System Builds", href: "/system-builds" },
  { label: "Funnels & Websites", href: "/projects" },
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

            {/* Nav */}
            <nav className="px-4 pt-4">
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  const cls = `flex items-center rounded-lg border-l-2 px-3 py-3 text-lg font-semibold transition-colors ${
                    active
                      ? "border-yellow bg-white/[0.07] text-white"
                      : "border-transparent text-white/70 hover:bg-white/[0.05] hover:text-white"
                  }`;
                  return (
                    <Link key={item.href} href={item.href} onClick={onClose} className={cls}>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Free Consultation CTA — extra space above */}
            <div className="mt-12 px-4">
              <Link
                href="/consult"
                onClick={onClose}
                className="flex items-center justify-center rounded-lg bg-yellow px-4 py-3 text-base font-bold text-black transition-colors hover:bg-yellow-dark"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
