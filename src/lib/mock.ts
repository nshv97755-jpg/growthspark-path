export type Analysis = {
  username: string;
  avatar: string;
  followers: string;
  following: string;
  posts: string;
  growthScore: number;
  growthPotential: "Low" | "Medium" | "High";
  issuesFound: number;
  topIssue: string;
  potentialGain: string;
  categories: { label: string; value: number; hint: string }[];
  niche: string;
};

export const sampleAnalysis: Analysis = {
  username: "creatorname",
  avatar:
    "https://api.dicebear.com/9.x/glass/svg?seed=GrowthPilot&backgroundType=gradientLinear",
  followers: "48.2K",
  following: "612",
  posts: "284",
  growthScore: 72,
  growthPotential: "High",
  issuesFound: 7,
  topIssue: "Weak Bio",
  potentialGain: "+18%",
  niche: "Lifestyle & Productivity",
  categories: [
    { label: "Followers", value: 78, hint: "Steady but plateauing" },
    { label: "Engagement Rate", value: 54, hint: "Below niche average" },
    { label: "Creator Niche", value: 81, hint: "Well defined" },
    { label: "Growth Potential", value: 88, hint: "Untapped audience" },
  ],
};

export const lockedIssues = [
  "Weak Bio",
  "Inconsistent posting schedule",
  "Low first-hour engagement",
  "Weak hook structure",
  "Hashtag strategy mismatch",
  "Thumbnail / cover inconsistency",
  "No clear content pillars",
];

export const reportData = {
  whyNotGrowing:
    "Your account has strong fundamentals but is being held back by three compounding issues: a bio that fails to convert visitors into followers, inconsistent posting that confuses the algorithm, and weak opening hooks that kill watch-time in the first 3 seconds. Fixing these unlocks the audience you've already earned.",
  mistakes: [
    {
      title: "Your bio doesn't convert",
      detail:
        "It describes who you are, not what the viewer gets. Visitors decide to follow in under 2 seconds.",
    },
    {
      title: "Posting at the wrong times",
      detail: "62% of your posts go live when your audience is least active.",
    },
    {
      title: "Weak first 3 seconds",
      detail: "Hooks are too slow — average watch time drops 41% before the value lands.",
    },
    {
      title: "No content pillars",
      detail: "Your topics jump around, so the algorithm can't categorize your audience.",
    },
    {
      title: "Ignoring your best format",
      detail: "Carousels outperform your reels 3x but make up only 9% of posts.",
    },
  ],
  recommendations: [
    "Rewrite your bio with a clear outcome-driven value proposition.",
    "Lock in 3 content pillars and rotate them weekly.",
    "Post during your 6–9pm engagement window.",
    "Open every video with a pattern-interrupt hook.",
    "Double down on carousels — your highest-converting format.",
  ],
  contentIdeas: [
    "My exact morning routine for deep focus",
    "5 productivity apps I actually use daily",
    "How I plan a week in 20 minutes",
    "The 2-minute rule that changed my life",
    "Desk setup tour for max focus",
    "What I'd tell my 20-year-old self",
    "How I beat procrastination for good",
    "A day in my life as a creator",
    "3 books that rewired how I think",
    "My note-taking system explained",
    "How I batch a month of content",
    "Mistakes that killed my motivation",
    "Tools that save me 10 hours a week",
    "How I say no without guilt",
    "The habit stack behind my routine",
    "Why I quit multitasking",
    "My phone home screen setup",
    "How I recover from burnout",
    "The 1% better daily framework",
    "What nobody tells you about consistency",
    "My weekly review template",
    "How I read 1 book a week",
    "Energy management > time management",
    "My focus playlist breakdown",
    "How I plan content 30 days ahead",
    "The deep work block explained",
    "Why I journal every morning",
    "How I track habits without apps",
    "My 5pm shutdown ritual",
    "The one metric I actually track",
  ],
  captions: [
    "Stop scrolling. This one's for the version of you that keeps starting over.",
    "You don't need more time. You need fewer tabs open.",
    "The routine isn't the flex. Showing up when it's boring is.",
    "I used to think discipline was loud. Turns out it's quiet and daily.",
    "Save this before your brain talks you out of it.",
    "Your future self is watching. Don't give them more to clean up.",
    "Productivity isn't doing more. It's protecting what matters.",
    "Read this when you feel behind (you're not).",
    "The system beats the streak. Build the system.",
    "Three seconds to hook them. Make them count.",
  ],
  hashtags: [
    "#productivity",
    "#focus",
    "#creatorgrowth",
    "#dailyhabits",
    "#deepwork",
    "#contentstrategy",
    "#lifestyle",
    "#mindset",
    "#routine",
    "#growthtips",
  ],
  strategy: [
    { pillar: "Educate", share: 40, note: "Frameworks & how-tos" },
    { pillar: "Inspire", share: 30, note: "Personal story & wins" },
    { pillar: "Entertain", share: 20, note: "Relatable, fast hooks" },
    { pillar: "Convert", share: 10, note: "Lead magnets & CTAs" },
  ],
  weekPlan: [
    { day: "Mon", task: "Educational carousel — your best format", goal: "Reach" },
    { day: "Tue", task: "Story-driven reel with strong hook", goal: "Watch time" },
    { day: "Wed", task: "Engage 30 min in comments before posting", goal: "Velocity" },
    { day: "Thu", task: "Entertainment reel + trending audio", goal: "Discovery" },
    { day: "Fri", task: "Behind-the-scenes story sequence", goal: "Trust" },
    { day: "Sat", task: "Repurpose top post into carousel", goal: "Conversion" },
    { day: "Sun", task: "Weekly review + plan next 7 days", goal: "Consistency" },
  ],
  forecast: [
    { month: "Now", followers: 48 },
    { month: "M1", followers: 53 },
    { month: "M2", followers: 61 },
    { month: "M3", followers: 72 },
    { month: "M4", followers: 88 },
    { month: "M5", followers: 104 },
    { month: "M6", followers: 126 },
  ],
  competitors: [
    { name: "@focusflow", followers: "112K", why: "Tight content pillars" },
    { name: "@dailydeepwork", followers: "89K", why: "Strong hook formulas" },
    { name: "@theroutineguy", followers: "204K", why: "Best-in-class carousels" },
  ],
};

export const loadingSteps = [
  { message: "Checking bio clarity...", icon: "🎯" },
  { message: "Analyzing posting consistency...", icon: "📅" },
  { message: "Evaluating engagement patterns...", icon: "💬" },
  { message: "Detecting your niche...", icon: "🏷️" },
  { message: "Finding growth opportunities...", icon: "🚀" },
  { message: "Calculating your score...", icon: "📊" },
  { message: "Preparing your report...", icon: "✨" },
];

export const historyItems = [
  { username: "@creatorname", score: 72, date: "Jun 28, 2026", potential: "High" },
  { username: "@focusflow", score: 84, date: "Jun 21, 2026", potential: "Medium" },
  { username: "@minimaldesk", score: 61, date: "Jun 14, 2026", potential: "High" },
  { username: "@thehabitlab", score: 77, date: "Jun 02, 2026", potential: "High" },
];
