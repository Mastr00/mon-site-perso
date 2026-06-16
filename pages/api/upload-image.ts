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
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

type Body = {
  fileName: string;
  contentType: string;
  dataBase64: string;
};

function isValidBase64(value: string): boolean {
  return (
    value.length % 4 === 0 &&
    /^([A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)
  );
}

function hasExpectedSignature(buffer: Buffer, contentType: string): boolean {
  if (contentType === 'image/png') {
    return buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (contentType === 'image/jpeg') {
    return (
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[buffer.length - 2] === 0xff &&
      buffer[buffer.length - 1] === 0xd9
    );
  }
  if (contentType === 'image/webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    );
  }
  if (contentType === 'image/gif') {
    const signature = buffer.subarray(0, 6).toString('ascii');
    return signature === 'GIF87a' || signature === 'GIF89a';
  }
  return false;
}

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

  const normalizedBase64 = dataBase64.replace(/\s/g, '');
  if (!isValidBase64(normalizedBase64)) {
    return res.status(400).json({ error: 'Invalid image payload' });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${Date.now()}-${safeName}`;
  const buffer = Buffer.from(normalizedBase64, 'base64');
  if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
    return res.status(400).json({ error: 'Image too large (max 5 MB)' });
  }
  if (!hasExpectedSignature(buffer, contentType)) {
    return res.status(400).json({ error: 'Image content does not match contentType' });
  }

  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: false });
  if (uploadError) return res.status(400).json({ error: uploadError.message });

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return res.status(201).json({ path, publicUrl: data.publicUrl });
}
