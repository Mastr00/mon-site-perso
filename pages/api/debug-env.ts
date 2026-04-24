import type { NextApiRequest, NextApiResponse } from 'next';

// Temporary diagnostic endpoint — DELETE AFTER DEBUG
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) || 'MISSING',
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    anonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) || 'MISSING',
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasAuth0Secret: !!process.env.AUTH0_SECRET,
    hasAuth0Issuer: !!process.env.AUTH0_ISSUER_BASE_URL,
    auth0IssuerPrefix: process.env.AUTH0_ISSUER_BASE_URL?.slice(0, 30) || 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
}
