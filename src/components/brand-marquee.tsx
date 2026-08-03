import {
  Aperture,
  Boxes,
  Flame,
  Hexagon,
  Orbit,
  Rocket,
  Waves,
  Zap,
} from "lucide-react";

const brands = [
  { name: "Nova Studio", icon: Orbit },
  { name: "Hexly", icon: Hexagon },
  { name: "Aperture", icon: Aperture },
  { name: "Blockhaus", icon: Boxes },
  { name: "Emberly", icon: Flame },
  { name: "Tidal", icon: Waves },
  { name: "Voltix", icon: Zap },
  { name: "Launchpad", icon: Rocket },
];

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-14">
        {row.map((b, i) => (
          <span
            key={`${b.name}-${i}`}
            className="flex shrink-0 items-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            <b.icon className="h-5 w-5" strokeWidth={1.75} />
            <span className="font-display text-base font-medium tracking-tight">{b.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
