import Head from 'next/head';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  CheckCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Pencil,
  Plus,
  Rocket,
  BarChart3,
} from 'lucide-react';
import GithubWidget from '../components/dashboard/GithubWidget';
import ProjectEditor from '../components/dashboard/ProjectEditor';
import { createAdminClient, rowToProject, type ProjectRow } from '../lib/supabase';
import type { Project } from '../types';

type AdminProject = Project & { published: boolean; displayOrder: number };

type Props = {
  initialProjects: AdminProject[];
};

export default function DashboardPage({ initialProjects }: Props) {
  const { user } = useUser();
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [mode, setMode] = useState<'idle' | 'create' | 'edit'>('idle');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [projects, selectedId]
  );

  async function refresh() {
    const res = await fetch('/api/projects');
    if (!res.ok) return;
    const j = (await res.json()) as { projects: Project[] };
    // We only get flat Project objects back from the public endpoint (no published/displayOrder).
    // Merge by id, keep existing admin-only fields where possible.
    setProjects((prev) =>
      j.projects.map((p) => {
        const existing = prev.find((x) => x.id === p.id);
        return {
          ...p,
          published: existing?.published ?? true,
          displayOrder: existing?.displayOrder ?? 0,
        };
      })
    );
  }

  function openCreate() {
    setSelectedId(null);
    setMode('create');
  }

  function openEdit(id: string) {
    setSelectedId(id);
    setMode('edit');
  }

  function closeEditor() {
    setMode('idle');
    setSelectedId(null);
  }

  async function onSaved() {
    await refresh();
    closeEditor();
  }

  async function onDeleted() {
    await refresh();
    closeEditor();
  }

  return (
    <>
      <Head>
        <title>Dashboard – Mehdi</title>
        <meta name="description" content="Admin dashboard" />
      </Head>

      <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between mb-8 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 p-6 rounded-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold font-mono text-cyber-950 dark:text-cyber-100">
                <span className="text-cyber-accent">&gt;</span> Dashboard admin
              </h1>
              <p className="text-cyber-500 dark:text-cyber-400 mt-1 text-sm">
                Connecté en tant que <span className="font-mono">{user?.email ?? '…'}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {user?.picture && user.picture.startsWith('http') && (
                // Plain <img> on purpose: next/image optimizer can hang on arbitrary
                // identity-provider avatar hosts that aren't in remotePatterns.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt="Profile"
                  width={48}
                  height={48}
                  referrerPolicy="no-referrer"
                  className="rounded-full border-2 border-cyber-accent/30 w-12 h-12 object-cover"
                />
              )}
              <a
                href="/api/auth/logout"
                className="px-4 py-2 text-sm border border-cyber-200 dark:border-cyber-700 rounded-sm hover:border-cyber-accent text-cyber-700 dark:text-cyber-100"
              >
                Se déconnecter
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main: Projects CRUD */}
            <section className="lg:col-span-2 space-y-6">
              <div className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 rounded-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold font-mono text-cyber-950 dark:text-cyber-100">
                    Projets ({projects.length})
                  </h2>
                  <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-cyber-cta hover:bg-cyber-accent text-white font-bold rounded-sm text-sm"
                  >
                    <Plus size={16} /> Nouveau
                  </button>
                </div>

                <ul className="divide-y divide-cyber-200 dark:divide-cyber-800">
                  {projects.map((p) => (
                    <li key={p.id} className="py-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-cyber-500">
                            #{p.displayOrder}
                          </span>
                          <span className="font-semibold text-cyber-950 dark:text-cyber-100 truncate">
                            {p.title.fr}
                          </span>
                          {p.published ? (
                            <span className="text-xs text-green-500 inline-flex items-center gap-1">
                              <Eye size={12} /> publié
                            </span>
                          ) : (
                            <span className="text-xs text-cyber-400 inline-flex items-center gap-1">
                              <EyeOff size={12} /> brouillon
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-cyber-500 font-mono truncate">{p.id}</div>
                      </div>
                      <a
                        href={`/projects/${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-cyber-500 hover:text-cyber-accent"
                        title="Voir le projet"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => openEdit(p.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-cyber-200 dark:border-cyber-700 rounded-sm hover:border-cyber-accent text-cyber-700 dark:text-cyber-100"
                      >
                        <Pencil size={14} /> Éditer
                      </button>
                    </li>
                  ))}
                  {projects.length === 0 && (
                    <li className="py-6 text-center text-cyber-500">
                      Aucun projet. Cliquez sur « Nouveau » pour en créer un.
                    </li>
                  )}
                </ul>
              </div>

              {mode !== 'idle' && (
                <ProjectEditor
                  mode={mode}
                  project={selected}
                  onSaved={onSaved}
                  onDeleted={onDeleted}
                  onCancel={closeEditor}
                />
              )}
            </section>

            {/* Sidebar: GitHub + shortcuts */}
            <aside className="space-y-6">
              <GithubWidget />

              <div className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 rounded-sm p-6 space-y-3">
                <h3 className="text-sm font-bold font-mono text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
                  <Rocket size={16} className="text-cyber-accent" /> Deploy
                </h3>
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm text-cyber-700 dark:text-cyber-100 hover:text-cyber-accent"
                >
                  Vercel dashboard <ExternalLink size={14} />
                </a>
                <a
                  href="https://supabase.com/dashboard/project/jkascxrnpgaqsxcskzzi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm text-cyber-700 dark:text-cyber-100 hover:text-cyber-accent"
                >
                  Supabase project <ExternalLink size={14} />
                </a>
                <p className="text-xs text-cyber-500 pt-2 border-t border-cyber-200 dark:border-cyber-800">
                  Après un changement, le cache ISR se rafraîchit en 60 s sur{' '}
                  <span className="font-mono">/portfolio</span>.
                </p>
              </div>

              <div className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 rounded-sm p-6 space-y-2">
                <h3 className="text-sm font-bold font-mono text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
                  <BarChart3 size={16} className="text-cyber-accent" /> Analytics
                </h3>
                <a
                  href="https://vercel.com/mehdis-projects-9abe5099/mon-site-perso/analytics"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm text-cyber-700 dark:text-cyber-100 hover:text-cyber-accent"
                >
                  Vercel Analytics <ExternalLink size={14} />
                </a>
                <a
                  href="https://vercel.com/mehdis-projects-9abe5099/mon-site-perso/speed-insights"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm text-cyber-700 dark:text-cyber-100 hover:text-cyber-accent"
                >
                  Speed Insights <ExternalLink size={14} />
                </a>
              </div>

              <div className="bg-cyber-accent/5 border border-cyber-accent/30 rounded-sm p-4 text-xs text-cyber-600 dark:text-cyber-300 flex items-start gap-2">
                <CheckCircle size={14} className="text-cyber-accent mt-0.5 shrink-0" />
                Les écritures sont protégées par ton email admin côté API. Seul{' '}
                <span className="font-mono">
                  {process.env.NEXT_PUBLIC_ADMIN_HINT ?? 'toi'}
                </span>{' '}
                peut modifier.
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!session?.user || !adminEmail || session.user.email !== adminEmail) {
      return {
        redirect: { destination: '/', permanent: false },
      };
    }
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) {
      return { props: { initialProjects: [] } };
    }
    const initialProjects: AdminProject[] = (data as ProjectRow[]).map((row) => ({
      ...rowToProject(row),
      published: row.published,
      displayOrder: row.display_order,
    }));
    return { props: { initialProjects } };
  },
});
