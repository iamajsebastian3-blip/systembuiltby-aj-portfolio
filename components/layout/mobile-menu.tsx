"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Revenue Tools", href: "/revenue" },
  { label: "Featured Work", href: "/portfolio" },
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0d0d0d] border-l border-white/10 md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-bold text-sm uppercase tracking-wide">
                <span className="text-white">System-Built </span>
                <span className="text-yellow">by AJ</span>
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`px-3 py-2.5 rounded-md text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-persian/15 text-persian-light font-medium"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 border-t border-white/10" />

              <Link
                href="/consult"
                onClick={onClose}
                className="flex items-center justify-center px-4 py-2.5 bg-yellow text-black text-sm font-bold rounded-md hover:bg-yellow-dark transition-colors"
              >
                Free Consultation
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
