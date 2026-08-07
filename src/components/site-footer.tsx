import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 pb-12 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI growth strategist that tells creators the truth about their account.
            </p>
            <form
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-white/[0.09] bg-card/70 p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Button asChild variant="hero" size="sm">
                <Link to="/auth">Get Started</Link>
              </Button>
            </form>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Product</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="/#features" className="transition-colors hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="transition-colors hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#preview" className="transition-colors hover:text-foreground">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="/#testimonials" className="transition-colors hover:text-foreground">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="transition-colors hover:text-foreground">
                  Data Deletion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold">Account</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/auth" className="transition-colors hover:text-foreground">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/dashboard/analyze" className="transition-colors hover:text-foreground">
                  Analyze profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 GrowthPilot. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made for creators who want the truth.</p>
        </div>
      </div>
    </footer>
  );
}
