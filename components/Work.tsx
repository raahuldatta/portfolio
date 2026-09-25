"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { domainOrder, projects, type Project } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ROOT_ID = "root";
const ROOT_LABEL = "Software Engineering";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const revealedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const leafConnections = useMemo(
    () =>
      domainOrder.flatMap((domain) =>
        projects
          .filter((p) => p.domain === domain)
          .map((p) => ({ id: `leaf::${p.name}`, from: p.name, to: domain })),
      ),
    [],
  );

  const trunkConnections = useMemo(
    () => domainOrder.map((domain) => ({ id: `trunk::${domain}`, from: domain, to: ROOT_ID })),
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

    function draw(id: string, from: string, to: string) {
      const path = pathRefs.current.get(id);
      const p1 = point(from, "bottom");
      const p2 = point(to, "top");
      if (!path || !p1 || !p2) return;
      const midY = (p1.y + p2.y) / 2;
      path.setAttribute(
        "d",
        `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`,
      );
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = revealedRef.current ? "0" : `${len}`;
    }

    leafConnections.forEach((c) => draw(c.id, c.from, c.to));
    trunkConnections.forEach((c) => draw(c.id, c.from, c.to));
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
        gsap.set(".work-fade", { y: 16 });
        gsap.set(".flow-project-node, .flow-domain-node, .flow-root-node", {
          opacity: 0,
          y: 14,
          scale: 0.9,
        });

        const leafPathEls = leafConnections
          .map((c) => pathRefs.current.get(c.id))
          .filter((el): el is SVGPathElement => Boolean(el));
        const trunkPathEls = trunkConnections
          .map((c) => pathRefs.current.get(c.id))
          .filter((el): el is SVGPathElement => Boolean(el));

        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 82%", once: true },
          onComplete: () => {
            revealedRef.current = true;
          },
        });

        tl.to(".work-fade", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(
            ".flow-project-node",
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" },
            "-=0.2",
          )
          .to(
            leafPathEls,
            { strokeDashoffset: 0, duration: 0.5, stagger: 0.04, ease: "power2.inOut" },
            "-=0.25",
          )
          .to(
            ".flow-domain-node",
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
            "-=0.2",
          )
          .to(
            trunkPathEls,
            { strokeDashoffset: 0, duration: 0.55, stagger: 0.08, ease: "power2.inOut" },
            "-=0.15",
          )
          .to(
            ".flow-root-node",
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
            "-=0.2",
          )
          .to(
            ".flow-root-glow",
            { opacity: 0.55, scale: 1.15, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" },
            "-=0.3",
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".work-fade", { opacity: 1, y: 0 });
        gsap.set(".flow-project-node, .flow-domain-node, .flow-root-node", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        Array.from(pathRefs.current.values()).forEach((p) => {
          p.style.strokeDashoffset = "0";
        });
        revealedRef.current = true;
      });
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      if (selected) {
        gsap.to(panel, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.35, ease: "power3.in" });
      }
    },
    { dependencies: [selected], scope: containerRef },
  );

  function handleSelect(name: string) {
    const next = selected === name ? null : name;
    setSelected(next);
    if (next) {
      const project = projects.find((p) => p.name === next) ?? null;
      if (project) setActiveProject(project);
    }
  }

  return (
    <section id="work" className="scroll-mt-24">
      <div ref={sectionRef} className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="work-fade gsap-reveal font-display text-2xl font-semibold tracking-tight">
          Work
        </h2>
        <p className="work-fade gsap-reveal mt-3 max-w-[60ch] text-text-muted">
          Eight shipped projects, grouped by domain, converging on one discipline. Click a
          project to see the problem, the approach, and the source.
        </p>

        <div ref={containerRef} className="relative mt-14">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {leafConnections.map((c) => (
              <path
                key={c.id}
                ref={(el) => registerPath(c.id, el)}
                fill="none"
                style={{ stroke: "var(--violet)", strokeWidth: 1.5, strokeLinecap: "round" }}
                strokeOpacity={0.35}
              />
            ))}
            {trunkConnections.map((c) => (
              <path
                key={c.id}
                ref={(el) => registerPath(c.id, el)}
                fill="none"
                style={{ stroke: "var(--amber)", strokeWidth: 1.75, strokeLinecap: "round" }}
                strokeOpacity={0.5}
              />
            ))}
          </svg>

          <div className="relative z-10 grid gap-x-8 gap-y-14 lg:grid-cols-3">
            {domainOrder.map((domain) => {
              const items = projects.filter((p) => p.domain === domain);
              if (items.length === 0) return null;

              return (
                <div key={domain} className="flex flex-col items-center">
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {items.map((project) => (
                      <button
                        key={project.name}
                        type="button"
                        ref={(el) => registerNode(project.name, el)}
                        onClick={() => handleSelect(project.name)}
                        aria-pressed={selected === project.name}
                        className={`flow-project-node glass cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                          selected === project.name
                            ? "text-violet ring-1 ring-violet"
                            : "text-text hover:text-violet"
                        }`}
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>

                  <div
                    ref={(el) => registerNode(domain, el)}
                    className="flow-domain-node glass mt-8 w-fit rounded-2xl px-5 py-2.5"
                  >
                    <span className="flex items-center justify-center gap-2 text-sm font-medium text-text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                      {domain}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto mt-16 w-fit">
            <span
              className="flow-root-glow pointer-events-none absolute inset-0 -z-10 rounded-full bg-violet blur-2xl"
              style={{ opacity: 0 }}
            />
            <div
              ref={(el) => registerNode(ROOT_ID, el)}
              className="flow-root-node rounded-2xl bg-violet px-8 py-4 text-center font-display text-lg font-semibold text-white shadow-lg shadow-violet/25 dark:text-[#0b0b14]"
            >
              {ROOT_LABEL}
            </div>
          </div>

          <div
            ref={panelRef}
            className="relative z-10 overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            {activeProject ? (
              <div className="glass mt-8 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-lg font-semibold tracking-tight">
                      {activeProject.name}
                    </h4>
                    <p className="mt-1 text-sm text-text-muted">{activeProject.tagline}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close project details"
                    className="flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:text-violet"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Problem", value: activeProject.problem },
                    { label: "Approach", value: activeProject.approach },
                    { label: "Outcome", value: activeProject.outcome },
                  ].map((field) => (
                    <div key={field.label}>
                      <dt className="text-xs text-text-muted">{field.label}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed">{field.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {activeProject.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-bg px-2.5 py-0.5 font-mono text-xs text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={activeProject.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-amber transition-opacity hover:opacity-80"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  Verifiable, view source
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
