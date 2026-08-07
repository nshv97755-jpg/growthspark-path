import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail } from "lucide-react";
import { LegalShell } from "@/components/legal-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — GrowthPilot" },
      {
        name: "description",
        content:
          "GrowthPilot's Terms of Service outline acceptable use, user responsibilities, AI report limitations, and liability terms.",
      },
      {
        property: "og:title",
        content: "Terms of Service — GrowthPilot",
      },
      {
        property: "og:description",
        content:
          "Read the GrowthPilot Terms of Service for acceptable use, account security, and AI-generated content disclaimers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://growthspark-path.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://growthspark-path.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      label="Legal"
      icon={FileText}
      lastUpdated="Last updated: August 7, 2026"
    >
      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          1. Acceptance of Terms
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          By accessing or using GrowthPilot, you agree to be bound by these Terms of Service. If you
          do not agree to these terms, you must not use our services. These terms apply to all
          visitors, users, and subscribers.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">2. Eligibility</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          You must be at least 13 years old, or the minimum age required in your jurisdiction, to
          use GrowthPilot. By using our services, you represent that you have the legal capacity to
          enter into this agreement and that all information you provide is accurate and complete.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          3. Description of Services
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          GrowthPilot provides AI-powered profile analysis and personalized growth reports for
          content creators. You may connect your Instagram account to enable our systems to analyze
          publicly available profile data and generate recommendations. The reports are provided for
          informational purposes only and do not guarantee any specific result, growth outcome, or
          engagement increase.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">4. Acceptable Use</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          You agree to use GrowthPilot only for lawful purposes and in compliance with these terms.
          You must not:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            Use the service to scrape, reverse-engineer, or extract data outside of authorized
            Instagram permissions.
          </li>
          <li>
            Attempt to access accounts, data, or systems that you do not own or have permission to
            use.
          </li>
          <li>
            Use the service to impersonate others, harass users, or distribute spam, malware, or
            unlawful content.
          </li>
          <li>Circumvent security measures, rate limits, or access controls.</li>
          <li>
            Resell, redistribute, or commercially exploit GrowthPilot reports without written
            consent.
          </li>
        </ul>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          5. User Responsibilities
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activity that occurs under your account. You must ensure that your use of
          GrowthPilot, including any Instagram connection, complies with Instagram’s Terms of Use
          and Community Guidelines. You may revoke our access to your Instagram data at any time
          through your Instagram settings.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          6. AI-Generated Reports
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          GrowthPilot reports are generated using artificial intelligence based on the data you
          provide. While we strive for accuracy and usefulness, the outputs may contain errors,
          assumptions, or recommendations that are not appropriate for your specific situation. You
          should use your own judgment before acting on any advice, and GrowthPilot is not a
          substitute for professional marketing, legal, or financial advice.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          7. Intellectual Property
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          All content, branding, software, designs, and generated report formats provided by
          GrowthPilot are owned by GrowthPilot or its licensors. You are granted a limited,
          non-exclusive, non-transferable license to use the reports for personal or internal
          business purposes. You may not copy, modify, distribute, or create derivative works of our
          platform or reports without prior written permission.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          8. Payment & Subscriptions
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Paid plans are billed on a recurring basis unless stated otherwise. Subscription fees are
          non-refundable except where required by law. You may cancel your subscription at any time
          from your billing settings. Access to paid features continues until the end of the current
          billing period.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">9. Termination</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We reserve the right to suspend or terminate your account, without prior notice, if you
          violate these Terms of Service or engage in activity that harms our platform or other
          users. You may also terminate your account at any time by contacting us.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">
          10. Limitation of Liability
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          To the maximum extent permitted by law, GrowthPilot and its operators shall not be liable
          for any indirect, incidental, consequential, or punitive damages arising from your use of
          the service. Our total liability for any claim shall not exceed the total amount paid by
          you to GrowthPilot in the 12 months preceding the event giving rise to the claim.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">11. Governing Law</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          These Terms of Service shall be governed by and construed in accordance with the laws of
          India. Any disputes arising from these terms or your use of the service shall be resolved
          exclusively in the courts located in India.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">12. Changes to Terms</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We may modify these Terms of Service from time to time. We will notify users of material
          changes by email or by posting a notice within the product. Continued use of GrowthPilot
          after changes constitutes acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-foreground">13. Contact Us</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <a
          href="mailto:nshv97755@gmail.com"
          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-card/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Mail className="h-4 w-4 text-primary" />
          nshv97755@gmail.com
        </a>
      </section>
    </LegalShell>
  );
}
