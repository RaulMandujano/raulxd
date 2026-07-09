"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) {
        setIsMenuOpen(false);
      }
    };

    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "site-container flex h-16 items-center justify-between gap-6",
          // The pill only exists on desktop (mobile floats its own chips). It's
          // always visible now, but translucent frosted glass so the backdrop
          // shows through instead of disappearing at the top of the page.
          "md:rounded-full md:border md:border-white/30 md:bg-white/15 md:px-6 md:shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)] md:backdrop-blur-sm",
        )}
      >
        <a
          href="#hero"
          aria-label="Raul — back to top"
          className={cn(
            "group flex items-center gap-2.5",
            // Own chip background on mobile; blends into the pill on desktop.
            "rounded-full border border-slate-200/80 bg-white/85 py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.5)] backdrop-blur-xl",
            "md:border-transparent md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none",
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/70 shadow-[0_8px_22px_-12px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
            <Image
              src="/raul_favicon.png"
              alt="Raul"
              width={36}
              height={36}
              priority
              unoptimized
              className="h-full w-full object-cover"
            />
          </span>
          <span className="interactive-link text-base font-semibold tracking-[-0.03em] text-slate-950">
            Raul
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1.5 whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "interactive-link rounded-full px-3 py-2 text-sm font-medium text-slate-600 lg:px-4",
                    "hover:bg-slate-950 hover:!text-white",
                    "hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={cn(
            "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-slate-200/80 bg-white/85 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-colors duration-300 md:hidden",
          )}
        >
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMenuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-slate-900 transition-opacity duration-200",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMenuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="site-container overflow-hidden md:hidden"
          >
            <ul className="mt-2 space-y-1 rounded-3xl border border-slate-200/80 bg-white/90 p-2 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-950 hover:!text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
