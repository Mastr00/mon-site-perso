import type { NextApiRequest, NextApiResponse } from 'next';
import { createAdminClient } from '../../lib/supabase';
import { requireAdmin } from '../../lib/apiAuth';
import { rateLimit } from '../../lib/rateLimit';

export const config = {
  api: {
    bodyParser: { sizeLimit: '8mb' },
  },
};

const BUCKET = 'project-images';
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

type Body = {
  fileName: string;
  contentType: string;
  dataBase64: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  // 20 uploads per 5 minutes — generous for legitimate admin use, blocks abuse
  // if a session cookie ever leaks.
  if (!rateLimit(req, res, { max: 20, windowMs: 5 * 60 * 1000 })) return;
  if (!(await requireAdmin(req, res))) return;

  const { fileName, contentType, dataBase64 } = (req.body ?? {}) as Body;
  if (!fileName || !contentType || !dataBase64) {
    return res.status(400).json({ error: 'fileName, contentType, dataBase64 required' });
  }
  if (!ALLOWED.includes(contentType)) {
    return res.status(400).json({ error: 'Unsupported image type' });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${Date.now()}-${safeName}`;
  const buffer = Buffer.from(dataBase64, 'base64');

  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: false });
  if (uploadError) return res.status(400).json({ error: uploadError.message });

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return res.status(201).json({ path, publicUrl: data.publicUrl });
}
