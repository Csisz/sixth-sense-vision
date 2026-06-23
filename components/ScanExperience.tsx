"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HudLabel } from "@/components/HudLabel";
import {
  getWallScanImage,
  saveWallScanResult,
  type WallScanResult,
} from "@/lib/scanStorage";

const statusMessages = [
  "Reading surface structure",
  "Detecting hidden variation",
  "Mapping thermal-style zones",
  "Building vision layer",
];

const particles = [
  { left: "12%", top: "18%", delay: 0.1 },
  { left: "24%", top: "72%", delay: 0.6 },
  { left: "38%", top: "28%", delay: 1.1 },
  { left: "55%", top: "62%", delay: 0.3 },
  { left: "68%", top: "24%", delay: 1.4 },
  { left: "82%", top: "76%", delay: 0.8 },
  { left: "88%", top: "42%", delay: 1.8 },
];

function createMockWallScanResult(): WallScanResult {
  return {
    mode: "wall_scan",
    createdAt: new Date().toISOString(),
    zones: [
      {
        id: "zone-moisture-suspicion",
        type: "moisture_suspicion",
        label: "Moisture suspicion",
        confidence: 0.78,
        x: 0.14,
        y: 0.18,
        width: 0.28,
        height: 0.32,
      },
      {
        id: "zone-crack-risk",
        type: "crack_risk",
        label: "Crack risk",
        confidence: 0.64,
        x: 0.53,
        y: 0.16,
        width: 0.09,
        height: 0.58,
      },
      {
        id: "zone-surface-wear",
        type: "surface_wear",
        label: "Surface wear",
        confidence: 0.71,
        x: 0.32,
        y: 0.56,
        width: 0.27,
        height: 0.24,
      },
      {
        id: "zone-material-changes",
        type: "material_changes",
        label: "Material changes",
        confidence: 0.69,
        x: 0.66,
        y: 0.42,
        width: 0.22,
        height: 0.31,
      },
    ],
  };
}

export function ScanExperience() {
  const router = useRouter();
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const mockResult = useMemo(() => createMockWallScanResult(), []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      const storedImage = getWallScanImage();

      if (!storedImage) {
        router.replace("/upload");
        return;
      }

      setImageDataUrl(storedImage);
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [router]);

  useEffect(() => {
    if (!imageDataUrl) {
      return;
    }

    const statusTimers = statusMessages.map((_, index) =>
      window.setTimeout(() => setStatusIndex(index), index * 1250),
    );

    const finishTimer = window.setTimeout(() => {
      saveWallScanResult(mockResult);
      router.push("/results");
    }, 5400);

    return () => {
      statusTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finishTimer);
    };
  }, [imageDataUrl, mockResult, router]);

  if (!imageDataUrl) {
    return (
      <div className="sense-vignette relative flex min-h-screen flex-1 items-center justify-center overflow-hidden text-white">
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-40" />
        <p className="relative text-sm uppercase tracking-[0.24em] text-white/48">
          Opening wall scan
        </p>
      </div>
    );
  }

  return (
    <div className="sense-vignette relative flex min-h-screen flex-1 overflow-hidden text-white">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-7 px-5 py-7 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <HudLabel>Wall scan active</HudLabel>
          <motion.p
            key={statusMessages[statusIndex]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
            className="mt-5 text-lg font-medium text-white/76 sm:text-xl"
            aria-live="polite"
          >
            {statusMessages[statusIndex]}
          </motion.p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, scale: 0.965, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl"
          aria-label="Scanning uploaded wall photo"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-cyan-300/16 blur-3xl" />
          <div className="glass-surface relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-[1.45rem] sm:aspect-[16/10]">
            <Image
              src={imageDataUrl}
              alt="Uploaded wall photo being scanned"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 94vw, 72vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/24" />
            <div className="scan-lines pointer-events-none absolute inset-0 opacity-28" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(71,221,255,0.12)_1px,transparent_1px),linear-gradient(rgba(71,221,255,0.08)_1px,transparent_1px)] bg-[size:54px_54px] opacity-50" />
            <div className="thermal-aura absolute inset-0 opacity-42 mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_32%,rgba(71,221,255,0.2),transparent_18%),radial-gradient(circle_at_68%_64%,rgba(255,149,73,0.2),transparent_20%),radial-gradient(circle_at_50%_52%,rgba(255,68,118,0.16),transparent_16%)]" />

            <motion.div
              className="absolute inset-y-0 w-[18%] bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent"
              animate={{ left: ["-18%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: [0.45, 0, 0.2, 1],
                repeatDelay: 0.18,
              }}
            />
            <motion.div
              className="absolute inset-y-0 w-px bg-cyan-50 shadow-[0_0_28px_rgba(151,235,255,0.95)]"
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: [0.45, 0, 0.2, 1],
                repeatDelay: 0.18,
              }}
            />

            {particles.map((particle) => (
              <motion.span
                key={`${particle.left}-${particle.top}`}
                className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(151,235,255,0.9)]"
                style={{ left: particle.left, top: particle.top }}
                animate={{ opacity: [0.18, 1, 0.22], scale: [0.7, 1.4, 0.8] }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {mockResult.zones.map((zone, index) => (
              <motion.div
                key={zone.id}
                className="absolute rounded-full border border-white/28 bg-white/[0.035] shadow-[0_0_38px_rgba(71,221,255,0.22)]"
                style={{
                  left: `${zone.x * 100}%`,
                  top: `${zone.y * 100}%`,
                  width: `${zone.width * 100}%`,
                  height: `${zone.height * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: [0, 0.72, 0.38], scale: [0.92, 1.02, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: 1.1 + index * 0.24,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4">
              <span className="rounded-full border border-cyan-100/20 bg-black/26 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-cyan-50/70 backdrop-blur-xl">
                Vision layer
              </span>
              <span className="rounded-full border border-white/14 bg-black/24 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/52 backdrop-blur-xl">
                Mock scan
              </span>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/8"
          aria-hidden="true"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-amber-100 to-rose-200 shadow-[0_0_24px_rgba(71,221,255,0.55)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </main>
    </div>
  );
}
