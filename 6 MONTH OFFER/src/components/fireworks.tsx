"use client";

import { useEffect, useRef } from "react";

/** Festive multi-colour launch fireworks (canvas). Honors prefers-reduced-motion. */
const COLORS = [
  "#f5b300",
  "#ffb020",
  "#ea580c",
  "#f472b6",
  "#e879f9",
  "#2dd4bf",
  "#a3e635",
  "#fb7185",
  "#fde047",
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
};
type Rocket = { x: number; y: number; vy: number; color: string; targetY: number };

export function Fireworks({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const rockets: Rocket[] = [];
    const parts: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const launch = () => {
      if (!running || w === 0) return;
      rockets.push({
        x: w * (0.1 + Math.random() * 0.8),
        y: h + 8,
        vy: -(h / 130) * (0.9 + Math.random() * 0.55),
        targetY: h * (0.12 + Math.random() * 0.32),
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    };

    const explode = (r: Rocket) => {
      const n = 44 + ((Math.random() * 24) | 0);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.14;
        const sp = 1.1 + Math.random() * 3.3;
        parts.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 50 + Math.random() * 38,
          color: Math.random() < 0.2 ? "#fff7d6" : r.color,
          size: 1.4 + Math.random() * 1.8,
        });
      }
      if (parts.length > 420) parts.splice(0, parts.length - 420);
    };

    let last = performance.now();
    let acc = 0;
    let nextGap = 650;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(48, now - last);
      last = now;
      const step = dt / 16.7;
      acc += dt;
      if (acc >= nextGap) {
        acc = 0;
        nextGap = 900 + Math.random() * 950;
        launch();
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * step;
        r.vy += 0.05 * step;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(r.x, r.y + 9, 1.3, 0, Math.PI * 2);
        ctx.fill();
        if (r.vy >= -0.6 || r.y <= r.targetY) {
          rockets.splice(i, 1);
          explode(r);
        }
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += step;
        if (p.life >= p.max) {
          parts.splice(i, 1);
          continue;
        }
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.05;
        p.x += p.vx * step;
        p.y += p.vy * step;
        const t = 1 - p.life / p.max;
        ctx.globalAlpha = t;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 9 * t;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * t + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(tick);
    launch();
    const t1 = window.setTimeout(launch, 380);
    const t2 = window.setTimeout(launch, 860);

    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
