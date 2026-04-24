import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

// Returns true if the request comes from the admin user.
// Writes a 401/403 on the response if not and returns false.
export async function requireAdmin(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const session = await getSession(req, res);
  if (!session?.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || session.user.email !== adminEmail) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }
  return true;
}
