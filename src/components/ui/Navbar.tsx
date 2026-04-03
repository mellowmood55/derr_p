"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "About", href: "/about" },
  { label: "Certifications", href: "/credentials" },
  { label: "Contact", href: "/contact" },
];

const HOME_SECTIONS = ["home", "experience", "education"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionElements = HOME_SECTIONS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        setActiveSection(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const activeHref = useMemo(() => {
    if (pathname === "/credentials") {
      return "/credentials";
    }

    if (pathname === "/contact") {
      return "/contact";
    }

    if (pathname === "/about") {
      return "/about";
    }

    return `/#${activeSection}`;
  }, [activeSection, pathname]);

  const isActive = (href: string) => {
    return href === activeHref;
  };

  const linkClassName = (href: string) =>
    [
      "group inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition duration-200",
      "shadow-[0_0_0_1px_rgba(250,204,21,0.05)]",
      isActive(href)
        ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_0_24px_-8px_rgba(250,204,21,0.75)]"
        : "border-yellow-500/20 bg-black text-zinc-200 hover:border-yellow-400/70 hover:bg-yellow-400 hover:text-black active:bg-yellow-500 active:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-500/20 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
          Derrick Adang
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClassName(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-yellow-500/40 p-2 text-zinc-100 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav className="space-y-2 border-t border-yellow-500/20 bg-neutral-900 px-4 py-3 md:hidden">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => {
                setIsOpen(false);
              }}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClassName(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
