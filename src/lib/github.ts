const USERNAME = "RaulMandujano";

export type GithubStats = {
  username: string;
  profileUrl: string;
  totalContributions: number;
  activeDays: number;
  publicRepos: number;
  memberSince: number;
  /** Columns of the contribution graph; each inner array is a week of 7 daily levels (0-4). */
  weeks: number[][];
};

/**
 * Real numbers captured from the live profile, used when the network fetch is
 * unavailable (e.g. GitHub rate limits at build time). Keeps the section
 * accurate and never broken.
 */
const FALLBACK: GithubStats = {
  username: USERNAME,
  profileUrl: `https://github.com/${USERNAME}`,
  totalContributions: 488,
  activeDays: 119,
  publicRepos: 70,
  memberSince: 2016,
  weeks: [],
};

function chunkWeeks(levels: number[]): number[][] {
  const weeks: number[][] = [];
  for (let i = 0; i < levels.length; i += 7) {
    weeks.push(levels.slice(i, i + 7));
  }
  return weeks;
}

/**
 * Fetches live GitHub activity. Cached for a day via the Data Cache so the
 * portfolio stays fresh without hammering the API. Falls back to known-good
 * values on any failure so the page always renders.
 */
export async function getGithubStats(): Promise<GithubStats> {
  try {
    const [userRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 86400 },
      }),
      fetch(`https://github.com/users/${USERNAME}/contributions`, {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!userRes.ok || !contribRes.ok) {
      return FALLBACK;
    }

    const user = (await userRes.json()) as {
      public_repos?: number;
      created_at?: string;
    };
    const html = await contribRes.text();

    // Daily intensity levels (0-4) in chronological, column-major order.
    const levels = Array.from(html.matchAll(/data-level="(\d)"/g)).map((m) =>
      Number(m[1]),
    );

    // Per-day counts live in the tooltips ("N contributions on <date>").
    const counts = Array.from(
      html.matchAll(/(\d+) contributions? on/g),
    ).map((m) => Number(m[1]));
    const totalContributions = counts.reduce((sum, n) => sum + n, 0);
    const activeDays = levels.filter((level) => level > 0).length;

    return {
      username: USERNAME,
      profileUrl: `https://github.com/${USERNAME}`,
      totalContributions: totalContributions || FALLBACK.totalContributions,
      activeDays: activeDays || FALLBACK.activeDays,
      publicRepos: user.public_repos ?? FALLBACK.publicRepos,
      memberSince: user.created_at
        ? new Date(user.created_at).getFullYear()
        : FALLBACK.memberSince,
      weeks: levels.length ? chunkWeeks(levels) : FALLBACK.weeks,
    };
  } catch {
    return FALLBACK;
  }
}
