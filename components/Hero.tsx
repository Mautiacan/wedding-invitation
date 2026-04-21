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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute -left-4 bottom-20 h-56 w-28 text-[#5d7f4f]/45"
          viewBox="0 0 120 260"
          fill="none"
          aria-hidden="true"
        >
          <path d="M18 260V60" stroke="currentColor" strokeWidth="4" />
          <ellipse cx="34" cy="80" rx="18" ry="32" fill="currentColor" transform="rotate(-24 34 80)" />
          <ellipse cx="52" cy="120" rx="16" ry="28" fill="currentColor" transform="rotate(-18 52 120)" />
          <ellipse cx="30" cy="148" rx="14" ry="24" fill="currentColor" transform="rotate(-30 30 148)" />
          <ellipse cx="50" cy="186" rx="13" ry="22" fill="currentColor" transform="rotate(-12 50 186)" />
        </svg>
        <svg
          className="absolute -right-4 bottom-24 h-60 w-32 text-[#5d7f4f]/40"
          viewBox="0 0 130 280"
          fill="none"
          aria-hidden="true"
        >
          <path d="M108 280V58" stroke="currentColor" strokeWidth="4" />
          <ellipse cx="92" cy="84" rx="17" ry="30" fill="currentColor" transform="rotate(22 92 84)" />
          <ellipse cx="74" cy="122" rx="15" ry="26" fill="currentColor" transform="rotate(18 74 122)" />
          <ellipse cx="98" cy="154" rx="13" ry="24" fill="currentColor" transform="rotate(26 98 154)" />
          <ellipse cx="78" cy="190" rx="12" ry="22" fill="currentColor" transform="rotate(14 78 190)" />
        </svg>
        <svg
          className="absolute inset-x-0 bottom-0 h-28 w-full text-[#6a8f56]/32"
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 140L20 95L40 140L60 82L80 140L100 90L120 140L140 84L160 140L180 92L200 140L220 86L240 140L260 94L280 140L300 88L320 140L340 96L360 140L380 90L400 140L420 85L440 140L460 92L480 140L500 84L520 140L540 95L560 140L580 89L600 140L620 84L640 140L660 96L680 140L700 90L720 140L740 86L760 140L780 94L800 140L820 88L840 140L860 96L880 140L900 90L920 140L940 85L960 140L980 92L1000 140L1020 84L1040 140L1060 95L1080 140L1100 88L1120 140L1140 94L1160 140L1180 90L1200 140V140H0Z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#6f925a]/20 to-transparent" />
      </div>
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
