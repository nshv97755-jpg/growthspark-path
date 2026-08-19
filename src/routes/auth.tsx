import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuroraBackground } from "@/components/aurora-background";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — GrowthPilot" },
      { name: "description", content: "Sign in to GrowthPilot to analyze your creator profile and view your personalized social media growth reports." },
      { property: "og:title", content: "Sign in — GrowthPilot" },
      { property: "og:description", content: "Sign in to GrowthPilot to analyze your creator profile and view your growth reports." },
      { property: "og:url", content: "https://growthspark-path.lovable.app/auth" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "signup" | "forgot";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) throw error;
        toast.success("Reset link sent — check your inbox");
        setMode("login");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created — welcome to GrowthPilot");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <AuroraBackground />
      <div className="absolute left-6 top-6">
        <Logo />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-md rounded-3xl glass-strong p-8 shadow-card"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-7 text-center">
              <h1 className="font-display text-2xl font-bold">
                {mode === "login" && "Welcome back"}
                {mode === "signup" && "Create your account"}
                {mode === "forgot" && "Reset your password"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "login" && "Sign in to your growth dashboard"}
                {mode === "signup" && "Start with a free profile analysis"}
                {mode === "forgot" && "We'll email you a reset link"}
              </p>
            </div>

            {mode !== "forgot" && (
              <>
                <Button
                  type="button"
                  variant="glass"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate({ to: "/dashboard" })}
                >
                  <GoogleIcon /> Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="glass"
                  size="lg"
                  className="mt-3 w-full"
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: "facebook",
                        options: { redirectTo: `${window.location.origin}/dashboard` },
                      });
                      if (error) throw error;
                    } catch (err) {
                      toast.error(
                        err instanceof Error ? err.message : "Facebook sign-in failed. Please try again.",
                      );
                      setBusy(false);
                    }
                  }}
                >
                  <FacebookIcon /> Continue with Facebook
                </Button>
                <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> or
                  <span className="h-px flex-1 bg-border" />
                </div>
              </>
            )}


            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <Field
                  icon={User}
                  label="Full name"
                  placeholder="Alex Carter"
                  type="text"
                  value={name}
                  onChange={setName}
                />
              )}
              <Field
                icon={Mail}
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={setEmail}
              />
              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Password</Label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-accent hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Please wait…
                  </>
                ) : (
                  <>
                    {mode === "login" && "Sign in"}
                    {mode === "signup" && "Create account"}
                    {mode === "forgot" && "Send reset link"}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" && (
                <>
                  New here?{" "}
                  <button onClick={() => setMode("signup")} className="text-accent hover:underline">
                    Create an account
                  </button>
                </>
              )}
              {mode === "signup" && (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-accent hover:underline">
                    Sign in
                  </button>
                </>
              )}
              {mode === "forgot" && (
                <button
                  onClick={() => setMode("login")}
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  placeholder,
  type,
  value,
  onChange,
}: {
  icon: typeof Mail;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type={type}
          placeholder={placeholder}
          className="pl-9"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}

function GoogleIcon() {

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
