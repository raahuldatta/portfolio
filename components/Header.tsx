"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative rounded-full px-3 py-1.5 text-text-muted transition-colors duration-300 hover:text-text"
    >
      {label}
      <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-violet transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass sticky top-4 z-20 mx-auto mt-4 w-[calc(100%-2rem)] max-w-5xl rounded-2xl">
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          {profile.shortName}
        </a>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="glass hidden rounded-full px-4 py-1.5 text-sm font-medium text-text transition-transform duration-300 hover:scale-105 sm:inline-block"
          >
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-violet px-4 py-1.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-105 sm:inline-block dark:text-[#0b0b14]"
          >
            Email me
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:text-text md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line/60 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-full px-3 py-2 text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex gap-2 px-3 sm:hidden">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex-1 rounded-full px-4 py-2 text-center text-sm font-medium text-text"
                >
                  Resume
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 rounded-full bg-violet px-4 py-2 text-center text-sm font-medium text-white dark:text-[#0b0b14]"
                >
                  Email me
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
