"use client";

import { motion } from "framer-motion";
import { achievements, experience } from "@/lib/data";
import { fadeUp, fadeUpItem, staggerContainer, viewport } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Experience
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={staggerContainer(0.15, 0.1)}
              className="mt-8 space-y-5"
            >
              {experience.map((item) => (
                <motion.div
                  key={`${item.org}-${item.period}`}
                  variants={fadeUpItem}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium">
                      {item.role} · {item.org}
                    </h3>
                    <span className="flex items-center gap-2 font-mono text-xs text-text-muted">
                      {item.upcoming ? (
                        <span className="rounded-full bg-violet-soft px-2 py-0.5 text-violet">
                          Upcoming
                        </span>
                      ) : null}
                      {item.period}
                    </span>
                  </div>
                  {item.location ? (
                    <p className="mt-1 text-sm text-text-muted">{item.location}</p>
                  ) : null}
                  <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-text-muted" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-bg px-2 py-0.5 font-mono text-xs text-text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Achievements
            </motion.h2>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={staggerContainer(0.1, 0.15)}
              className="mt-8 space-y-6"
            >
              {achievements.map((item) => (
                <motion.li
                  key={item.label}
                  variants={fadeUpItem}
                  className="border-l-2 border-violet-soft pl-4"
                >
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
