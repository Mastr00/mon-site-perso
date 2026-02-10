import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useState, useRef } from "react";

export default function Footer() {
    const { t } = useLanguage();
    const [easterEggCount, setEasterEggCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const timeoutRef = useRef(null);

    const handleEasterEgg = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const newCount = easterEggCount + 1;
        setEasterEggCount(newCount);

        if (newCount >= 6) {
            setShowEasterEgg(true);
            setEasterEggCount(0);
            setTimeout(() => setShowEasterEgg(false), 5000);
        } else {
            timeoutRef.current = setTimeout(() => setEasterEggCount(0), 2000);
        }
    };

    return (
        <>
            {/* Easter Egg Modal */}
            {showEasterEgg && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEasterEgg(false)}>
                    <div className="bg-gradient-to-br from-neon-violet to-neon-magenta p-8 rounded-3xl text-white text-center max-w-md animate-bounce shadow-neon">
                        <p className="text-6xl mb-4">🎉</p>
                        <h2 className="text-2xl font-bold mb-2">Bien joué !</h2>
                        <p className="text-violet-100">Tu as trouvé l'easter egg secret ! Tu es curieux, j'aime ça. 😎</p>
                        <p className="text-xs mt-4 opacity-60">Clique n'importe où pour fermer</p>
                    </div>
                </div>
            )}

            <footer className="w-full bg-[#020617] dark:bg-[#020617] border-t border-neon-violet/20 mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Brand / Copyright */}
                        <div className="text-center md:text-left">
                            <Link href="/" className="text-xl font-extrabold neon-text">
                                MMSA<span className="text-slate-400">.app</span>
                            </Link>
                            <p className="text-sm text-slate-500 mt-2">
                                © {new Date().getFullYear()} {t.footer.rights}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6">
                            <a
                                href="https://github.com/Mastr00"
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-neon-violet hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="mailto:mehdimamdouh20@gmail.com"
                                className="text-slate-400 hover:text-neon-magenta hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.5)] transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail size={24} />
                            </a>
                        </div>

                        {/* Made by + Easter Egg Trigger */}
                        <div
                            className="text-sm text-slate-500 cursor-default select-none"
                            onClick={handleEasterEgg}
                        >
                            {t.footer.by} <span className="font-medium text-neon-violet">Mehdi</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
