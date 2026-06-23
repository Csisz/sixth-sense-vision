"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getOverlayStyle } from "@/lib/overlayStyles";
import type { WallScanResult, WallScanZone } from "@/types/scan";

type ResultCanvasProps = {
  imageDataUrl: string;
  result: WallScanResult;
};

function toPercent(value: number) {
  return `${value * 100}%`;
}

function zoneCenter(zone: WallScanZone) {
  return {
    x: zone.x + zone.width / 2,
    y: zone.y + zone.height / 2,
  };
}

function crackPath(zone: WallScanZone) {
  const x = (zone.x + zone.width * 0.5) * 100;
  const y = zone.y * 100;
  const height = zone.height * 100;

  return `M ${x} ${y} C ${x - 3} ${y + height * 0.22}, ${x + 4} ${
    y + height * 0.42
  }, ${x - 1} ${y + height * 0.62} S ${x + 3} ${y + height * 0.86}, ${x} ${
    y + height
  }`;
}

export function ResultCanvas({ imageDataUrl, result }: ResultCanvasProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.965, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-cyan-300/16 blur-3xl" />
      <div className="glass-surface relative aspect-[4/5] w-full overflow-hidden rounded-[1.45rem] sm:aspect-[16/10]">
        <Image
          src={imageDataUrl}
          alt="Wall Vision diagnostic result"
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 94vw, 86vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/28" />
        <div className="thermal-aura absolute inset-0 opacity-35 mix-blend-screen" />
        <div className="scan-lines pointer-events-none absolute inset-0 opacity-24" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(71,221,255,0.1)_1px,transparent_1px),linear-gradient(rgba(71,221,255,0.07)_1px,transparent_1px)] bg-[size:58px_58px] opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(3,5,7,0.1)_48%,rgba(3,5,7,0.62)_100%)]" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {result.zones.map((zone) => {
              const style = getOverlayStyle(zone.type);
              const center = zoneCenter(zone);

              return (
                <radialGradient
                  key={`${zone.id}-gradient`}
                  id={`${zone.id}-gradient`}
                  cx={center.x}
                  cy={center.y}
                  r="0.36"
                >
                  <stop offset="0%" stopColor={style.glow} stopOpacity="0.52" />
                  <stop offset="54%" stopColor={style.glow} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={style.glow} stopOpacity="0" />
                </radialGradient>
              );
            })}
            <filter id="wall-vision-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {result.zones.map((zone) => (
            <motion.ellipse
              key={`${zone.id}-field`}
              cx={(zone.x + zone.width / 2) * 100}
              cy={(zone.y + zone.height / 2) * 100}
              rx={Math.max(zone.width * 54, 7)}
              ry={Math.max(zone.height * 54, 7)}
              fill={`url(#${zone.id}-gradient)`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.22 }}
              style={{ transformOrigin: "center" }}
            />
          ))}

          {result.zones.map((zone, index) => {
            const style = getOverlayStyle(zone.type);

            if (zone.type === "crack_risk") {
              return (
                <motion.path
                  key={`${zone.id}-crack`}
                  d={crackPath(zone)}
                  fill="none"
                  stroke={style.stroke}
                  strokeLinecap="round"
                  strokeWidth="0.42"
                  filter="url(#wall-vision-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.95 }}
                  transition={{ duration: 1.2, delay: 0.38 + index * 0.12 }}
                />
              );
            }

            return (
              <motion.ellipse
                key={`${zone.id}-outline`}
                cx={(zone.x + zone.width / 2) * 100}
                cy={(zone.y + zone.height / 2) * 100}
                rx={Math.max(zone.width * 48, 6)}
                ry={Math.max(zone.height * 48, 6)}
                fill="none"
                stroke={style.stroke}
                strokeDasharray="1.2 1.4"
                strokeWidth="0.28"
                filter="url(#wall-vision-glow)"
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 0.84, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.34 + index * 0.12 }}
                style={{ transformOrigin: "center" }}
              />
            );
          })}
        </svg>

        {result.zones.map((zone, index) => {
          const style = getOverlayStyle(zone.type);

          return (
            <motion.div
              key={`${zone.id}-label`}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.7 + index * 0.12 }}
              className={`absolute rounded-full border px-3 py-1 text-[0.56rem] font-medium uppercase tracking-[0.18em] shadow-[0_0_28px_rgba(71,221,255,0.18)] backdrop-blur-xl ${style.ring} ${style.text}`}
              style={{
                left: toPercent(Math.min(zone.x + zone.width * 0.12, 0.72)),
                top: toPercent(Math.min(zone.y + zone.height * 0.08, 0.86)),
              }}
            >
              {style.label}
            </motion.div>
          );
        })}

        <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4">
          <span className="rounded-full border border-cyan-100/22 bg-black/28 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-cyan-50/76 backdrop-blur-xl">
            Wall Vision
          </span>
          <span className="rounded-full border border-white/14 bg-black/24 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/52 backdrop-blur-xl">
            Surface map
          </span>
        </div>
      </div>
    </motion.figure>
  );
}
