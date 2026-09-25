"use client";
import { useEffect, useState } from "react";
import { reducedMotion } from "./gsap";

/** Types `text` character by character. Under reduced motion, shows it at once. */
export function Typewriter({ text, startDelay = 300, speed = 34, onDone, className = "" }: {
  text: string; startDelay?: number; speed?: number; onDone?: () => void; className?: string;
}) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion()) { setN(text.length); setDone(true); onDone?.(); return; }
    let i = 0;
    let t: number;
    const start = window.setTimeout(function step() {
      i += 1;
      setN(i);
      if (i < text.length) {
        // Slight human jitter; pauses after commas.
        const ch = text[i - 1];
        const d = ch === "," ? speed * 6 : speed + Math.random() * speed * 0.7;
        t = window.setTimeout(step, d);
      } else {
        setDone(true);
        onDone?.();
      }
    }, startDelay);
    return () => { window.clearTimeout(start); window.clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {!done && <span className="caret" aria-hidden="true" />}
    </span>
  );
}
