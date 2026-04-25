import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rateLimit } from './rateLimit';
import type { NextApiRequest, NextApiResponse } from 'next';

function makeReqRes(key = 'test-key') {
  const req = {
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
    url: '/api/test',
  } as unknown as NextApiRequest;

  const headers: Record<string, string> = {};
  let statusCode = 200;
  let body: unknown = null;

  const res = {
    setHeader: (k: string, v: string) => {
      headers[k.toLowerCase()] = v;
    },
    status: (s: number) => {
      statusCode = s;
      return res;
    },
    json: (b: unknown) => {
      body = b;
      return res;
    },
  } as unknown as NextApiResponse;

  return { req, res, getStatus: () => statusCode, getBody: () => body, headers, key };
}

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit and decrements remaining', () => {
    const max = 3;
    const ctx = makeReqRes();
    for (let i = 0; i < max; i++) {
      const ok = rateLimit(ctx.req, ctx.res, { max, windowMs: 60_000, key: 'k1' });
      expect(ok).toBe(true);
    }
    expect(ctx.headers['x-ratelimit-limit']).toBe('3');
    expect(ctx.headers['x-ratelimit-remaining']).toBe('0');
  });

  it('blocks the request that exceeds the limit with 429', () => {
    const ctx = makeReqRes();
    rateLimit(ctx.req, ctx.res, { max: 2, windowMs: 60_000, key: 'k2' });
    rateLimit(ctx.req, ctx.res, { max: 2, windowMs: 60_000, key: 'k2' });
    const ok = rateLimit(ctx.req, ctx.res, { max: 2, windowMs: 60_000, key: 'k2' });
    expect(ok).toBe(false);
    expect(ctx.getStatus()).toBe(429);
    expect(ctx.headers['retry-after']).toBeDefined();
  });

  it('refills the bucket after the window elapses', () => {
    vi.useFakeTimers();
    const ctx = makeReqRes();
    expect(rateLimit(ctx.req, ctx.res, { max: 1, windowMs: 1000, key: 'k3' })).toBe(true);
    expect(rateLimit(ctx.req, ctx.res, { max: 1, windowMs: 1000, key: 'k3' })).toBe(false);
    vi.advanceTimersByTime(1500);
    expect(rateLimit(ctx.req, ctx.res, { max: 1, windowMs: 1000, key: 'k3' })).toBe(true);
  });

  it('keys separate clients independently', () => {
    const a = makeReqRes();
    const b = makeReqRes();
    expect(rateLimit(a.req, a.res, { max: 1, windowMs: 60_000, key: 'A' })).toBe(true);
    expect(rateLimit(a.req, a.res, { max: 1, windowMs: 60_000, key: 'A' })).toBe(false);
    // Same params but a different key — must NOT be affected by client A.
    expect(rateLimit(b.req, b.res, { max: 1, windowMs: 60_000, key: 'B' })).toBe(true);
  });
});
