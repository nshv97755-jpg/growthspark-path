import { supabase } from "@/integrations/supabase/client";
import type { InstagramConnection, InstagramSession } from "@/lib/instagram/types";

/**
 * Thin data layer over Lovable Cloud (Supabase).
 * Every helper is user-scoped; when nobody is signed in the helpers no-op or
 * return null so the UI keeps working with its local/mock state.
 */

export async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/* ---------------- Instagram connection ---------------- */

export async function upsertInstagramConnection(
  session: InstagramSession,
): Promise<boolean> {
  const userId = await getUserId();
  if (!userId) return false;
  const c = session.connection;
  const { error } = await supabase.from("instagram_connections").upsert(
    {
      user_id: userId,
      instagram_user_id: c.id,
      username: c.username,
      name: c.name ?? null,
      profile_picture: c.profilePicture,
      followers: c.followers ?? null,
      media_count: c.mediaCount ?? null,
      account_type: c.accountType ?? null,
      token_expires_at: session.expiresAt ? new Date(session.expiresAt).toISOString() : null,
      connected_at: c.connectedAt,
    },
    { onConflict: "user_id,instagram_user_id" },
  );
  if (error) {
    console.error("[db] upsertInstagramConnection", error.message);
    return false;
  }
  return true;
}

export async function fetchInstagramConnection(): Promise<InstagramConnection | null> {
  const userId = await getUserId();
  if (!userId) return null;
  const { data, error } = await supabase
    .from("instagram_connections")
    .select("*")
    .eq("user_id", userId)
    .order("connected_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.instagram_user_id,
    username: data.username,
    name: data.name ?? undefined,
    profilePicture: data.profile_picture ?? "",
    followers: data.followers ?? undefined,
    mediaCount: data.media_count ?? undefined,
    accountType: data.account_type ?? undefined,
    connectedAt: data.connected_at,
  };
}

export async function deleteInstagramConnections(): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from("instagram_connections").delete().eq("user_id", userId);
}

/* ---------------- Analyses ---------------- */

export type AnalysisRow = {
  id: string;
  username: string;
  score: number | null;
  potential: string | null;
  status: string;
  created_at: string;
};

export async function saveAnalysis(input: {
  username: string;
  score: number;
  potential: string;
  result: unknown;
}): Promise<string | null> {
  const userId = await getUserId();
  if (!userId) return null;
  const { data, error } = await supabase
    .from("analyses")
    .insert({
      user_id: userId,
      username: input.username,
      score: input.score,
      potential: input.potential,
      status: "completed",
      result: input.result as never,
    })
    .select("id")
    .single();
  if (error) {
    console.error("[db] saveAnalysis", error.message);
    return null;
  }
  return data.id;
}

export async function listAnalyses(): Promise<AnalysisRow[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data, error } = await supabase
    .from("analyses")
    .select("id, username, score, potential, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}

/* ---------------- Reports ---------------- */

export async function saveReport(input: {
  analysisId: string | null;
  title: string;
  summary?: string;
  content: unknown;
}): Promise<string | null> {
  const userId = await getUserId();
  if (!userId) return null;
  const { data, error } = await supabase
    .from("reports")
    .insert({
      user_id: userId,
      analysis_id: input.analysisId,
      title: input.title,
      summary: input.summary ?? null,
      content: input.content as never,
    })
    .select("id")
    .single();
  if (error) {
    console.error("[db] saveReport", error.message);
    return null;
  }
  return data.id;
}

export async function listReports() {
  const userId = await getUserId();
  if (!userId) return [];
  const { data } = await supabase
    .from("reports")
    .select("id, title, summary, analysis_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

/* ---------------- API logs ---------------- */

export async function logApiCall(input: {
  endpoint: string;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  error?: string;
  analysisId?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  const { error } = await supabase.from("api_logs").insert({
    user_id: userId,
    analysis_id: input.analysisId ?? null,
    endpoint: input.endpoint,
    method: input.method ?? "POST",
    status_code: input.statusCode ?? null,
    duration_ms: input.durationMs ?? null,
    error: input.error ?? null,
    metadata: (input.metadata ?? {}) as never,
  });
  if (error) console.error("[db] logApiCall", error.message);
}
