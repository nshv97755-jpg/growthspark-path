import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Eye, Server, Users, Mail } from "lucide-react";
import { LegalShell } from "@/components/legal-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GrowthPilot" },
      {
        name: "description",
        content:
          "GrowthPilot's Privacy Policy explains how we collect, use, and protect your Instagram profile data and account information.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — GrowthPilot",
      },
      {
        property: "og:description",
        content:
          "Learn how GrowthPilot handles Instagram profile data, analytics, and account insights.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://growthspark-path.lovable.app/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://growthspark-path.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      label="Legal"
      icon={Shield}
      lastUpdated="Last updated: August 7, 2026"
    >
      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">1. Introduction</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          GrowthPilot (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard information when you use the GrowthPilot website and services, including when you connect your Instagram account to receive AI-powered profile analysis and personalized growth reports.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">2. Information We Collect</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          When you use GrowthPilot, we may collect the following types of information:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">Instagram profile information:</strong> With your explicit permission, we collect your Instagram username, display name, profile picture URL, bio, follower count, following count, and other public profile data available through Instagram’s APIs.
          </li>
          <li>
            <strong className="text-foreground">Analytics and account insights:</strong> We may collect engagement metrics, reach, impressions, content performance data, and audience insights that are made available to us through Instagram’s platform APIs.
          </li>
          <li>
            <strong className="text-foreground">Account and usage data:</strong> Your email address, subscription status, report history, language preference, and interactions with GrowthPilot features.
          </li>
          <li>
            <strong className="text-foreground">Device and log data:</strong> Standard browser and device information, IP address, and system logs used to maintain security and service performance.
          </li>
        </ul>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We use the information we collect to:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Generate AI-powered profile analyses and personalized growth reports.</li>
          <li>Deliver tailored content strategies, recommendations, and content ideas.</li>
          <li>Improve our models, product features, and overall user experience.</li>
          <li>Process payments, manage subscriptions, and provide customer support.</li>
          <li>Send important service updates, account notifications, and optional marketing communications.</li>
          <li>Detect abuse, prevent fraud, and maintain the security of our platform.</li>
        </ul>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">4. Data Storage & Security</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We store your data on secure cloud infrastructure with industry-standard encryption in transit and at rest. Instagram OAuth tokens are encrypted and access is limited to authorized systems. We do not store your Instagram password. We implement strict access controls, regular monitoring, and security reviews to protect your information from unauthorized access or disclosure.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">5. Data Sharing & Third Parties</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong className="text-foreground">We do not sell your personal information or Instagram data to third parties.</strong>
          {" "}We may share limited information with trusted service providers who help us operate GrowthPilot, such as cloud hosting, payment processing, analytics, and customer support platforms. These providers are bound by confidentiality and data protection obligations.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">6. Instagram Permissions</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Connecting your Instagram account is optional and requires your explicit consent. You can revoke GrowthPilot’s access at any time through your Instagram settings or by contacting us. When you revoke access, we can no longer retrieve updated data, but previously generated reports may remain in your account until deletion is requested.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">7. Data Retention</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We retain your information for as long as your account is active or as needed to provide our services. If you delete your account, we will remove your personal data and Instagram tokens from our systems within a reasonable period, typically no longer than 30 days, unless we are required to retain it for legal or compliance purposes.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">8. Your Rights</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Depending on your location, you may have the right to access, correct, export, or delete your personal data. You may also object to certain processing or withdraw consent. To exercise these rights, contact us at the email address below.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a prominent notice within the product before the changes become effective.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-foreground">10. Contact Us</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
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
