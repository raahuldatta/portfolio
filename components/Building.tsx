"use client";

import { motion } from "framer-motion";
import { buildingNow } from "@/lib/data";
import { fadeUp, fadeUpItem, staggerContainer, viewport } from "@/lib/motion";

export default function Building() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Building now
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="mt-3 max-w-[60ch] text-text-muted"
        >
          Not public yet, so no source link — take these as work in progress, not
          finished claims.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-8 grid gap-6 sm:grid-cols-3"
        >
          {buildingNow.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUpItem}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full border border-text-muted" />
                <h3 className="font-display text-base font-semibold">{item.name}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
              {item.note ? (
                <p className="mt-2 text-xs text-text-muted/80">{item.note}</p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
