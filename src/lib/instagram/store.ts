import type { InstagramSession } from "./types";

/**
 * Session persistence seam.
 *
 * Today the mock session is stored in localStorage. When real per-user auth
 * and Lovable Cloud persistence are wired up, replace the body of these
 * functions with secure server-backed storage (a server function writing to
 * the `instagram_connections` table) — the async signatures already allow it,
 * so no consumer needs to change.
 */

const STORAGE_KEY = "growthpilot.instagram.session";

export async function loadSession(): Promise<InstagramSession | null> {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as InstagramSession;
  } catch {
    return null;
  }
}

export async function saveSession(session: InstagramSession): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export async function clearSession(): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
