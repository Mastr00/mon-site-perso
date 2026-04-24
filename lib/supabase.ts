import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Project } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client "public" (anon) — lecture seule (RLS applique le filtre published=true)
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Client "admin" (service_role) — bypass RLS. À utiliser UNIQUEMENT côté serveur.
export function createAdminClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Shape de la row en DB (colonnes plates snake_case)
export type ProjectRow = {
  id: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  desc_short_fr: string;
  desc_short_en: string;
  idea_fr: string | null;
  idea_en: string | null;
  challenges_fr: string | null;
  challenges_en: string | null;
  solution_fr: string | null;
  solution_en: string | null;
  tags: string[];
  demo: string | null;
  repo: string | null;
  image: string | null;
  hardware: string[];
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

// Convertit une row DB en shape applicative (bilingue imbriqué)
export function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: { fr: row.title_fr, en: row.title_en },
    desc: { fr: row.desc_fr, en: row.desc_en },
    descShort: { fr: row.desc_short_fr, en: row.desc_short_en },
    idea: { fr: row.idea_fr ?? '', en: row.idea_en ?? '' },
    challenges: { fr: row.challenges_fr ?? '', en: row.challenges_en ?? '' },
    solution: { fr: row.solution_fr ?? '', en: row.solution_en ?? '' },
    tags: row.tags,
    demo: row.demo ?? '',
    repo: row.repo ?? '',
    image: row.image ?? '',
    hardware: row.hardware,
  };
}

// Shape du formulaire dashboard (camelCase → on convertit vers snake_case avant INSERT)
export type ProjectInput = Partial<Project> & {
  id: string;
  published?: boolean;
  displayOrder?: number;
};

// Fetch all published projects (ordered). Used by getStaticProps.
export async function fetchPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data as ProjectRow[]).map(rowToProject);
}

// Fetch one published project by id. Returns null if not found.
export async function fetchPublishedProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToProject(data as ProjectRow) : null;
}

export function projectToRow(p: ProjectInput): Partial<ProjectRow> {
  const row: Partial<ProjectRow> = { id: p.id };
  if (p.title) {
    row.title_fr = p.title.fr;
    row.title_en = p.title.en;
  }
  if (p.desc) {
    row.desc_fr = p.desc.fr;
    row.desc_en = p.desc.en;
  }
  if (p.descShort) {
    row.desc_short_fr = p.descShort.fr;
    row.desc_short_en = p.descShort.en;
  }
  if (p.idea) {
    row.idea_fr = p.idea.fr;
    row.idea_en = p.idea.en;
  }
  if (p.challenges) {
    row.challenges_fr = p.challenges.fr;
    row.challenges_en = p.challenges.en;
  }
  if (p.solution) {
    row.solution_fr = p.solution.fr;
    row.solution_en = p.solution.en;
  }
  if (p.tags !== undefined) row.tags = p.tags;
  if (p.demo !== undefined) row.demo = p.demo;
  if (p.repo !== undefined) row.repo = p.repo;
  if (p.image !== undefined) row.image = p.image;
  if (p.hardware !== undefined) row.hardware = p.hardware;
  if (p.published !== undefined) row.published = p.published;
  if (p.displayOrder !== undefined) row.display_order = p.displayOrder;
  return row;
}
