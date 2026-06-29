import { useEffect, useRef, useState } from "react";
import { FRAME_COUNT, frameSrc } from "@/lib/sequence";

export interface FrameSequence {
  images: HTMLImageElement[];
  /** 0..1 Ladefortschritt */
  progress: number;
  ready: boolean;
}

/**
 * Lädt alle Frames der Bildsequenz vorab (nicht blockierend) und meldet den
 * Fortschritt. `enabled=false` (z. B. Mobile/reduced-motion) überspringt das
 * Vorladen komplett — dann genügt das statische Repräsentativ-Frame.
 */
export function useFrameSequence(enabled: boolean): FrameSequence {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const onOne = () => {
      loaded += 1;
      if (cancelled) return;
      setProgress(loaded / FRAME_COUNT);
      if (loaded >= FRAME_COUNT) setReady(true);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      // sowohl Erfolg als auch Fehler zählen, damit der Loader nie hängen bleibt
      img.onload = onOne;
      img.onerror = onOne;
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { images: imagesRef.current, progress, ready };
}
