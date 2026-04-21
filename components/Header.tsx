"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        isScrolled
          ? "bg-forest-cream/90 shadow-warm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell">
        <nav className="flex h-16 items-center justify-between">
          <a href="#hero" className="font-serif text-xl text-forest-bark">
            Аня и Марк
          </a>

          <button
            className="rounded-full border border-forest-bark/20 p-2 text-forest-bark md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Открыть меню"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <ul className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  className="text-sm text-forest-bark transition hover:text-forest-moss"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          id="mobile-nav"
          className="border-t border-forest-bark/10 bg-forest-cream/95 md:hidden"
        >
          <ul className="section-shell space-y-3 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-sm text-forest-bark hover:bg-forest-mist"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
