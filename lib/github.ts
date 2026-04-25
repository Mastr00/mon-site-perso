// In-process cache for GitHub user info — avoids hitting the unauthenticated
// rate limit (60 req/h per IP) on every dashboard render.
//
// On Vercel each lambda has its own memory, so a few cold starts will each
// fetch once. That's still fine: a small handful of reqs/hour vs one per
// dashboard render.

export type GithubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
};

const TTL_MS = 5 * 60 * 1000; // 5 minutes
let cache: { data: GithubUser; expiresAt: number } | null = null;

export async function fetchGithubUser(username: string): Promise<GithubUser | null> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.data;

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { Accept: 'application/vnd.github+json' },
      // Optional: pass GITHUB_TOKEN if set, to lift rate limit to 5000/h.
      ...(process.env.GITHUB_TOKEN
        ? { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        : {}),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GithubUser;
    cache = { data: json, expiresAt: now + TTL_MS };
    return json;
  } catch {
    return null;
  }
}
