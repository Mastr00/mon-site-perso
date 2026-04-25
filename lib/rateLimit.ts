import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory token bucket. Per-instance only — fine for a single-admin
// dashboard on Vercel where requests serve from the same warm lambda most of
// the time. For multi-instance / globally distributed rate limiting, swap
// this for Upstash Ratelimit or Vercel KV.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  /** Max requests per window. */
  max: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Optional explicit key (defaults to client IP + route path). */
  key?: string;
};

function getClientKey(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const ip = Array.isArray(fwd) ? fwd[0] : (fwd?.split(',')[0]?.trim() ?? req.socket.remoteAddress);
  return `${ip ?? 'unknown'}:${req.url ?? ''}`;
}

/**
 * Consume one token. Returns true if the request is allowed, false if it
 * exceeded the limit. When false, the response is already terminated with 429.
 */
export function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  opts: RateLimitOptions
): boolean {
  const key = opts.key ?? getClientKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    setHeaders(res, opts.max, opts.max - 1, opts.windowMs);
    return true;
  }

  if (bucket.count >= opts.max) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    res.setHeader('Retry-After', retryAfter.toString());
    setHeaders(res, opts.max, 0, bucket.resetAt - now);
    res.status(429).json({ error: 'Too many requests', retryAfter });
    return false;
  }

  bucket.count += 1;
  setHeaders(res, opts.max, opts.max - bucket.count, bucket.resetAt - now);
  return true;
}

function setHeaders(res: NextApiResponse, limit: number, remaining: number, resetMs: number) {
  res.setHeader('X-RateLimit-Limit', limit.toString());
  res.setHeader('X-RateLimit-Remaining', Math.max(0, remaining).toString());
  res.setHeader('X-RateLimit-Reset', Math.ceil(resetMs / 1000).toString());
}
