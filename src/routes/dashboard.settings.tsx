import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getCurrentUser, getProfile, upsertProfile, uploadAvatar } from "@/lib/db";
import { getStoredTheme, applyTheme } from "@/lib/theme";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — GrowthPilot" },
      { name: "description", content: "Update your GrowthPilot profile details, notification preferences, language and appearance settings." },
      { property: "og:title", content: "Settings — GrowthPilot" },
      { property: "og:description", content: "Update your GrowthPilot profile details, notification preferences, language and appearance settings." },
      { property: "og:url", content: "https://growthspark-path.lovable.app/dashboard/settings" },
    ],
  }),
  component: Settings,
});

const toggles = [
  { id: "report-alerts", label: "Report ready alerts", desc: "Notify me when a full report finishes generating.", on: true },
  { id: "weekly-digest", label: "Weekly growth digest", desc: "A weekly summary of your tracked profiles.", on: true },
  { id: "product-updates", label: "Product updates", desc: "New features and improvements.", on: false },
];

function Settings() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDark(getStoredTheme() === "dark");
    (async () => {
      const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
      if (user) {
        setUserId(user.id);
        setEmail(user.email ?? "");
        setOriginalEmail(user.email ?? "");
      }
      if (profile) {
        setName(profile.display_name ?? "");
        setAvatarUrl(profile.avatar_url);
      }
      setLoading(false);
    })();
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email can't be empty.");
      return;
    }
    if (!userId) {
      toast.error("You need to be signed in to save changes.");
      return;
    }
    setSaving(true);
    try {
      const ok = await upsertProfile({ display_name: name.trim() });
      if (!ok) throw new Error("Failed to save profile");

      if (email.trim() !== originalEmail) {
        const { supabase } = await import("@/integrations/supabase/client");
        const { error } = await supabase.auth.updateUser({ email: email.trim() });
        if (error) throw error;
        toast.success("Profile saved — check your inbox to confirm the new email");
        setOriginalEmail(email.trim());
      } else {
        toast.success("Profile saved");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!userId) {
      toast.error("You need to be signed in to upload an avatar.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }

    setUploadingAvatar(true);
    try {
      const url = await uploadAvatar(file);
      if (!url) throw new Error("Upload failed");
      const ok = await upsertProfile({ avatar_url: url });
      if (!ok) throw new Error("Failed to save avatar");
      setAvatarUrl(url);
      toast.success("Avatar updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
    applyTheme(checked ? "dark" : "light");
    toast.success(checked ? "Dark mode enabled" : "Light mode enabled");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Reveal>
        <form onSubmit={saveProfile} className="rounded-3xl glass p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold">Profile</h2>
          <div className="mt-6 flex items-center gap-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Your avatar"
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-primary-foreground">
                {name.trim().charAt(0).toUpperCase() || "A"}
              </span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFile}
            />
            <Button
              type="button"
              variant="glass"
              size="sm"
              disabled={uploadingAvatar || loading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadingAvatar ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Uploading…
                </>
              ) : (
                "Change avatar"
              )}
            </Button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="settings-name" className="text-sm text-muted-foreground">Full name</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
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
                disabled={loading}
                className="mt-1.5"
              />
            </div>
          </div>
          <Button type="submit" variant="hero" size="sm" className="mt-6" disabled={saving || loading}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl glass p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold">Notifications</h2>
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
          <h2 className="font-display text-lg font-semibold">Appearance</h2>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="dark-mode" className="text-sm font-medium">Dark mode</Label>
              <p className="text-xs text-muted-foreground">Switch between light and dark theme.</p>
            </div>
            <Switch id="dark-mode" checked={isDark} onCheckedChange={handleThemeToggle} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
