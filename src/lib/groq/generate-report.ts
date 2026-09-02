import { createServerFn } from "@tanstack/react-start";

export type GeneratedReport = {
  growthScore: number;
  growthPotential: "Low" | "Medium" | "High";
  issuesFound: number;
  topIssue: string;
  potentialGain: string;
  niche: string;
  categories: { label: string; value: number; hint: string }[];
  whyNotGrowing: string;
  mistakes: { title: string; detail: string }[];
  recommendations: string[];
  contentIdeas: string[];
  captions: string[];
  hashtags: string[];
  strategy: { pillar: string; share: number; note: string }[];
  weekPlan: { day: string; task: string; goal: string }[];
  forecast: { month: string; followers: number }[];
  competitors: { name: string; followers: string; why: string }[];
};

type ProfileInput = {
  username: string;
  followers?: number;
  mediaCount?: number;
  accountType?: string;
  name?: string;
};

const SYSTEM_PROMPT = `You are a social media growth strategist. Given an Instagram creator's profile stats, output ONLY a single valid JSON object (no markdown fences, no commentary, no preamble) matching exactly this shape:

{
  "growthScore": number (0-100),
  "growthPotential": "Low" | "Medium" | "High",
  "issuesFound": number (5-9),
  "topIssue": string (short phrase),
  "potentialGain": string (e.g. "+18%"),
  "niche": string,
  "categories": [ { "label": string, "value": number (0-100), "hint": string } ] (exactly 4 items: "Followers", "Engagement Rate", "Creator Niche", "Growth Potential"),
  "whyNotGrowing": string (2-4 sentences),
  "mistakes": [ { "title": string, "detail": string } ] (exactly 5 items),
  "recommendations": string[] (exactly 5 items),
  "contentIdeas": string[] (exactly 30 short items),
  "captions": string[] (exactly 10 short items),
  "hashtags": string[] (exactly 10 items, each starting with #),
  "strategy": [ { "pillar": string, "share": number, "note": string } ] (exactly 4 items, shares sum to 100),
  "weekPlan": [ { "day": string, "task": string, "goal": string } ] (exactly 7 items, Mon-Sun),
  "forecast": [ { "month": string, "followers": number } ] (exactly 7 items, first one "Now"),
  "competitors": [ { "name": string, "followers": string, "why": string } ] (exactly 3 items)
}

Base every field on the given profile stats. Be specific and realistic, not generic filler. Return ONLY the JSON object, nothing else.`;

async function callGroq(profile: ProfileInput, apiKey: string): Promise<string> {
  const userPrompt = `Instagram profile:
Username: @${profile.username}
Display name: ${profile.name ?? "unknown"}
Followers: ${profile.followers ?? "unknown"}
Posts: ${profile.mediaCount ?? "unknown"}
Account type: ${profile.accountType ?? "unknown"}

Generate the growth analysis JSON now.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_completion_tokens: 7000,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Groq API error ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Groq API returned no content");
  }
  return content;
}

function parseReport(raw: string): GeneratedReport {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "");
  const parsed = JSON.parse(cleaned);

  if (
    typeof parsed.growthScore !== "number" ||
    !Array.isArray(parsed.contentIdeas) ||
    !Array.isArray(parsed.captions)
  ) {
    throw new Error("Groq response missing required fields");
  }
  return parsed as GeneratedReport;
}

export const generateGrowthReport = createServerFn({ method: "POST" })
  .validator((input: ProfileInput) => input)
  .handler(async ({ data: profile }) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not configured on the server");
    }

    let lastError: unknown;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const raw = await callGroq(profile, apiKey);
        return parseReport(raw);
      } catch (err) {
        lastError = err;
      }
    }

    console.error("[generateGrowthReport] failed after retry:", lastError);
    const detail = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(`Couldn't generate your report right now — ${detail}`);
  });
