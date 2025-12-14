
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default withApiAuthRequired(async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { title, description, tags, demo_url, repo_url, image_url } = req.body;

      const { data, error } = await supabaseAdmin
        .from('projects')
        .insert([
          { title, description, tags, demo_url, repo_url, image_url }
        ])
        .select();

      if (error) throw error;

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error creating project:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (method === 'DELETE') {
    try {
      const { id } = req.body;
      const { error } = await supabaseAdmin
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
});
