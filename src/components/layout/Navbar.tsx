"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const updateScrollState = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 24);
  });

  useEffect(() => {
    updateScrollState();

    const onScroll = () => {
      updateScrollState();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "site-container flex h-16 items-center justify-between gap-6 rounded-full border px-4 transition-all duration-300 sm:px-6",
          isScrolled
            ? "border-slate-200/80 bg-white/82 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        <a
          href="#hero"
          className="interactive-link text-base font-semibold tracking-[-0.03em] text-slate-950"
        >
          Raul
        </a>

        <nav
          aria-label="Primary"
          className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex items-center gap-1.5 whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "interactive-link rounded-full px-3 py-2 text-sm font-medium text-slate-600 sm:px-4",
                    "hover:bg-slate-950 hover:text-white",
                    isScrolled
                      ? "hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)]"
                      : "hover:bg-white/90 hover:text-slate-950",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
