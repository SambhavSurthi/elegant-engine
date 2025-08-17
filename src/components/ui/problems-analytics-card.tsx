"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface ProblemsAnalyticsCardProps {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  className?: string;
}

export const ProblemsAnalyticsCard: React.FC<ProblemsAnalyticsCardProps> = ({ total, easy, medium, hard, className }) => {
  const gridColor = "#80808020"; // grid color
  const [hovered, setHovered] = useState(false);
  const [factor, setFactor] = useState(0.5); // 0.5 (half ring) -> 1 (full) on hover

  useEffect(() => {
    let t: NodeJS.Timeout;
    t = setTimeout(() => setFactor(hovered ? 1 : 0.5), hovered ? 50 : 0);
    return () => clearTimeout(t);
  }, [hovered]);

  // Avoid division by zero
  const safeTotal = Math.max(1, Number(total || 0));
  const e = Math.max(0, Number(easy || 0));
  const m = Math.max(0, Number(medium || 0));
  const h = Math.max(0, Number(hard || 0));

  // Bigger ring
  const radius = 95;
  const circumference = 2 * Math.PI * radius;

  // Fractions
  const fracEasy = e / safeTotal;
  const fracMedium = m / safeTotal;
  const fracHard = h / safeTotal;

  // Segment lengths with animation factor
  const segEasy = circumference * fracEasy * factor;
  const segMedium = circumference * fracMedium * factor;
  const segHard = circumference * fracHard * factor;

  // Starts (offsets) along the circle
  const startEasy = 0;
  const startMedium = circumference * fracEasy * factor;
  const startHard = circumference * (fracEasy + fracMedium) * factor;

  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-black/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl",
        className
      )}
    >
      <div
        className="relative h-[340px] w-full overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Violet ellipse gradient */}
        <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 460 320" className="max-w-full">
            <rect width="460" height="320" fill="url(#paint0_radial)" />
            <defs>
              <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(230 160) rotate(90) scale(140 240)">
                <stop stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="0.4" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Grid layer */}
        <div
          style={{ "--grid-color": gridColor } as React.CSSProperties}
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:24px_24px] bg-center opacity-60"
        />

        {/* Chart (segmented donut) */}
        <div className="ease-[cubic-bezier(0.6,0.6,0,1)] absolute top-0 left-0 z-[7] flex h-[640px] w-full transform items-center justify-center transition-transform duration-700 group-hover/animated-card:-translate-y-[150px] group-hover/animated-card:scale-105">
          <div className="relative flex h-[280px] w-[280px] items-center justify-center">
            <svg width="280" height="280" viewBox="0 0 280 280">
              {/* Track */}
              <circle cx="140" cy="140" r={radius} stroke="#1f2937" strokeWidth="16" fill="transparent" />

              {/* Easy (green) */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                stroke="#22c55e"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${Math.max(0, segEasy)} ${Math.max(0, circumference - segEasy)}`}
                strokeDashoffset={-startEasy}
                transform="rotate(-90 140 140)"
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.6,0.6,0,1), stroke-dashoffset 800ms cubic-bezier(0.6,0.6,0,1)" }}
              />

              {/* Medium (amber) */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                stroke="#f59e0b"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${Math.max(0, segMedium)} ${Math.max(0, circumference - segMedium)}`}
                strokeDashoffset={-startMedium}
                transform="rotate(-90 140 140)"
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.6,0.6,0,1), stroke-dashoffset 800ms cubic-bezier(0.6,0.6,0,1)" }}
              />

              {/* Hard (red) */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                stroke="#ef4444"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${Math.max(0, segHard)} ${Math.max(0, circumference - segHard)}`}
                strokeDashoffset={-startHard}
                transform="rotate(-90 140 140)"
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.6,0.6,0,1), stroke-dashoffset 800ms cubic-bezier(0.6,0.6,0,1)" }}
              />
            </svg>
            {/* Center total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-7xl font-extrabold text-white">{Math.max(0, Number(total || 0))} </span>
              <p className="text-md" >Total Solved</p>
            </div>
          </div>
        </div>

        {/* Difficulty pills appear on hover */}
        <div className={cn("absolute inset-0 z-[8] flex items-center justify-center opacity-0 transition-opacity duration-700", hovered && "opacity-100")}>
          {/* Easy pill (right) */}
          <div className="absolute flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300 backdrop-blur-md" style={{ top: "56%", left: "calc(50% + 170px)", transform: "translate(-50%,-50%)" }}>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs">Easy</span>
            <span className="text-xs font-semibold">{e}</span>
          </div>
          {/* Medium pill (top-left) */}
          <div className="absolute flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-amber-300 backdrop-blur-md" style={{ top: "34%", left: "calc(50% - 150px)", transform: "translate(-60%,-50%)" }}>
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs">Medium</span>
            <span className="text-xs font-semibold">{m}</span>
          </div>
          {/* Hard pill (bottom-left) */}
          <div className="absolute flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-300 backdrop-blur-md" style={{ top: "78%", left: "calc(50% - 110px)", transform: "translate(-70%,-50%)" }}>
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-xs">Hard</span>
            <span className="text-xs font-semibold">{h}</span>
          </div>
        </div>

        {/* Hidden Info badge layer (kept for fidelity) */}
        <div className="ease-[cubic-bezier(0.6,0.6,0,1)] absolute inset-0 z-[6] flex w-full translate-y-0 items-start justify-center bg-transparent p-6 transition-transform duration-700 group-hover/animated-card:translate-y-full">
          <div className="rounded-lg border border-zinc-800/40 bg-black/40 px-4 py-3 opacity-100 backdrop-blur-md transition-opacity duration-500 group-hover/animated-card:opacity-0">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
              <p className="text-sm font-medium text-white">Problems Analytics</p>
            </div>
            <p className="mt-1 text-xs text-neutral-300">Hover to see difficulty breakdown</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col space-y-2 border-t border-zinc-800/50 p-6">
        <h3 id="card-title" className="text-xl font-bold tracking-tight text-white">Problems Solved</h3>
        <p id="card-description" className="text-sm leading-relaxed text-neutral-300">Interactive card with ring animation.</p>
      </div>
    </div>
  );
};
