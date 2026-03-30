import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, Cpu, Target, Wrench, Lightbulb, CheckCircle2 } from 'lucide-react';
import { projects } from '../../lib/projectsData';

export async function getStaticPaths() {
  const paths = projects.map((p) => ({
    params: { id: p.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.id === params.id);
  return {
    props: { project },
  };
}

export default function ProjectDetail({ project }) {
  if (!project) return <div>Projet non trouvé</div>;

  return (
    <>
      <Head>
        <title>{project.title} – Portfolio</title>
        <meta name="description" content={project.descShort} />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] dark:bg-slate-50 dark:bg-[#020617] text-slate-700 dark:text-slate-300 py-16 px-4 md:px-8 relative overflow-hidden bg-grid">
         {/* Background Elements */}
         <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-violet/15 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl"></div>
         </div>

         <div className="max-w-4xl mx-auto relative z-10 pt-10">
            {/* Header / Back */}
            <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="mb-8">
               <Link href="/portfolio" className="inline-flex items-center gap-2 text-neon-cyan hover:text-slate-900 dark:text-white transition-colors duration-300 group font-medium bg-white dark:bg-[#0F172A]/50 px-4 py-2 rounded-full border border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-neon backdrop-blur-md">
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                   Retour au Portfolio
               </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
               initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}
               className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.2)] border border-neon-violet/20 mb-10 group"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-80" />
               <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
               
               <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
                   {/* Remove emoji from title cleanly for the main H1 */}
                   <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 drop-shadow-lg">
                     {project.title.replace(/^[\u0000-\u1FFFF]\s*/u, '')}
                   </h1>
                   <div className="flex flex-wrap gap-2">
                       {project.tags.map((tag) => (
                           <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-slate-900 dark:text-white shadow-sm">
                               {tag}
                           </span>
                       ))}
                   </div>
               </div>
            </motion.div>

            {/* Links Bar */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="flex flex-wrap gap-4 mb-12">
               {project.demo && project.demo !== "#" && (
                   <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-violet to-neon-magenta text-slate-900 dark:text-white font-bold rounded-xl shadow-neon hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-1">
                       <ExternalLink size={20} /> Présentation / Démo
                   </a>
               )}
               {project.repo && (
                   <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0F172A] border border-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all hover:-translate-y-1">
                       <Github size={20} /> Code Source
                   </a>
               )}
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* L'idée / Présentation */}
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="md:col-span-2 bg-white dark:bg-[#0F172A]/80 backdrop-blur-sm border border-neon-violet/10 rounded-3xl p-8 hover:border-neon-violet/30 transition-colors">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                        <Lightbulb className="text-neon-cyan" size={28} /> L'Idée générale
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{project.idea}</p>
                </motion.div>

                {/* Les Défis */}
                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.4}} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-sm border border-red-500/10 rounded-3xl p-8 hover:border-red-500/30 transition-colors relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                        <Target className="text-red-400" size={28} /> Les défis
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed relative z-10">{project.challenges}</p>
                </motion.div>

                {/* La Solution */}
                <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:0.5}} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-sm border border-green-500/10 rounded-3xl p-8 hover:border-green-500/30 transition-colors relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                        <CheckCircle2 className="text-green-400" size={28} /> Notre solution
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed relative z-10">{project.solution}</p>
                </motion.div>
            </div>

            {/* Matériel */}
            {project.hardware && project.hardware.length > 0 && (
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-sm border border-neon-cyan/20 rounded-3xl p-8 mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                        <Cpu className="text-neon-cyan" size={28} /> Matériel & Technologies
                    </h2>
                    <div className="flex flex-wrap gap-3 relative z-10">
                        {project.hardware.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-slate-100 dark:bg-[#1E293B] border border-slate-700/50 px-4 py-3 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-medium hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors">
                                <Wrench size={16} className="text-slate-500" />
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
