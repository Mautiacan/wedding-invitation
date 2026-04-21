"use client";

import { motion } from "framer-motion";
import { GlassWater, Heart, PartyPopper, Users } from "lucide-react";
import { TIMELINE_ITEMS } from "@/lib/constants";

const icons = [Users, Heart, GlassWater, PartyPopper];

export function Timeline() {
  return (
    <section id="program" className="section-divider-top py-20">
      <div className="section-shell">
        <h2 className="section-title text-center">Программа дня</h2>
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-forest-bark/20 sm:left-1/2" />
          <div className="space-y-6">
            {TIMELINE_ITEMS.map((item, index) => {
              const Icon = icons[index] ?? Users;
              return (
                <motion.article
                  key={item.time}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass-card relative ml-12 p-5 sm:mx-auto sm:grid sm:max-w-2xl sm:grid-cols-[1fr_auto_1fr] sm:items-center"
                >
                  <div className="hidden sm:block">
                    <p className="text-right font-serif text-2xl text-forest-bark">{item.time}</p>
                  </div>
                  <div className="absolute -left-10 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-forest-bark/20 bg-forest-cream text-forest-bark sm:static sm:mx-6 sm:h-12 sm:w-12 sm:translate-y-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-forest-bark sm:hidden">{item.time}</p>
                    <p className="mt-1 text-base text-forest-bark/85">{item.title}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
