"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { P } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

// --- Utility Function (from @/lib/utils) ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Card Components ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-900 dark:bg-black flex flex-col",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 border-t border-zinc-200 p-4 dark:border-zinc-900 flex-1",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-WHITE dark:text-white",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[350px] w-full overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Visual2 Component and its Sub-components ---
interface Visual2Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  mainValue?: number;
  secondaryValue?: number;
  mainLabel?: string;
  secondaryLabel?: string;
}

export function Visual2({
  mainColor = "#8b5cf6",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
  mainValue = 28,
  secondaryValue = 383,
  mainLabel = "Public Repos",
  secondaryLabel = "Contributions",
}: Visual2Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />
      <div className="relative h-[350px] w-full overflow-hidden rounded-t-lg">
        <Layer1
          hovered={hovered}
          color={mainColor}
          secondaryColor={secondaryColor}
          mainValue={mainValue}
          secondaryValue={secondaryValue}
        />
        <Layer2 color={mainColor} mainLabel={mainLabel} />
        <Layer3 color={mainColor} />
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
          mainLabel={mainLabel}
          secondaryLabel={secondaryLabel}
        />
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
  mainValue?: number;
  secondaryValue?: number;
  mainLabel?: string;
  secondaryLabel?: string;
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect width="100" height="100" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(50 50) rotate(90) scale(50 50)"
          >
            <stop stopColor={color} stopOpacity="0.25" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

const Layer1: React.FC<LayerProps> = ({ hovered, color, secondaryColor, mainValue, secondaryValue }) => {
  const [mainProgress, setMainProgress] = useState(12.5);
  const [secondaryProgress, setSecondaryProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hovered) {
      timeout = setTimeout(() => {
        setMainProgress(66);
        setSecondaryProgress(100);
      }, 200);
    } else {
      setMainProgress(12.5);
      setSecondaryProgress(0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hovered]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const mainDashoffset = circumference - (mainProgress / 100) * circumference;
  const secondaryDashoffset =
    circumference - (secondaryProgress / 100) * circumference;

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute top-0 left-0 z-[7] flex h-[600px] w-full transform items-center justify-center transition-transform duration-500 group-hover/animated-card:-translate-y-[120px] group-hover/animated-card:scale-110">
               <div className="relative flex h-full w-full items-center justify-center text-white">
           <div className="donut-chart-container relative">
             <svg width="300" height="300" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              opacity={0.2}
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={secondaryColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={secondaryDashoffset}
              transform="rotate(-90 60 60)"
              style={{
                transition:
                  "stroke-dashoffset 0.5s cubic-bezier(0.6, 0.6, 0, 1)",
              }}
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={color}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={mainDashoffset}
              transform="rotate(-90 60 60)"
              style={{
                transition:
                  "stroke-dashoffset 0.5s cubic-bezier(0.6, 0.6, 0, 1)",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col-reverse items-center justify-center">
            <span className="font-gilroy text-5xl font-bold text-white">
              {hovered ? secondaryValue : mainValue}
            </span>
            <span className="font-gilroy text-lg font-bold text-white">
              {hovered ? <p>Contributions</p> : <p>Repository</p>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layer2: React.FC<{ color: string; mainLabel?: string }> = ({ color, mainLabel }) => {
  return (
    <div
      className="relative h-full w-full"
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] mt-10 absolute inset-0 z-[6] flex w-full translate-y-0 items-start justify-center bg-transparent p-4 transition-transform duration-500 group-hover/animated-card:translate-y-full">
        <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] rounded-md border border-zinc-200 bg-white/25 px-2 py-1.5 opacity-100 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-0 dark:border-zinc-800 dark:bg-black/25">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
            <p className="text-xs text-white">
              {mainLabel || "Public Repos"}
            </p>
          </div>
          <p className="mt-1 text-xs text-zinc-300">
            GitHub repositories count
          </p>
        </div>
      </div>
    </div>
  );
};

const Layer3: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex translate-y-full items-center justify-center opacity-0 transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect width="100" height="100" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered, mainLabel, secondaryLabel }) => {
  const items = [
    { id: 1, translateX: "180", translateY: "80", text: mainLabel || "Public Repos", color: color },
    { id: 2, translateX: "180", translateY: "-80", text: secondaryLabel || "Contributions", color: secondaryColor },
    { id: 3, translateX: "205", translateY: "0", text: "GitHub", color: color },
    { id: 4, translateX: "-205", translateY: "0", text: "Activity", color: secondaryColor },
    { id: 5, translateX: "-180", translateY: "80", text: "Code", color: color },
    { id: 6, translateX: "-180", translateY: "-80", text: "Projects", color: secondaryColor },
  ];

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/animated-card:opacity-100">
      {items.map((item) => (
        <div
          key={item.id}
          className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute flex items-center justify-center gap-1 rounded-full border border-zinc-200 bg-white/70 px-1.5 py-0.5 backdrop-blur-sm transition-all duration-500 dark:border-zinc-800 dark:bg-black/70"
          style={{
            transform: hovered
              ? `translate(${item.translateX}px, ${item.translateY}px)`
              : "translate(0px, 0px)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="ml-1 text-[10px] text-black">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};
