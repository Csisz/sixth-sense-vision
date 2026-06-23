"use client";

import { useRouter } from "next/navigation";
import { clearWallScanImage, clearWallScanResult } from "@/lib/scanStorage";

export function ResultActions() {
  const router = useRouter();

  function startAnotherScan() {
    clearWallScanImage();
    clearWallScanResult();
    router.push("/upload");
  }

  return (
    <button
      type="button"
      onClick={startAnotherScan}
      className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white/[0.08] px-7 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-[0_0_42px_rgba(71,221,255,0.2)] backdrop-blur-2xl transition duration-500 hover:border-cyan-200/50 hover:bg-cyan-100/[0.12] hover:shadow-[0_0_68px_rgba(71,221,255,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_38%)] opacity-80 transition duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />
      <span className="relative">Start Another Scan</span>
    </button>
  );
}
