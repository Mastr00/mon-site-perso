import Head from "next/head";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects as staticProjects } from '../lib/projectsData';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Github, Cpu, Globe, Shield, Radio, Code2, Cog, Eye } from 'lucide-react';

// Map tags to icons
const tagIcons = {
  'ESP32': Cpu, 'ESP32-CAM': Cpu, 'ESP32-S3': Cpu,
  'IoT': Radio, 'Python': Code2, 'OpenCV': Eye,
  'C++': Code2, 'Robotique': Cog, 'GPS': Radio,
  'OLED': Cpu, 'Embedded': Cpu, 'Safety': Shield,
  'Accel': Cog, 'Lidar': Radio, '3D Mapping': Globe,
  'Web Interface': Globe, 'Next.js': Globe, 'React': Code2,
  'Design': Eye, 'TailwindCSS': Code2,
};

function getTagIcon(tag) {
  return tagIcons[tag] || Code2;
}

// Scroll-triggered card wrapper
function AnimatedCard({ children, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web", "IoT", "Embedded"];

  const filteredProjects = staticProjects.filter(p => {
    if (filter === "All") return true;
    return p.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()) ||
      (filter === "Web" && (tag.includes("React") || tag.includes("Next.js"))) ||
      (filter === "Embedded" && (tag.includes("C++") || tag.includes("Lidar")))
    );
  });

  return (
    <>
      <Head>
        <title>Portfolio – Mehdi</title>
        <meta property="og:title" content="Portfolio – Mehdi" />
        <meta property="og:description" content="Découvrez mes projets en électronique, IoT et développement web." />
      </Head>

      <div className="min-h-screen bg-[#020617] py-16 px-6 relative overflow-hidden bg-grid">
        {/* Neon glow blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-violet/15 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold neon-text mb-6 tracking-tight">
              {t.portfolio.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.portfolio.subtitle}
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md ${filter === cat
                    ? "bg-gradient-to-r from-neon-violet to-neon-magenta text-white border-transparent shadow-neon scale-105"
                    : "bg-[#0F172A]/50 text-slate-400 border-neon-violet/20 hover:border-neon-violet/50 hover:text-neon-violet"
                    }`}
                >
                  {cat === "All" ? t.portfolio.filterAll : cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 2-column layout for visual impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, index) => (
                <AnimatedCard key={p.id} index={index}>
                  <article className="group flex flex-col bg-[#0F172A] border border-neon-violet/15 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.4),0_0_80px_rgba(217,70,239,0.15)] hover:border-neon-violet/50 h-full relative">

                    {/* Image Section */}
                    <div className="relative h-60 w-full overflow-hidden bg-[#1E293B]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback */}
                      <div className="hidden absolute inset-0 items-center justify-center flex-col gap-2 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
                        <span className="text-4xl">🖼️</span>
                        <span className="text-slate-500 text-sm font-medium">Image non disponible</span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 z-20 bg-gradient-to-t from-neon-violet/60 via-neon-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                        <span className="text-white font-bold text-sm px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                          <Eye size={16} /> {t.portfolio.viewProject}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative">
                      {/* Title without emoji */}
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                        {p.title.replace(/^[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}✨🤖🌦️🚨📡]\s*/u, '')}
                      </h2>

                      <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Technologies with icons */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {p.tags.map((tag, i) => {
                          const Icon = getTagIcon(tag);
                          const colorClasses = [
                            'bg-neon-violet/15 text-neon-violet border-neon-violet/25',
                            'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/25',
                            'bg-neon-magenta/15 text-neon-magenta border-neon-magenta/25',
                          ];
                          return (
                            <span key={tag} className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${colorClasses[i % 3]}`}>
                              <Icon size={12} />
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 items-center pt-4 border-t border-neon-violet/10">
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-neon-violet to-neon-magenta text-white rounded-xl font-medium shadow-neon hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-[1.02] transition-all active:scale-95 text-sm"
                        >
                          <ExternalLink size={16} />
                          {t.portfolio.viewProject}
                        </a>

                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 text-slate-500 hover:text-neon-cyan hover:bg-neon-cyan/10 rounded-xl transition-all border border-transparent hover:border-neon-cyan/20"
                            aria-label="Code Source"
                            title={t.portfolio.sourceCode}
                          >
                            <Github size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </AnimatedCard>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
