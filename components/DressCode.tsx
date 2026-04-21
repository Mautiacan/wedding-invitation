"use client";

import { motion } from "framer-motion";
import { DRESS_CODE_GROUPS } from "@/lib/constants";

export function DressCode() {
  return (
    <section id="dress-code" className="section-divider-top py-20">
      <div className="section-shell">
        <h2 className="section-title text-center">Дресс-код</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-forest-bark/80">
          Мы очень старались сделать наш праздник красивым, и будем рады если вы в своем
          наряде поддержите цветовую гамму нашей свадьбы.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-forest-bark/75">
          Свадебный вечер пройдет на открытой площадке. Для вашего удобства просим взять с
          собой удобную обувь для улицы и танцев. И не забудьте взять с собой что-нибудь
          теплое, вечером может стать прохладно.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {DRESS_CODE_GROUPS.map((group) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              className="glass-card p-6"
            >
              <h3 className="font-serif text-2xl text-[#2f4a2f]">{group.title}</h3>
              <p className="mt-1 text-sm text-forest-bark/70">{group.subtitle}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {group.colors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div
                      className="h-20 rounded-xl border border-forest-bark/15"
                      style={{ backgroundColor: color.hex }}
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
