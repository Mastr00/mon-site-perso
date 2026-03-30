import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, RefreshCw, Loader2 } from "lucide-react";

export default function JokeWidget() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJoke = async () => {
        setLoading(true);
        try {
            // Fetching a safe programming joke
            const res = await fetch("https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single,twopart");
            const data = await res.json();
            
            if (data.type === "single") {
                setJoke({ setup: data.joke, punchline: null });
            } else {
                setJoke({ setup: data.setup, punchline: data.delivery });
            }
        } catch (err) {
            console.error("Joke API Error:", err);
            setJoke({ setup: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?", punchline: "Parce que sinon ils tombent dans le bateau." });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="h-full p-6 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-neon-magenta/20 rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(217,70,239,0.1)] flex flex-col justify-between"
        >
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TerminalSquare className="text-neon-magenta" size={20} /> Dev Jokes
                </h2>
                <button 
                    onClick={fetchJoke}
                    disabled={loading}
                    className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-neon-magenta/20 text-slate-500 hover:text-neon-magenta transition-colors"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin text-neon-magenta" : ""} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center min-h-[100px]">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loader"
                            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                            className="flex justify-center text-neon-magenta"
                        >
                            <Loader2 className="animate-spin" size={24} />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key={joke?.setup}
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                            className="space-y-3"
                        >
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                                {joke?.setup}
                            </p>
                            {joke?.punchline && (
                                <p className="text-sm font-bold text-neon-magenta bg-neon-magenta/10 p-3 rounded-xl border border-neon-magenta/20">
                                    {joke.punchline}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
