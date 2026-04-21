"use client";

import { motion } from "framer-motion";
import { ImageOff, MapPinned } from "lucide-react";
import { useState } from "react";
import { EVENT_INFO, MAP_EMBED_URL, MAP_ROUTE_URL } from "@/lib/constants";

export function Location() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [secondPhotoFailed, setSecondPhotoFailed] = useState(false);

  return (
    <section id="location" className="section-divider-top py-20">
      <div className="section-shell">
        <h2 className="section-title text-center">Место проведения</h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card mt-8 grid gap-6 p-6 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <div>
            <p className="font-serif text-3xl text-[#2f4a2f]">{EVENT_INFO.venue}</p>
            <p className="mt-3 text-forest-bark/85">{EVENT_INFO.address}</p>

            <a
              href={MAP_ROUTE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-moss px-5 py-3 text-sm font-medium text-white transition hover:bg-forest-bark"
            >
              <MapPinned size={18} />
              Построить маршрут
            </a>

            <div className="mt-6 overflow-hidden rounded-2xl border border-forest-bark/10 bg-forest-cream/60">
              {!photoFailed ? (
                <img
                  src="/forest-park-1.jpg"
                  alt="Локация Forest Park"
                  className="h-56 w-full object-cover"
                  loading="lazy"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="flex h-56 flex-col items-center justify-center gap-2 px-4 text-center text-forest-bark/70">
                  <ImageOff size={22} />
                  <p className="text-sm">
                    Добавьте фото локации в файл <code>/public/forest-park-1.jpg</code>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-forest-bark/85">Forest Park</p>
              <div className="mt-3 overflow-hidden rounded-2xl border border-forest-bark/10 bg-forest-cream/60">
                {!secondPhotoFailed ? (
                  <img
                    src="/forest-park-2.jpeg"
                    alt="Forest Park, дополнительное фото"
                    className="h-56 w-full object-cover"
                    loading="lazy"
                    onError={() => setSecondPhotoFailed(true)}
                  />
                ) : (
                  <div className="flex h-56 flex-col items-center justify-center gap-2 px-4 text-center text-forest-bark/70">
                    <ImageOff size={22} />
                    <p className="text-sm">
                      Добавьте второе фото локации в файл <code>/public/forest-park-2.jpeg</code>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-forest-bark/10 lg:self-center">
            <iframe
              title="Карта Forest Park"
              src={MAP_EMBED_URL}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
