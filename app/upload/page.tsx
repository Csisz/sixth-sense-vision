"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HudLabel } from "@/components/HudLabel";
import { UploadDropzone } from "@/components/UploadDropzone";
import { saveWallScanImage } from "@/lib/scanStorage";

export default function UploadPage() {
  const router = useRouter();
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("Choose a wall photo to begin.");

  function handleImageSelected(dataUrl: string) {
    setImageDataUrl(dataUrl);
    setMessage("Ready for wall scan.");
  }

  function handleScan() {
    if (!imageDataUrl) {
      setMessage("Add a wall photo first.");
      return;
    }

    try {
      saveWallScanImage(imageDataUrl);
      router.push("/scan");
    } catch {
      setMessage("This photo is too large to store here. Try a smaller image.");
    }
  }

  return (
    <div className="sense-vignette relative flex min-h-screen flex-1 overflow-hidden text-white">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-24" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />

      <main className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-14">
        <motion.section
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <HudLabel>Wall Scan</HudLabel>
          <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Give the vision something to see.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/62">
            Upload a wall photo and prepare it for a cinematic diagnostic scan.
          </p>

          <div className="mt-9 w-full max-w-sm">
            <button
              type="button"
              onClick={handleScan}
              disabled={!imageDataUrl}
              className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white/[0.08] px-7 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-[0_0_42px_rgba(71,221,255,0.2)] backdrop-blur-2xl transition duration-500 hover:border-cyan-200/50 hover:bg-cyan-100/[0.12] hover:shadow-[0_0_68px_rgba(71,221,255,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/34 disabled:shadow-none"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_38%)] opacity-80 transition duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />
              <span className="relative">Scan Wall</span>
            </button>
            <p
              className={`mt-4 text-sm transition ${
                imageDataUrl ? "text-cyan-100/64" : "text-white/42"
              }`}
              aria-live="polite"
            >
              {message}
            </p>
            <p className="mt-8 text-xs text-white/38">
              Visual scan only. Not a professional diagnosis.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto w-full max-w-3xl"
          aria-label="Upload a wall photo"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-cyan-300/14 blur-3xl" />
          <UploadDropzone
            imageDataUrl={imageDataUrl}
            onImageSelected={handleImageSelected}
            onError={setMessage}
          />
        </motion.section>
      </main>
    </div>
  );
}
