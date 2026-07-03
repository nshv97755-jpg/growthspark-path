import type { InstagramSession } from "./types";

/**
 * InstagramProvider is the seam between the app and whatever performs the
 * actual authentication. Today we use a mock provider; later, a real provider
 * backed by the official Meta Instagram OAuth flow can be dropped in here
 * WITHOUT changing any UI, hook, or storage code.
 */
export interface InstagramProvider {
  /** Kicks off authentication and resolves with an authenticated session. */
  connect(): Promise<InstagramSession>;
  /** Revokes / cleans up the remote session, if applicable. */
  disconnect(session: InstagramSession | null): Promise<void>;
}

const MOCK_PROFILES = [
  {
    id: "17841400000000001",
    username: "growth.creator",
    name: "Jordan Rivera",
    profilePicture:
      "https://api.dicebear.com/9.x/glass/svg?seed=growthcreator&backgroundType=gradientLinear",
    followers: 48213,
    mediaCount: 284,
    accountType: "CREATOR",
  },
  {
    id: "17841400000000002",
    username: "studio.frames",
    name: "Studio Frames",
    profilePicture:
      "https://api.dicebear.com/9.x/glass/svg?seed=studioframes&backgroundType=gradientLinear",
    followers: 12980,
    mediaCount: 512,
    accountType: "BUSINESS",
  },
];

/**
 * Mock provider — simulates the Instagram OAuth round-trip with a short delay
 * and returns dummy profile data. The returned shape is identical to what the
 * real provider will return.
 */
export class MockInstagramProvider implements InstagramProvider {
  async connect(): Promise<InstagramSession> {
    await delay(1400);

    // Simulate the small chance of a provider-side failure so the UI's error
    // handling is exercised in development.
    if (Math.random() < 0.05) {
      throw new Error("Instagram authorization was cancelled. Please try again.");
    }

    const profile = MOCK_PROFILES[Math.floor(Math.random() * MOCK_PROFILES.length)];

    return {
      connection: {
        ...profile,
        connectedAt: new Date().toISOString(),
      },
      accessToken: `mock.${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 60, // 60 days, mirrors long-lived tokens
    };
  }

  async disconnect(): Promise<void> {
    await delay(400);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Central place to choose the active provider. When the real Meta Instagram
 * OAuth integration is ready, return a RealInstagramProvider here (e.g. gated
 * behind an env flag) — no consumer needs to change.
 */
export function getInstagramProvider(): InstagramProvider {
  return new MockInstagramProvider();
}
