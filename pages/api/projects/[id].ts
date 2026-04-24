import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getSupabase,
  createAdminClient,
  rowToProject,
  projectToRow,
  type ProjectRow,
  type ProjectInput,
} from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/apiAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  if (req.method === 'GET') {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ project: rowToProject(data as ProjectRow) });
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!(await requireAdmin(req, res))) return;
    const body = req.body as ProjectInput;
    const row = projectToRow({ ...body, id });
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('projects')
      .update(row)
      .eq('id', id)
      .select('*')
      .single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ project: rowToProject(data as ProjectRow) });
  }

  if (req.method === 'DELETE') {
    if (!(await requireAdmin(req, res))) return;
    const admin = createAdminClient();
    const { error } = await admin.from('projects').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET, PATCH, PUT, DELETE');
  return res.status(405).json({ error: 'Method Not Allowed' });
}
