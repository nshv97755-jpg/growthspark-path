import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AuroraBackground } from "@/components/aurora-background";
import { Reveal } from "@/components/reveal";

interface LegalShellProps {
  title: string;
  label: string;
  icon: LucideIcon;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalShell({ title, label, icon: Icon, lastUpdated, children }: LegalShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteNav />
      <main className="relative px-4 pb-24 pt-36 sm:pt-44">
        <AuroraBackground className="opacity-40" />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-card/70 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">{lastUpdated}</p>
          </Reveal>
          <div className="mt-14 space-y-12">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
