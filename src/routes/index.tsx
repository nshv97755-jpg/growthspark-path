import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Check,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowthPilot — Discover Exactly Why You're Not Growing" },
      {
        name: "description",
        content:
          "AI analyzes your creator profile and gives you a personalized growth strategy. Stop guessing why you're stuck.",
      },
      { property: "og:title", content: "GrowthPilot — Discover Why You're Not Growing" },
      {
        property: "og:description",
        content: "AI analyzes your creator profile and gives you a personalized growth strategy.",
      },
    ],
  }),
  component: Landing,
});

const testimonials = [
  {
    quote:
      "I'd been stuck at 40K for a year. GrowthPilot found 3 issues in my bio and posting times I never noticed. Up 22K in two months.",
    name: "Maya R.",
    role: "Lifestyle creator",
  },
  {
    quote:
      "This doesn't feel like another AI tool. It feels like a strategist that actually studied my account.",
    name: "Devon K.",
    role: "Tech reviewer",
  },
  {
    quote:
      "The forecast alone paid for itself. I finally knew which formats to double down on.",
    name: "Priya S.",
    role: "Fitness coach",
  },
];

const faqItems = [
  {
    q: "How does the analysis work?",
    a: "Our AI evaluates your public profile signals — bio, posting cadence, engagement patterns, niche fit, and format mix — then benchmarks them against top performers in your category to surface what's holding you back.",
  },
  {
    q: "Is the free analysis really free?",
    a: "Yes. You get your full Growth Score, category breakdown, and the number of issues found at no cost. The detailed fixes and your complete playbook are part of the Pro report.",
  },
  {
    q: "Which platforms are supported?",
    a: "We currently focus on Instagram creator profiles, with TikTok and YouTube support rolling out soon.",
  },
  {
    q: "Will this work for my niche?",
    a: "GrowthPilot detects your niche automatically and tailors every recommendation, content idea, and benchmark to it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Pro is month-to-month with no lock-in. Cancel in one click from your billing settings.",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative px-4 py-32 sm:py-40 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-semibold leading-tight text-card-foreground"
          >
            See exactly what's holding your growth back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            AI analyzes your Instagram profile and finds the specific issues tanking your growth. Get actionable insights in 30 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard/analyze">
                See your growth score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <p className="mt-4 text-sm text-muted-foreground">
            Free analysis. No credit card required.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold text-card-foreground">
              How it works
            </h2>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-card-foreground">
                  Deep profile diagnosis
                </h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  We analyze your bio, captions, posting patterns, engagement, and niche to identify exactly what's holding you back. No guessing.
                </p>
              </div>
              <div className="hidden md:block" />
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="hidden md:block" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-card-foreground">
                  Personalized growth score
                </h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  Get a 0-100 score based on your specific niche and audience. See exactly where you rank and what to fix first.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-card-foreground">
                  Actionable growth plan
                </h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  Get 30 viral content ideas, captions, hashtags, and a 7-day action plan. Stop guessing what to post.
                </p>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-card-foreground">
              Simple pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade whenever you need more.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-4 font-semibold text-card-foreground text-base">Feature</th>
                  <th className="pb-4 px-4 text-center font-semibold text-card-foreground text-base">Free</th>
                  <th className="pb-4 px-4 text-center font-semibold text-card-foreground text-base bg-primary/5 rounded-t-lg">
                    Pro
                    <span className="ml-2 inline-block rounded-full bg-primary text-white text-xs px-2 py-0.5">
                      Most popular
                    </span>
                  </th>
                  <th className="pb-4 pl-4 text-center font-semibold text-card-foreground text-base">Studio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Growth Score</td>
                  <td className="py-3 px-4 text-center">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center bg-primary/5">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="py-3 pl-4 text-center">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Full Premium Report</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">—</td>
                  <td className="py-3 px-4 text-center bg-primary/5">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="py-3 pl-4 text-center">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Content Ideas & Captions</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">—</td>
                  <td className="py-3 px-4 text-center bg-primary/5">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                  <td className="py-3 pl-4 text-center">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Multiple profiles</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">—</td>
                  <td className="py-3 px-4 text-center bg-primary/5 text-muted-foreground">—</td>
                  <td className="py-3 pl-4 text-center">
                    <Check className="h-5 w-5 text-success mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="pt-6 pr-4" />
                  <td className="pt-6 px-4">
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link to="/dashboard/analyze">Get started</Link>
                    </Button>
                  </td>
                  <td className="pt-6 px-4 bg-primary/5">
                    <Button asChild variant="hero" size="lg" className="w-full">
                      <Link to="/dashboard/analyze">Start free</Link>
                    </Button>
                  </td>
                  <td className="pt-6 pl-4">
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <a href="mailto:sales@growthpilot.app">Contact sales</a>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative px-4 py-24 bg-background">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-card-foreground">
            Growth you can actually feel
          </h2>
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-card-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-card-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative px-4 py-24 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-card-foreground">
              Questions, answered
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-lg px-4 py-0"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary transition-colors py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 py-24 bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-semibold text-card-foreground">
            Your audience is waiting. Find out what's in the way.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Run a free analysis and get your Growth Score in under a minute.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-8">
            <Link to="/dashboard/analyze">
              See your growth score <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <Link to="/auth" className="hover:text-foreground">Sign in</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 GrowthPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
