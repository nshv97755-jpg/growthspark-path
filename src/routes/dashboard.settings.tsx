import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — GrowthPilot" }] }),
  component: Settings,
});

const toggles = [
  { label: "Report ready alerts", desc: "Notify me when a full report finishes generating.", on: true },
  { label: "Weekly growth digest", desc: "A weekly summary of your tracked profiles.", on: true },
  { label: "Product updates", desc: "New features and improvements.", on: false },
];

function Settings() {
  return (
    <div className="max-w-3xl space-y-6">
      <Reveal>
        <div className="rounded-3xl glass p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Profile</h3>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-primary-foreground">
              A
            </span>
            <Button variant="glass" size="sm">Change avatar</Button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-muted-foreground">Full name</Label>
              <Input defaultValue="Alex Carter" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input defaultValue="alex@example.com" className="mt-1.5" />
            </div>
          </div>
          <Button variant="hero" size="sm" className="mt-6">Save changes</Button>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl glass p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Notifications</h3>
          <div className="mt-5 space-y-4">
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.on} />
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
              <p className="text-sm font-medium">Dark mode</p>
              <p className="text-xs text-muted-foreground">GrowthPilot is optimized for dark.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
