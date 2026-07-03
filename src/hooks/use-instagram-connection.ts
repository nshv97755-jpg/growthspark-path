import { useCallback, useEffect, useState } from "react";
import { getInstagramProvider } from "@/lib/instagram/provider";
import { clearSession, loadSession, saveSession } from "@/lib/instagram/store";
import type { InstagramConnection, InstagramSession } from "@/lib/instagram/types";

type Status = "loading" | "disconnected" | "connecting" | "connected" | "disconnecting";

export function useInstagramConnection() {
  const [status, setStatus] = useState<Status>("loading");
  const [connection, setConnection] = useState<InstagramConnection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadSession().then((session) => {
      if (!active) return;
      if (session) {
        setConnection(session.connection);
        setStatus("connected");
      } else {
        setStatus("disconnected");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    try {
      const provider = getInstagramProvider();
      const session: InstagramSession = await provider.connect();
      await saveSession(session);
      setConnection(session.connection);
      setStatus("connected");
      return session.connection;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn't connect Instagram. Please try again.";
      setError(message);
      setStatus("disconnected");
      throw new Error(message);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setError(null);
    setStatus("disconnecting");
    try {
      const provider = getInstagramProvider();
      const session = await loadSession();
      await provider.disconnect(session);
      await clearSession();
      setConnection(null);
      setStatus("disconnected");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn't disconnect. Please try again.";
      setError(message);
      setStatus("connected");
      throw new Error(message);
    }
  }, []);

  return { status, connection, error, connect, disconnect };
}
