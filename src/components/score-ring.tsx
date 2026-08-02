import { motion } from "motion/react";

export function ScoreRing({
  value,
  size = 200,
  label = "Growth Score",
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const stroke = size * 0.07;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a94e" />
            <stop offset="55%" stopColor="#e5c36a" />
            <stop offset="100%" stopColor="#e5c36a" />

          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="font-grotesk text-5xl font-bold text-foreground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {value}
        </motion.span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">/ 100</span>
        <span className="mt-1 text-sm font-medium text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
