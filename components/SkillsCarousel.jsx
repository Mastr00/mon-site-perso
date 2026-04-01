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
      <p className="text-cyber-500 uppercase tracking-widest text-sm font-bold mb-8">
        {t.home.skillsTitle}
      </p>
      
      <div className="relative flex w-full max-w-5xl overflow-hidden mask-edges py-4">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div 
              key={index}
              className="px-[14px] py-[6px] mx-2 bg-cyber-100 dark:bg-cyber-900 border border-transparent rounded-[3px] text-cyber-cta-dark dark:text-cyber-accent font-mono font-medium text-[0.875rem] flex items-center gap-2 hover:border-cyber-accent transition-colors"
            >
              <span className="text-cyber-accent">●</span> {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
