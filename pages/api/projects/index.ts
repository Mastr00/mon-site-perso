import type { NextApiRequest, NextApiResponse } from 'next';
import {
  supabase,
  createAdminClient,
  rowToProject,
  projectToRow,
  type ProjectRow,
  type ProjectInput,
} from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/apiAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Public read — RLS already restricts to published=true for anon, but be explicit.
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ projects: (data as ProjectRow[]).map(rowToProject) });
  }

  if (req.method === 'POST') {
    if (!(await requireAdmin(req, res))) return;
    const body = req.body as ProjectInput;
    if (!body?.id) return res.status(400).json({ error: 'id is required' });

    const row = projectToRow(body);
    const admin = createAdminClient();
    const { data, error } = await admin.from('projects').insert(row).select('*').single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ project: rowToProject(data as ProjectRow) });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method Not Allowed' });
}
