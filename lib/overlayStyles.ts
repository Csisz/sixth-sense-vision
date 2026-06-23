import type { WallScanZoneType } from "@/types/scan";

type OverlayStyle = {
  label: string;
  glow: string;
  stroke: string;
  fill: string;
  text: string;
  ring: string;
};

export const overlayStyles: Record<WallScanZoneType, OverlayStyle> = {
  moisture_suspicion: {
    label: "Moisture suspicion",
    glow: "#47ddff",
    stroke: "rgba(151, 235, 255, 0.78)",
    fill: "rgba(71, 221, 255, 0.22)",
    text: "text-cyan-100",
    ring: "border-cyan-100/35 bg-cyan-200/[0.08]",
  },
  crack_risk: {
    label: "Crack risk",
    glow: "#ffcf52",
    stroke: "rgba(255, 207, 82, 0.78)",
    fill: "rgba(255, 207, 82, 0.2)",
    text: "text-amber-100",
    ring: "border-amber-100/35 bg-amber-200/[0.08]",
  },
  surface_wear: {
    label: "Surface wear",
    glow: "#ff9549",
    stroke: "rgba(255, 149, 73, 0.76)",
    fill: "rgba(255, 149, 73, 0.19)",
    text: "text-orange-100",
    ring: "border-orange-100/35 bg-orange-200/[0.08]",
  },
  material_changes: {
    label: "Material changes",
    glow: "#9b8cff",
    stroke: "rgba(189, 174, 255, 0.78)",
    fill: "rgba(155, 140, 255, 0.2)",
    text: "text-violet-100",
    ring: "border-violet-100/35 bg-violet-200/[0.08]",
  },
};

export function getOverlayStyle(type: WallScanZoneType) {
  return overlayStyles[type];
}
