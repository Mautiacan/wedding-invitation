"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MusicPlayerProps = {
  className?: string;
};

export function MusicPlayer({ className = "" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const onError = () => setIsReady(false);
    audio.addEventListener("error", onError);

    return () => audio.removeEventListener("error", onError);
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !isReady) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className={className}>
      <audio ref={audioRef} src="/audio/fantastika.mp3" loop preload="metadata" />
      <button
        type="button"
        onClick={togglePlay}
        className="flex items-center gap-2 rounded-full border border-forest-bark/20 bg-white/90 px-4 py-3 text-sm text-forest-bark shadow-warm backdrop-blur transition hover:-translate-y-0.5"
        aria-label={isPlaying ? "Остановить музыку" : "Включить музыку"}
      >
        <Volume2 size={16} />
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span>{isPlaying ? "Музыка играет" : "Включить музыку"}</span>
      </button>
      {!isReady && (
        <p className="mt-2 max-w-60 rounded-xl bg-white/90 p-2 text-xs text-forest-bark">
          Добавьте файл трека в `public/audio/fantastika.mp3`.
        </p>
      )}
    </div>
  );
}

