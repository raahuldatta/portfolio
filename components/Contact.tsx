"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ROOT_ID = "root";

const channels = [
  { id: "Resume", label: "Resume", value: "Download PDF", href: profile.resumeUrl },
  { id: "Email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { id: "LinkedIn", label: "LinkedIn", value: "linkedin.com/in/raahuldatta", href: profile.linkedin },
  { id: "GitHub", label: "GitHub", value: "github.com/raahuldatta", href: profile.github },
  { id: "LeetCode", label: "LeetCode", value: "leetcode.com/raahuldatta", href: profile.leetcode },
  { id: "CodeChef", label: "CodeChef", value: "codechef.com/users/raahuldatta", href: profile.codechef },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const revealedRef = useRef(false);
  const [copied, setCopied] = useState(false);

  const connections = useMemo(
    () => channels.map((c) => ({ id: `link::${c.id}`, from: ROOT_ID, to: c.id })),
    [],
  );

  function registerNode(id: string, el: HTMLElement | null) {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  }

  function registerPath(id: string, el: SVGPathElement | null) {
    if (el) pathRefs.current.set(id, el);
    else pathRefs.current.delete(id);
  }

  function layout() {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    function point(id: string, edge: "top" | "bottom") {
      const el = nodeRefs.current.get(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: (edge === "top" ? r.top : r.bottom) - containerRect.top,
      };
    }

    connections.forEach((c) => {
      const path = pathRefs.current.get(c.id);
      const p1 = point(c.from, "bottom");
      const p2 = point(c.to, "top");
      if (!path || !p1 || !p2) return;
      const midY = (p1.y + p2.y) / 2;
      path.setAttribute(
        "d",
        `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`,
      );
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = revealedRef.current ? "0" : `${len}`;
    });
  }

  useLayoutEffect(() => {
    layout();
    const container = containerRef.current;
    const ro = new ResizeObserver(() => layout());
    if (container) ro.observe(container);
    window.addEventListener("resize", layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".contact-fade", { y: 16 });
        gsap.set(".contact-root-node, .contact-channel-node", { opacity: 0, y: 14, scale: 0.9 });

        const pathEls = connections
          .map((c) => pathRefs.current.get(c.id))
          .filter((el): el is SVGPathElement => Boolean(el));

        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 82%", once: true },
          onComplete: () => {
            revealedRef.current = true;
          },
        });

        tl.to(".contact-fade", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(
            ".contact-root-node",
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
            "-=0.2",
          )
          .to(
            ".contact-root-glow",
            { opacity: 0.55, scale: 1.15, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" },
            "-=0.3",
          )
          .to(
            pathEls,
            { strokeDashoffset: 0, duration: 0.5, stagger: 0.06, ease: "power2.inOut" },
            "-=1.2",
          )
          .to(
            ".contact-channel-node",
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
            "-=0.5",
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-fade", { opacity: 1, y: 0 });
        gsap.set(".contact-root-node, .contact-channel-node", { opacity: 1, y: 0, scale: 1 });
        Array.from(pathRefs.current.values()).forEach((p) => {
          p.style.strokeDashoffset = "0";
        });
        revealedRef.current = true;
      });
    },
    { scope: sectionRef },
  );

  function handleChannelHover(id: string, active: boolean) {
    const path = pathRefs.current.get(`link::${id}`);
    if (!path) return;
    gsap.to(path, {
      strokeOpacity: active ? 0.85 : 0.35,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  async function copyEmail(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <footer id="contact" className="scroll-mt-24 pb-10">
      <div ref={sectionRef} className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="contact-fade gsap-reveal font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s get in touch.
        </h2>
        <p className="contact-fade gsap-reveal mt-3 max-w-[55ch] text-text-muted">
          Open to full-time Software Engineering, backend, and AI/ML roles for{" "}
          {profile.gradYear}. Pick a channel below — the fastest way to reach me is email.
        </p>

        <div ref={containerRef} className="relative mt-16">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {connections.map((c) => (
              <path
                key={c.id}
                ref={(el) => registerPath(c.id, el)}
                fill="none"
                style={{ stroke: "var(--violet)", strokeWidth: 1.5, strokeLinecap: "round" }}
                strokeOpacity={0.35}
              />
            ))}
          </svg>

          <div className="relative z-10 mx-auto w-fit">
            <span
              className="contact-root-glow pointer-events-none absolute inset-0 -z-10 rounded-full bg-violet blur-2xl"
              style={{ opacity: 0 }}
            />
            <div
              ref={(el) => registerNode(ROOT_ID, el)}
              className="contact-root-node rounded-2xl bg-violet px-8 py-4 text-center font-display text-lg font-semibold text-white shadow-lg shadow-violet/25 dark:text-[#0b0b14]"
            >
              {profile.shortName}
            </div>
          </div>

          <div className="relative z-10 mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {channels.map((channel) => {
              const isEmail = channel.id === "Email";
              const external = !channel.href.startsWith("mailto:");
              return (
                <div key={channel.id} className="relative">
                  <a
                    ref={(el) => registerNode(channel.id, el as HTMLElement | null)}
                    href={channel.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    onMouseEnter={() => handleChannelHover(channel.id, true)}
                    onMouseLeave={() => handleChannelHover(channel.id, false)}
                    className="contact-channel-node glass group flex h-full flex-col justify-center gap-1 rounded-2xl px-4 py-4 text-center transition-colors duration-300 hover:text-violet"
                  >
                    <span className="text-sm font-medium text-text transition-colors duration-300 group-hover:text-violet">
                      {channel.label}
                    </span>
                    <span className="truncate font-mono text-xs text-text-muted transition-colors duration-300 group-hover:text-violet">
                      {copied && isEmail ? "Copied!" : channel.value}
                    </span>
                  </a>
                  {isEmail ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg hover:text-violet"
                    >
                      {copied ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="12" height="12" rx="2" />
                          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </svg>
                      )}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {profile.name}.</p>
          <p>Build, learn, experiment, and repeat — never stop asking why.</p>
        </div>
      </div>
    </footer>
  );
}
