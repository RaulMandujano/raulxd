import { getGithubStats } from "@/lib/github";

import { GithubActivityView } from "./GithubActivityView";

export async function GithubActivity() {
  const stats = await getGithubStats();

  return <GithubActivityView stats={stats} />;
}
