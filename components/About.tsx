"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { focusAreas, profile } from "@/lib/data";
import { fadeUp, fadeUpItem, popItem, staggerContainer, viewport } from "@/lib/motion";

export default function About() {
  const shapesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".focus-shape").forEach((el, i) => {
          gsap.to(el, {
            x: gsap.utils.random(-16, 16),
            y: gsap.utils.random(-12, 12),
            duration: gsap.utils.random(4.5, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.35,
          });

          if (el.dataset.spin === "true") {
            gsap.to(el, {
              rotate: 360,
              duration: gsap.utils.random(16, 28),
              repeat: -1,
              ease: "none",
            });
          }

          gsap.to(el, {
            scale: 1.15,
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.25,
          });
        });
      });
    },
    { scope: shapesRef },
  );

  return (
    <section id="about" className="scroll-mt-24 mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer(0.12)}
        className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16"
      >
        <div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl font-semibold tracking-tight"
          >
            About
          </motion.h2>
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            className="mt-5 max-w-[62ch] space-y-4 text-text-muted"
          >
            <motion.p variants={fadeUpItem}>
              I&apos;m a final-year Computer Science Engineering student at{" "}
              <span className="font-semibold text-text">{profile.school}</span> in{" "}
              {profile.location}, building production-grade software at the
              intersection of backend engineering, cloud infrastructure, and applied AI.
            </motion.p>
            <motion.p variants={fadeUpItem}>
              My work centers on shipping systems that are reliable, observable, and
              evidence-grounded — from FastAPI microservices and containerized
              deployments, to retrieval-augmented generation pipelines and multi-model
              arbitration. I care about correctness as much as capability: systems that
              don&apos;t just generate answers, but justify them.
            </motion.p>
            <motion.p variants={fadeUpItem}>
              I treat AI components as infrastructure to be tested, guarded, and
              monitored — not black boxes to be trusted blindly.
            </motion.p>
          </motion.div>
        </div>

        <div className="glass space-y-8 rounded-2xl p-6">
          <div ref={shapesRef} className="relative overflow-hidden rounded-xl">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="focus-shape absolute -left-3 top-1 h-16 w-16 rounded-full bg-violet/20 blur-xl" />
              <span className="focus-shape absolute right-4 top-6 h-10 w-10 rounded-full bg-amber/25 blur-lg" />
              <span
                data-spin="true"
                className="focus-shape absolute left-[38%] top-0 h-8 w-8 rounded-full border border-violet/40"
              />
              <span
                data-spin="true"
                className="focus-shape absolute right-10 bottom-2 h-6 w-6 rotate-45 border border-amber/40"
              />
              <span className="focus-shape absolute right-[28%] bottom-0 h-3 w-3 rounded-full bg-violet/50" />
            </div>

            <motion.h3 variants={fadeUp} className="relative text-sm text-text-muted">
              Currently focused on
            </motion.h3>
            <motion.ul
              variants={staggerContainer(0.04, 0.1)}
              className="relative mt-3 flex flex-wrap gap-2"
            >
              {focusAreas.map((area) => (
                <motion.li
                  key={area}
                  variants={popItem}
                  className="rounded-full bg-violet-soft px-3 py-1 font-mono text-xs text-violet"
                >
                  {area}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.dl
            variants={fadeUp}
            className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm"
          >
            <div>
              <dt className="text-text-muted">School</dt>
              <dd className="mt-1">{profile.school}</dd>
            </div>
            <div>
              <dt className="text-text-muted">CGPA</dt>
              <dd className="mt-1">{profile.gpa}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Location</dt>
              <dd className="mt-1">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Graduating</dt>
              <dd className="mt-1">{profile.gradYear}</dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
