import SEO from '../components/SEO';
import Image from 'next/image';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fetchPublishedProjects } from '../lib/supabase';
import type { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Github, Cpu, Globe, Shield, Radio, Code2, Cog, Eye } from 'lucide-react';

export async function getStaticProps() {
  const projects = await fetchPublishedProjects();
  return {
    props: { projects },
    revalidate: 60,
  };
}

// Map tags to icons
const tagIcons = {
  ESP32: Cpu,
  'ESP32-CAM': Cpu,
  'ESP32-S3': Cpu,
  IoT: Radio,
  Python: Code2,
  OpenCV: Eye,
  'C++': Code2,
  Robotique: Cog,
  GPS: Radio,
  OLED: Cpu,
  Embedded: Cpu,
  Safety: Shield,
  Accel: Cog,
  Lidar: Radio,
  '3D Mapping': Globe,
  'Web Interface': Globe,
  'Next.js': Globe,
  React: Code2,
  Design: Eye,
  TailwindCSS: Code2,
};

function getTagIcon(tag: string) {
  return tagIcons[tag as keyof typeof tagIcons] || Code2;
}

// Scroll-triggered card wrapper
function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

type ProjectCardProps = {
  p: Project;
  index: number;
  t: ReturnType<typeof useLanguage>['t'];
  locale: ReturnType<typeof useLanguage>['locale'];
};

function ProjectCard({ p, index, t, locale }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <AnimatedCard index={index}>
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1000}
        transitionSpeed={1000}
        className="h-full block"
      >
        <article className="group flex flex-col bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 rounded-sm overflow-hidden project-card h-full relative cursor-pointer">
          {/* Image Section */}
          <div className="relative h-60 w-full overflow-hidden bg-cyber-100 dark:bg-cyber-800 rounded-t-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/40 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

            {!imgError ? (
              <Image
                src={p.image}
                alt={typeof p.title === 'string' ? p.title : p.title[locale]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-gradient-to-br from-[#334155] to-[#1E293B] z-0">
                <span className="text-4xl">🖼️</span>
                <span className="text-cyber-400 text-sm font-medium">Image non disponible</span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-cyber-500/60 via-cyber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
              <span className="text-cyber-950 dark:text-cyber-100 font-bold text-sm px-4 py-2 bg-cyber-50/10 backdrop-blur-md rounded-sm border border-white/20 flex items-center gap-2">
                <Eye size={16} /> {t.portfolio.viewProject}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow relative">
            <h2 className="text-xl font-bold text-cyber-950 dark:text-cyber-100 mb-2 group-hover:text-cyber-accent transition-colors">
              {(typeof p.title === 'string' ? p.title : p.title[locale]).replace(
                /^[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}✨🤖🌦️🚨📡]\s*/u,
                ''
              )}
            </h2>

            <p className="text-cyber-500 dark:text-cyber-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
              {typeof p.desc === 'string' ? p.desc : p.desc[locale]}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {p.tags.map((tag, i) => {
                const Icon = getTagIcon(tag);
                const colorClasses = [
                  'bg-cyber-200 dark:bg-cyber-800 text-cyber-500 border-transparent',
                  'bg-cyber-accent/15 text-cyber-accent border-transparent',
                  'bg-cyber-200 dark:bg-cyber-800 text-cyber-500 border-transparent',
                ];
                return (
                  <span
                    key={tag}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-[3px] border ${colorClasses[i % 3]}`}
                  >
                    <Icon size={12} />
                    {tag}
                  </span>
                );
              })}
            </div>

            <div className="flex gap-3 items-center pt-4 border-t border-cyber-200 dark:border-cyber-800">
              <Link
                href={`/projects/${p.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyber-cta text-white rounded-sm font-medium hover:bg-cyber-accent transition-colors text-sm"
              >
                <ExternalLink size={16} />
                {t.portfolio.viewProject}
              </Link>

              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-cyber-500 hover:text-cyber-accent hover:bg-cyber-200 dark:hover:bg-cyber-800 rounded-sm transition-colors border border-transparent hover:border-cyber-accent/20"
                  aria-label="Code Source"
                  title={t.portfolio.sourceCode}
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
        </article>
      </Tilt>
    </AnimatedCard>
  );
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web', 'IoT', 'Embedded'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    return p.tags.some(
      (tag) =>
        tag.toLowerCase().includes(filter.toLowerCase()) ||
        (filter === 'Web' && (tag.includes('React') || tag.includes('Next.js'))) ||
        (filter === 'Embedded' && (tag.includes('C++') || tag.includes('Lidar')))
    );
  });

  return (
    <>
      <SEO title="Portfolio – Mehdi" description={t.portfolio.subtitle} />

      <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 py-16 px-6 relative overflow-hidden bg-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-cyber-accent font-mono mb-6 tracking-tight">
              {t.portfolio.title}
            </h1>
            <p className="text-lg md:text-xl text-cyber-500 dark:text-cyber-400 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.portfolio.subtitle}
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-[16px] py-[6px] text-sm font-bold transition-all duration-150 border rounded-[3px] ${
                    filter === cat
                      ? 'bg-cyber-accent text-white border-transparent'
                      : 'bg-transparent text-cyber-500 dark:text-cyber-400 border-transparent hover:bg-cyber-200 dark:hover:bg-cyber-800'
                  }`}
                >
                  {cat === 'All' ? t.portfolio.filterAll : cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, index) => (
                <ProjectCard key={p.id} p={p} index={index} t={t} locale={locale} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
