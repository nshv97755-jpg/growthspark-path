import {
  deleteInstagramConnections,
  fetchInstagramConnection,
  upsertInstagramConnection,
} from "@/lib/db";
import type { InstagramSession } from "./types";

/**
 * Session persistence seam.
 *
 * The connected account is persisted in Lovable Cloud (table
 * `instagram_connections`, scoped to the signed-in user by RLS). The access
 * token itself is never written to the database from the browser; it stays in
 * localStorage alongside a local copy so the UI works while signed out too.
 */

const STORAGE_KEY = "growthpilot.instagram.session";

export async function loadSession(): Promise<InstagramSession | null> {
  const remote = await fetchInstagramConnection();
  if (remote) {
    const local = readLocal();
    return { connection: remote, accessToken: local?.accessToken ?? "", expiresAt: local?.expiresAt };
  }
  return readLocal();
}

export async function saveSession(session: InstagramSession): Promise<void> {
  writeLocal(session);
  await upsertInstagramConnection(session);
}

export async function clearSession(): Promise<void> {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  await deleteInstagramConnections();
}

function readLocal(): InstagramSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as InstagramSession;
  } catch {
    return null;
  }
}

function writeLocal(session: InstagramSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
