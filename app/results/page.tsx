"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HudLabel } from "@/components/HudLabel";
import { ResultActions } from "@/components/ResultActions";
import { ResultCanvas } from "@/components/ResultCanvas";
import { getWallScanImage, getWallScanResult } from "@/lib/scanStorage";
import type { WallScanResult } from "@/types/scan";

type ResultState = {
  imageDataUrl: string;
  result: WallScanResult;
};

export default function ResultsPage() {
  const router = useRouter();
  const [resultState, setResultState] = useState<ResultState | null>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      const imageDataUrl = getWallScanImage();
      const result = getWallScanResult();

      if (!imageDataUrl || !result) {
        router.replace("/upload");
        return;
      }

      setResultState({ imageDataUrl, result });
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [router]);

  if (!resultState) {
    return (
      <div className="sense-vignette relative flex min-h-screen flex-1 items-center justify-center overflow-hidden text-white">
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-40" />
        <p className="relative text-sm uppercase tracking-[0.24em] text-white/48">
          Opening wall vision
        </p>
      </div>
    );
  }

  return (
    <div className="sense-vignette relative flex min-h-screen flex-1 overflow-hidden text-white">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-42" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-22" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-7 px-5 py-8 sm:px-10 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-5xl flex-col items-center pt-3 text-center"
        >
          <HudLabel>Vision layer</HudLabel>
          <h1 className="mt-5 text-4xl font-semibold leading-none tracking-normal text-white sm:text-6xl">
            Wall Vision Complete
          </h1>
          <p className="mt-4 text-base text-white/58 sm:text-lg">
            {resultState.result.zones.length} surface variations detected
          </p>
        </motion.header>

        <ResultCanvas
          imageDataUrl={resultState.imageDataUrl}
          result={resultState.result}
        />

        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col items-center gap-4 pb-3 text-center"
        >
          <ResultActions />
          <p className="text-xs text-white/38">
            Visual scan only. Not a professional diagnosis.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
