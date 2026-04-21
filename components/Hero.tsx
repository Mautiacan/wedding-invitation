"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { EVENT_INFO, WEDDING_DATE_ISO } from "@/lib/constants";
import { formatCountdown } from "@/lib/utils";

const targetDate = new Date(WEDDING_DATE_ISO);

export function Hero() {
  const [timer, setTimer] = useState(() => formatCountdown(targetDate));
  const [photoError, setPhotoError] = useState<Record<string, boolean>>({});
  const [heroBgFailed, setHeroBgFailed] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(formatCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timerItems = useMemo(
    () => [
      { label: "Дней", value: timer.days },
      { label: "Часов", value: timer.hours },
      { label: "Минут", value: timer.minutes },
      { label: "Секунд", value: timer.seconds }
    ],
    [timer]
  );
  const couplePhotoSources = ["/photos/us-1. jpg.jpg", "/photos/us-2. jpg.jpg", "/photos/us-3. jpg.jpg"];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {!heroBgFailed && (
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/bg-hero.jpg"
            alt=""
            className="h-full w-full scale-105 object-cover opacity-15 blur-[2px]"
            onError={() => setHeroBgFailed(true)}
          />
        </div>
      )}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="texture-overlay h-full w-full opacity-15" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f8f1df]/70 to-[#efe2c8]/82" />
      <div className="section-shell relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex w-fit rounded-full border border-forest-bark/15 bg-white/50 px-4 py-2 text-center text-sm uppercase tracking-[0.3em] text-forest-bark/70"
        >
          {EVENT_INFO.invitationText}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-center font-serif text-5xl text-[#2f4a2f] sm:text-7xl"
        >
          {EVENT_INFO.couple}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 text-center text-lg text-forest-bark/90"
        >
          {EVENT_INFO.dateText}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-3 max-w-2xl text-center text-sm text-forest-bark/75 sm:text-base"
        >
          {EVENT_INFO.greetingText}
        </motion.p>

        <div className="mt-6 flex justify-center">
          <MusicPlayer className="flex flex-col items-center" />
        </div>

        <div className="mx-auto mt-6 flex w-fit flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-forest-bark/15 bg-white/65 px-4 py-1 text-xs uppercase tracking-[0.18em] text-forest-bark/70">
            {EVENT_INFO.venue}
          </span>
          <span className="rounded-full border border-forest-bark/15 bg-white/65 px-4 py-1 text-xs uppercase tracking-[0.18em] text-forest-bark/70">
            Начало в 16:00
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {timerItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card px-4 py-5 text-center"
            >
              <p className="font-serif text-3xl text-forest-bark">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-forest-bark/70">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#program"
            className="rounded-full border border-forest-bark/20 bg-white/70 px-6 py-3 text-sm text-forest-bark shadow-warm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Смотреть программу дня
          </a>
          <a
            href="#rsvp"
            className="rounded-full bg-forest-bark px-6 py-3 text-sm text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-forest-moss"
          >
            Подтвердить присутствие
          </a>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
          {couplePhotoSources.map((src, index) => (
            <div
              key={src}
              className="overflow-hidden rounded-2xl border border-forest-moss/20 bg-white/70"
            >
              {!photoError[src] ? (
                <img
                  src={encodeURI(src)}
                  alt={`Фото пары ${index + 1}`}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                  onError={() => setPhotoError((prev) => ({ ...prev, [src]: true }))}
                />
              ) : (
                <div className="flex h-52 items-center justify-center px-4 text-center text-sm text-forest-moss/75">
                  Добавьте фото в <code>{`public${src}`}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
