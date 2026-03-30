import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  "C++", "C", "ESP32", "IoT", "Python", "OpenCV", 
  "Next.js", "React", "Node.js", "TailwindCSS", "Git", "Linux"
];

export default function SkillsCarousel() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full mt-24 overflow-hidden relative z-10 flex flex-col items-center">
      <p className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-8">
        Technologies & Outils
      </p>
      
      <div className="relative flex w-full max-w-5xl overflow-hidden mask-edges py-4">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {/* Duplicate arrays to make infinite loop smooth (-50% translation) */}
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div 
              key={index}
              className="px-6 py-3 mx-3 bg-white dark:bg-[#0F172A]/80 backdrop-blur-md border border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors shadow-sm"
            >
              <span className="text-neon-violet/70">✦</span> {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
