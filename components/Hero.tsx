"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { heroStats, profile } from "@/lib/data";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero-pill, .hero-sub, .hero-cta-item, .hero-stats", { y: 16 });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(headlineRef.current, {
          type: "words, chars",
          wordsClass: "hero-word",
          charsClass: "hero-char",
        });
        gsap.set(headlineRef.current, { opacity: 1 });
        gsap.set(split.chars, { filter: "blur(10px)" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-pill", { opacity: 1, y: 0, duration: 0.6 })
          .to(
            split.chars,
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.018 },
            "-=0.3",
          )
          .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
          .to(".hero-cta-item", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .to(".hero-stats", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .add(() => {
            gsap.utils.toArray<HTMLElement>(".hero-stat-value").forEach((el) => {
              const target = Number(el.dataset.value);
              const counter = { val: 0 };
              gsap.to(counter, {
                val: target,
                duration: 1.1,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(counter.val)).padStart(2, "0");
                },
              });
            });
          }, "<");

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(headlineRef.current, { opacity: 1 });
        gsap.set(".hero-pill, .hero-sub, .hero-cta-item, .hero-stats", { opacity: 1, y: 0 });
      });
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      className="scroll-mt-24 mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24"
    >
      <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
        <div>
          <div className="glass hero-pill gsap-reveal inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
            </span>
            Open to full-time roles, graduating {profile.gradYear}
          </div>

          <h1
            ref={headlineRef}
            className="gsap-reveal mt-8 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            {profile.headline}
          </h1>

          <p className="hero-sub gsap-reveal mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="hero-cta-item gsap-reveal rounded-full bg-violet px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet/25 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/30 dark:text-[#0b0b14]"
            >
              Email me
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="glass hero-cta-item gsap-reveal rounded-full px-6 py-2.5 text-sm font-medium text-text transition-transform duration-300 hover:-translate-y-0.5"
            >
              Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass hero-cta-item gsap-reveal rounded-full px-6 py-2.5 text-sm font-medium text-text transition-transform duration-300 hover:-translate-y-0.5"
            >
              View GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hero-cta-item gsap-reveal text-sm font-medium text-text-muted transition-colors duration-300 hover:text-violet"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="glass hero-stats gsap-reveal mt-14 grid grid-cols-3 gap-6 rounded-2xl p-6 lg:mt-3 lg:w-56 lg:grid-cols-1 lg:gap-7">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <span
                data-value={stat.value}
                className="hero-stat-value font-display text-3xl font-semibold tracking-tight text-violet"
              >
                {String(stat.value).padStart(2, "0")}
              </span>
              <p className="mt-1 text-xs leading-snug text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
