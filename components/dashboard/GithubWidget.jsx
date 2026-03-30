import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Users, BookMarked, GitCommit, Loader2, ExternalLink } from "lucide-react";

export default function GithubWidget() {
    const [githubUser, setGithubUser] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.github.com/users/Mastr00")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setGithubUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("GitHub error:", err);
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-full min-h-[160px] p-6 bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="animate-spin mb-2" size={24} />
                <span className="text-sm">Connexion à GitHub...</span>
            </div>
        );
    }

    if (error || !githubUser) {
        return (
            <div className="h-full p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-center justify-center text-red-500">
                <span className="text-sm">Erreur API GitHub</span>
            </div>
        );
    }

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="h-full p-6 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-neon-violet/20 rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.1)] relative overflow-hidden group flex flex-col justify-between"
        >
            <div className="absolute top-[-20%] right-[-10%] opacity-5 pointer-events-none transform scale-150 text-slate-900 dark:text-white">
                <Github size={120} />
            </div>

            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <img 
                            src={githubUser.avatar_url} 
                            alt="GitHub Avatar" 
                            className="w-10 h-10 rounded-full border-2 border-neon-violet/30"
                        />
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                GitHub
                            </h2>
                            <a 
                                href={githubUser.html_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-xs text-slate-500 hover:text-neon-cyan flex items-center gap-1 transition-colors"
                            >
                                @{githubUser.login} <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                    {githubUser.bio || "Développeur passionné."}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="bg-slate-50 dark:bg-[#1E293B] p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <BookMarked size={18} className="text-neon-cyan" />
                    <div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{githubUser.public_repos}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Repos</div>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-[#1E293B] p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <Users size={18} className="text-neon-magenta" />
                    <div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{githubUser.followers}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Followers</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
