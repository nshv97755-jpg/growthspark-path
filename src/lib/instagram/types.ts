// Shared Instagram connection types.
// These describe the connected account exactly as the real Meta Instagram
// OAuth flow will surface it, so swapping the mock provider for the real one
// requires no changes to the UI or hooks that consume these types.

export type InstagramConnection = {
  /** Instagram user id (numeric string from the Graph API). */
  id: string;
  /** @handle without the leading "@". */
  username: string;
  /** Display name / full name when available. */
  name?: string;
  /** Public profile picture URL. */
  profilePicture: string;
  /** Follower count when available (for future profile analysis). */
  followers?: number;
  /** Media / post count when available. */
  mediaCount?: number;
  /** Account type reported by Instagram (PERSONAL | BUSINESS | CREATOR). */
  accountType?: string;
  /** ISO timestamp of when the connection was established. */
  connectedAt: string;
};

export type InstagramSession = {
  connection: InstagramConnection;
  /** Opaque access token. Never rendered in the UI. */
  accessToken: string;
  /** Epoch ms when the token expires (if known). */
  expiresAt?: number;
};

export type InstagramStatus =
  | { state: "disconnected" }
  | { state: "connected"; connection: InstagramConnection };
