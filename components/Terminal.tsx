"use client";

import { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { focusAreas, profile } from "@/lib/data";

gsap.registerPlugin(TextPlugin);

const lines = [
  { prompt: "whoami", output: `${profile.name} — ${profile.role}` },
  { prompt: "cat mission.txt", output: profile.headline },
  { prompt: "ls focus/", output: focusAreas.slice(0, 5).join("  ") },
  {
    prompt: "./status --check",
    output: `✓ open to full-time roles · graduating ${profile.gradYear}`,
  },
];

export default function Terminal() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".term-output", { opacity: 0, y: 6 });
        gsap.set(".term-cursor", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });

        lines.forEach((line, i) => {
          tl.to(`.term-prompt-${i}`, {
            text: line.prompt,
            duration: Math.max(line.prompt.length * 0.045, 0.3),
            ease: "none",
          }).to(
            `.term-output-${i}`,
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "+=0.1",
          );
        });

        tl.to(".term-cursor", { opacity: 1, duration: 0.15 }).to(".term-cursor", {
          opacity: 0,
          duration: 0.5,
          ease: "steps(1)",
          repeat: -1,
          yoyo: true,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".term-prompt").forEach((el, i) => {
          el.textContent = lines[i].prompt;
        });
        gsap.set(".term-output", { opacity: 1, y: 0 });
        gsap.set(".term-cursor", { opacity: 1 });
      });
    },
    { scope },
  );

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 sm:pb-20">
      <div ref={scope} className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center gap-1.5 border-b border-line/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-text-muted">
            raahul@portfolio — zsh
          </span>
        </div>
        <div className="space-y-4 p-6 font-mono text-sm sm:p-8">
          {lines.map((line, i) => (
            <div key={line.prompt}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-violet">➜</span>
                <span className={`term-prompt term-prompt-${i} text-text`} />
              </div>
              <p
                className={`term-output term-output-${i} mt-1 pl-5 leading-relaxed text-text-muted`}
              >
                {line.output}
              </p>
            </div>
          ))}
          <span className="term-cursor inline-block h-4 w-[7px] translate-y-0.5 bg-violet" />
        </div>
      </div>
    </section>
  );
}
