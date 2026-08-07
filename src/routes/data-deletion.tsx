import { createFileRoute } from "@tanstack/react-router";
import { Trash2, Mail } from "lucide-react";
import { LegalShell } from "@/components/legal-shell";

export const Route = createFileRoute("/data-deletion")({
  head: () => ({
    meta: [
      { title: "Data Deletion — GrowthPilot" },
      {
        name: "description",
        content:
          "Request deletion of your GrowthPilot account and Instagram data. All stored data is permanently removed within 7 days of verification.",
      },
      {
        property: "og:title",
        content: "Data Deletion — GrowthPilot",
      },
      {
        property: "og:description",
        content:
          "Request deletion of your GrowthPilot account and Instagram data. All stored data is permanently removed within 7 days of verification.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://growthspark-path.lovable.app/data-deletion" },
    ],
    links: [
      { rel: "canonical", href: "https://growthspark-path.lovable.app/data-deletion" },
    ],
  }),
  component: DataDeletionPage,
});

function DataDeletionPage() {
  return (
    <LegalShell
      title="Data Deletion"
      label="Privacy"
      icon={Trash2}
      lastUpdated="Last updated: August 7, 2026"
    >
      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">Your Right to Delete</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          You have the right to request the deletion of your personal data and account information from GrowthPilot at any time. Once we verify your request, we will permanently remove all stored data associated with your account, including your Instagram connection details, profile analytics, and generated reports.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">How to Request Deletion</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          To request deletion of your account data, please send an email from the address associated with your GrowthPilot account to:
        </p>
        <a
          href="mailto:nshv97755@gmail.com?subject=GrowthPilot%20Data%20Deletion%20Request"
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-card/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Mail className="h-4 w-4 text-primary" />
          nshv97755@gmail.com
        </a>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Please include the following information in your email:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>The Instagram username connected to your GrowthPilot account.</li>
          <li>The email address associated with your GrowthPilot account.</li>
          <li>A clear statement that you wish to delete your account and all associated data.</li>
        </ul>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">Verification Process</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Before we delete your data, we will verify your identity to protect your account from unauthorized deletion requests. We may send a confirmation email or ask you to confirm details associated with your account. Once verification is complete, deletion will proceed automatically.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">Deletion Timeline</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong className="text-foreground">All stored data will be permanently deleted within 7 days</strong> of successful verification. This includes your profile information, analytics, reports, payment records, and any stored Instagram access tokens. Some residual data may remain in encrypted backups for a short period but will be permanently purged according to our backup retention schedule.
        </p>
      </section>

      <section className="border-b border-white/[0.08] pb-10">
        <h2 className="font-display text-xl font-semibold text-foreground">What Happens After Deletion</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Once deletion is complete, your account will be closed and you will no longer be able to access any reports or data. We will also revoke any active Instagram access tokens connected to your account. Deleted data cannot be recovered.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-foreground">Questions About Deletion</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          If you have any questions about the data deletion process or need help with your request, please contact us at:
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
