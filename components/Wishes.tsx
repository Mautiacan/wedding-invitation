"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";

export function Wishes() {
  return (
    <section id="wishes" className="section-divider-top py-20">
      <div className="section-shell">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="glass-card mx-auto max-w-4xl p-6 sm:p-8"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-forest-bark/20 bg-forest-cream text-forest-bark">
            <Gift size={20} />
          </div>
          <h2 className="section-title mt-4 text-center">Пожелание</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-forest-bark/85">
            {EVENT_INFO.wishesText}
          </p>
        </motion.article>
      </div>
    </section>
  );
}
