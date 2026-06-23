"use client";

import { motion } from "framer-motion";
import { GlassButton } from "@/components/GlassButton";
import { HudLabel } from "@/components/HudLabel";

export default function Home() {
  return (
    <div className="sense-vignette relative flex min-h-screen flex-1 overflow-hidden text-white">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />

      <main className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:px-14">
        <motion.section
          initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <HudLabel>Sixth Sense Vision</HudLabel>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl">
            See what others can&apos;t.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
            Transform ordinary wall photos into cinematic diagnostic visions
            with thermal glow, x-ray atmosphere, and beautiful AI overlays.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
            <GlassButton href="/upload">Start Wall Scan</GlassButton>
            <p className="text-xs text-white/40">
              Visual scan only. Not a professional diagnosis.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-center"
          aria-label="Cinematic wall scan preview"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-cyan-300/16 blur-3xl" />
          <div className="glass-surface relative aspect-[4/5] w-full max-w-[38rem] overflow-hidden rounded-[1.6rem]">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_28%,rgba(255,255,255,0.08)_52%,transparent_76%)]" />
            <div className="absolute inset-5 overflow-hidden rounded-[1.15rem] border border-white/12 bg-[#11191d] shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(90deg,#151716,#293136_42%,#111617_43%,#2b302f_66%,#141918)]" />
              <div className="thermal-aura soft-pulse absolute inset-0 mix-blend-screen" />
              <div className="absolute left-[18%] top-[20%] h-[46%] w-px bg-cyan-100/20" />
              <div className="absolute left-[52%] top-[12%] h-[70%] w-px bg-cyan-100/14" />
              <div className="absolute right-[19%] top-[26%] h-[51%] w-px bg-amber-100/18" />

              <div className="scan-beam absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-transparent via-cyan-200/35 to-transparent blur-[1px]" />
              <div className="absolute left-[10%] top-[32%] h-[30%] w-[34%] rounded-full border border-cyan-200/55 shadow-[0_0_32px_rgba(71,221,255,0.28)]" />
              <div className="absolute bottom-[20%] right-[15%] h-[25%] w-[30%] rounded-full border border-amber-200/50 shadow-[0_0_34px_rgba(255,149,73,0.32)]" />
              <div className="absolute left-[38%] top-[54%] h-[17%] w-[19%] rounded-full border border-rose-200/45 shadow-[0_0_30px_rgba(255,68,118,0.28)]" />

              <HudLabel className="absolute left-5 top-5">Moisture trace</HudLabel>
              <HudLabel tone="amber" className="absolute bottom-7 right-5">
                Thermal drift
              </HudLabel>
              <HudLabel tone="rose" className="absolute left-7 bottom-[32%]">
                Surface stress
              </HudLabel>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
              <span>Wall mode</span>
              <span>Vision preview</span>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
