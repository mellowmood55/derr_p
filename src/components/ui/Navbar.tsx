"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Volunteering", href: "/volunteering" },
  { label: "Hobbies", href: "/hobbies" },
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

    if (pathname === "/volunteering") {
      return "/volunteering";
    }

    if (pathname === "/hobbies") {
      return "/hobbies";
    }

    if (pathname === "/about") {
      return "/about";
    }

    if (pathname === "/testimonials") {
      return "/testimonials";
    }

    return `/#${activeSection}`;
  }, [activeSection, pathname]);

  const isActive = (href: string) => {
    return href === activeHref;
  };

  const linkClassName = (href: string) =>
    [
      "group inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition duration-200",
      "shadow-[0_8px_18px_-14px_rgba(56,189,248,0.45)]",
      isActive(href)
        ? "border-sky-300/70 bg-sky-300/90 text-slate-950 shadow-[0_0_24px_-8px_rgba(56,189,248,0.75)]"
        : "border-slate-300/20 bg-[#080d18]/88 text-zinc-200 hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-sky-500/15 hover:text-sky-100 active:bg-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-300/15 bg-[#050a14]/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
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
          className="rounded-lg border border-sky-300/35 bg-sky-400/5 p-2 text-zinc-100 transition hover:bg-sky-400/10 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav className="space-y-2 border-t border-slate-300/20 bg-[#090f1b]/95 px-4 py-3 md:hidden">
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
