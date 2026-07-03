import { Instagram, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useInstagramConnection } from "@/hooks/use-instagram-connection";

export function InstagramConnectCard() {
  const { status, connection, error, connect, disconnect } = useInstagramConnection();

  const handleConnect = async () => {
    try {
      const c = await connect();
      toast.success(`Instagram connected — @${c.username}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't connect Instagram");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Instagram disconnected");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't disconnect");
    }
  };

  return (
    <div className="rounded-3xl glass p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">Instagram account</h3>
          <p className="text-xs text-muted-foreground">
            Connect your account to power personalized profile analysis.
          </p>
        </div>
        {status === "connected" && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success">
            <CheckCircle2 className="h-4 w-4" /> Instagram Connected
          </span>
        )}
      </div>

      <div className="mt-6">
        {status === "loading" && (
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 animate-pulse rounded-2xl bg-secondary" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
            </div>
          </div>
        )}

        {status === "connected" && connection && (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={connection.profilePicture}
                alt={connection.username}
                className="h-14 w-14 rounded-2xl border border-border"
              />
              <div>
                <p className="font-display text-base font-semibold">@{connection.username}</p>
                <p className="text-xs text-muted-foreground">
                  {connection.name ?? "Instagram account"}
                  {connection.accountType ? ` · ${titleCase(connection.accountType)}` : ""}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="glass"
              size="sm"
              className="shrink-0"
              disabled={status !== "connected"}
              onClick={handleDisconnect}
            >
              Disconnect Instagram
            </Button>
          </div>
        )}

        {status === "disconnecting" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Disconnecting…
          </div>
        )}

        {(status === "disconnected" || status === "connecting") && (
          <div className="space-y-3">
            <Button
              type="button"
              variant="hero"
              size="lg"
              disabled={status === "connecting"}
              onClick={handleConnect}
            >
              {status === "connecting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Connecting…
                </>
              ) : (
                <>
                  <Instagram className="h-4 w-4" /> Connect Instagram
                </>
              )}
            </Button>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" /> {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
