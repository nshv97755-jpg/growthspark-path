export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 aurora animate-aurora opacity-80" />
      <div
        className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl animate-float"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div
        className="absolute right-[8%] top-[35%] h-72 w-72 rounded-full opacity-[0.05] blur-3xl animate-aurora"
        style={{ background: "radial-gradient(circle, #c2410c, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
        }}
      />

    </div>
  );
}
