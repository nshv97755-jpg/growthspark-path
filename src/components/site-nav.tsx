import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";

export function SiteNav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-card" : "border border-transparent"
        }`}
      >
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-[0.875rem] font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="mr-1 hidden h-5 w-px bg-border sm:block" />
          <LanguageSelector compact />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">{t("common.signIn")}</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/dashboard/analyze">{t("common.analyzeProfile")}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
