"use client";

import { motion } from "framer-motion";
import { stack } from "@/lib/data";
import { fadeUp, popItem, staggerContainer, viewport } from "@/lib/motion";

const allTech = stack.flatMap((group) => group.items);
const reversedTech = [...allTech].reverse();

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-row overflow-hidden">
      <div className={`flex w-max gap-3 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass flex-none whitespace-nowrap rounded-full px-4 py-2 font-mono text-sm text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Stack
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          aria-hidden="true"
          className="mt-8 space-y-3"
        >
          <MarqueeRow items={allTech} />
          <MarqueeRow items={reversedTech} reverse />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer(0.1)}
          className="glass mt-8 grid gap-8 rounded-2xl p-6 sm:grid-cols-2 sm:p-8"
        >
          {stack.map((group) => (
            <div key={group.label}>
              <motion.h3 variants={fadeUp} className="text-sm text-text-muted">
                {group.label}
              </motion.h3>
              <motion.ul
                variants={staggerContainer(0.035, 0.05)}
                className="mt-3 flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={popItem}
                    className="rounded-full bg-bg px-2.5 py-1 font-mono text-xs text-text-muted"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
