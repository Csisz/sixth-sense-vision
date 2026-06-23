type HudLabelProps = {
  children: React.ReactNode;
  tone?: "cyan" | "amber" | "rose";
  className?: string;
};

const toneClasses = {
  cyan: "border-cyan-200/30 bg-cyan-200/[0.08] text-cyan-100 shadow-[0_0_28px_rgba(71,221,255,0.18)]",
  amber:
    "border-amber-200/30 bg-amber-200/[0.08] text-amber-100 shadow-[0_0_28px_rgba(255,149,73,0.18)]",
  rose: "border-rose-200/30 bg-rose-200/[0.08] text-rose-100 shadow-[0_0_28px_rgba(255,68,118,0.18)]",
};

export function HudLabel({
  children,
  tone = "cyan",
  className = "",
}: HudLabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] backdrop-blur-xl ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
