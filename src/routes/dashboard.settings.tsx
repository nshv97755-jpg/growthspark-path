import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { InstagramConnectCard } from "@/components/instagram/connect-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — GrowthPilot" }] }),
  component: Settings,
});

const toggles = [
  { id: "report-alerts", label: "Report ready alerts", desc: "Notify me when a full report finishes generating.", on: true },
  { id: "weekly-digest", label: "Weekly growth digest", desc: "A weekly summary of your tracked profiles.", on: true },
  { id: "product-updates", label: "Product updates", desc: "New features and improvements.", on: false },
];

function Settings() {
  const [name, setName] = useState("Alex Carter");
  const [email, setEmail] = useState("alex@example.com");
  const [saving, setSaving] = useState(false);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email can't be empty.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile saved");
    }, 700);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Reveal>
        <form onSubmit={saveProfile} className="rounded-3xl glass p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Profile</h3>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-primary-foreground">
              {name.trim().charAt(0).toUpperCase() || "A"}
            </span>
            <Button
              type="button"
              variant="glass"
              size="sm"
              onClick={() => toast("Avatar upload coming soon")}
            >
              Change avatar
            </Button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="settings-name" className="text-sm text-muted-foreground">Full name</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="settings-email" className="text-sm text-muted-foreground">Email</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          <Button type="submit" variant="hero" size="sm" className="mt-6" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </Reveal>

      <Reveal>
        <InstagramConnectCard />
      </Reveal>

      <Reveal>
        <div className="rounded-3xl glass p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Notifications</h3>
          <div className="mt-5 space-y-4">
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor={t.id} className="text-sm font-medium">{t.label}</Label>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch
                  id={t.id}
                  defaultChecked={t.on}
                  onCheckedChange={(v) =>
                    toast.success(`${t.label} ${v ? "enabled" : "disabled"}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl glass p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Appearance</h3>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="dark-mode" className="text-sm font-medium">Dark mode</Label>
              <p className="text-xs text-muted-foreground">GrowthPilot is optimized for dark.</p>
            </div>
            <Switch
              id="dark-mode"
              defaultChecked
              onCheckedChange={() => toast("Light mode is coming soon")}
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
