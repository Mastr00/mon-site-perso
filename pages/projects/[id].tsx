import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Cpu,
  Target,
  Wrench,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { fetchPublishedProjects, fetchPublishedProjectById } from '../../lib/supabase';
import type { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export async function getStaticPaths() {
  try {
    const projects = await fetchPublishedProjects();
    const paths = projects.map((p) => ({ params: { id: p.id } }));
    return { paths, fallback: 'blocking' as const };
  } catch (e) {
    const msg = e instanceof Error ? e.message : JSON.stringify(e);
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.error(
      `[projects/[id]] getStaticPaths FAILED | hasUrl=${hasUrl} hasKey=${hasKey} | err=${msg}`
    );
    return { paths: [], fallback: 'blocking' as const };
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const project = await fetchPublishedProjectById(params.id);
    if (!project) return { notFound: true, revalidate: 60 };
    return {
      props: { project },
      revalidate: 60,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : JSON.stringify(e);
    console.error(`[projects/[id]] getStaticProps FAILED id=${params.id} | err=${msg}`);
    return { notFound: true, revalidate: 10 };
  }
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { t, locale } = useLanguage();

  if (!project) return <div>{t.portfolio.notFound}</div>;

  const titleStr = typeof project.title === 'string' ? project.title : project.title[locale];
  const descStr =
    typeof project.descShort === 'string' ? project.descShort : project.descShort[locale];

  return (
    <>
      <Head>
        <title>{titleStr} – Portfolio</title>
        <meta name="description" content={descStr} />
      </Head>

      <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 text-cyber-700 dark:text-cyber-100 py-16 px-4 md:px-8 relative overflow-hidden bg-grid">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyber-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          {/* Header / Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-cyber-accent hover:text-cyber-950 dark:text-cyber-100 transition-colors duration-300 group font-medium bg-cyber-50 dark:bg-cyber-900/50 px-4 py-2 rounded-sm border border-cyber-accent/20 hover:border-cyber-accent/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {t.portfolio.back}
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-full h-[300px] md:h-[450px] rounded-sm overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.1)] border border-cyber-200 dark:border-cyber-800 mb-10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10 opacity-80" />
            <Image
              src={project.image}
              alt={titleStr}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
              {/* Remove emoji from title cleanly for the main H1 */}
              <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4 drop-shadow-lg">
                {titleStr.replace(
                  /^[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}✨🤖🌦️🚨📡]\s*/u,
                  ''
                )}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyber-200/50 dark:bg-cyber-800/80 backdrop-blur-md border border-white/20 rounded-[3px] text-sm font-semibold text-white shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-cyber-cta hover:bg-cyber-accent text-white font-bold rounded-sm shadow-[0_4px_15px_rgba(56,189,248,0.15)] transition-all hover:-translate-y-0.5"
              >
                <ExternalLink size={20} /> {t.portfolio.demo}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 text-cyber-950 dark:text-cyber-100 font-bold rounded-sm hover:border-cyber-accent/50 hover:bg-cyber-200 dark:hover:bg-cyber-800 transition-all hover:-translate-y-0.5"
              >
                <Github size={20} /> {t.portfolio.sourceCode}
              </a>
            )}
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* L'idée / Présentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-cyber-50 dark:bg-cyber-900/80 backdrop-blur-sm border border-cyber-200 dark:border-cyber-800 rounded-sm p-8 hover:border-cyber-accent/30 transition-colors"
            >
              <h2 className="text-2xl font-mono font-bold text-cyber-950 dark:text-cyber-100 mb-4 flex items-center gap-3">
                <Lightbulb className="text-cyber-accent" size={28} /> {t.portfolio.idea}
              </h2>
              <p className="text-cyber-700 dark:text-cyber-100 leading-relaxed text-lg">
                {typeof project.idea === 'string' ? project.idea : project.idea[locale]}
              </p>
            </motion.div>

            {/* Les Défis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-cyber-50 dark:bg-cyber-900/80 backdrop-blur-sm border border-red-500/20 rounded-sm p-8 hover:border-red-500/50 transition-colors relative h-full"
            >
              <h2 className="text-2xl font-mono font-bold text-cyber-950 dark:text-cyber-100 mb-4 flex items-center gap-3 relative z-10">
                <Target className="text-red-500" size={28} /> {t.portfolio.challenges}
              </h2>
              <p className="text-cyber-700 dark:text-cyber-100 leading-relaxed relative z-10">
                {typeof project.challenges === 'string'
                  ? project.challenges
                  : project.challenges[locale]}
              </p>
            </motion.div>

            {/* La Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-cyber-50 dark:bg-cyber-900/80 backdrop-blur-sm border border-green-500/20 rounded-sm p-8 hover:border-green-500/50 transition-colors relative h-full"
            >
              <h2 className="text-2xl font-mono font-bold text-cyber-950 dark:text-cyber-100 mb-4 flex items-center gap-3 relative z-10">
                <CheckCircle2 className="text-green-500" size={28} /> {t.portfolio.solution}
              </h2>
              <p className="text-cyber-700 dark:text-cyber-100 leading-relaxed relative z-10">
                {typeof project.solution === 'string' ? project.solution : project.solution[locale]}
              </p>
            </motion.div>
          </div>

          {/* Matériel */}
          {project.hardware && project.hardware.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-cyber-50 dark:bg-cyber-900/80 backdrop-blur-sm border border-cyber-accent/20 rounded-sm p-8 mb-16 relative"
            >
              <h2 className="text-2xl font-mono font-bold text-cyber-950 dark:text-cyber-100 mb-6 flex items-center gap-3 relative z-10">
                <Cpu className="text-cyber-accent" size={28} /> {t.portfolio.hardware}
              </h2>
              <div className="flex flex-wrap gap-3 relative z-10">
                {project.hardware.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 px-3 py-2 rounded-[3px] text-cyber-700 dark:text-cyber-100 text-sm font-semibold hover:border-cyber-accent/50 transition-colors"
                  >
                    <Wrench size={14} className="text-cyber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
