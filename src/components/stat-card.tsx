import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { CountUp } from "@/components/count-up";

export function Sparkline({
  points,
  className = "",
}: {
  points: number[];
  className?: string;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 28 - ((p - min) / (max - min || 1)) * 24 - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className={`h-8 w-full ${className}`}>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--success)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function StatCard({
  label,
  value,
  suffix = "",
  delta,
  points,
}: {
  label: string;
  value: number;
  suffix?: string;
  delta: string;
  points: number[];
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-card/70 p-4">
      <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        <p className="font-grotesk text-2xl font-semibold">
          <CountUp to={value} suffix={suffix} />
        </p>
        <span className="mb-1 inline-flex items-center gap-0.5 rounded-full bg-success/12 px-1.5 py-0.5 text-[0.7rem] font-medium text-success">
          <ArrowUpRight className="h-3 w-3" />
          {delta}
        </span>
      </div>
      <div className="mt-2">
        <Sparkline points={points} />
      </div>
    </div>
  );
}
