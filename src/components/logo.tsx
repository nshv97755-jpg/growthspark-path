import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand transition-transform group-hover:scale-[1.03]">
        <Compass className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
      </span>
      {withText && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Growth<span className="text-gradient">Pilot</span>
        </span>
      )}
    </Link>
  );
}
