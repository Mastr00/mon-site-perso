import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center"
                >
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-violet/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-neon-magenta/8 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-neon-cyan/8 rounded-full blur-3xl"></div>
                    </div>

                    <div className="text-center relative z-10">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className="text-7xl font-black neon-text drop-shadow-2xl">M</span>
                        </motion.div>

                        {/* Loading Dots - neon colors */}
                        <div className="flex justify-center gap-3">
                            {[
                                'bg-neon-violet shadow-[0_0_10px_rgba(139,92,246,0.6)]',
                                'bg-neon-magenta shadow-[0_0_10px_rgba(217,70,239,0.6)]',
                                'bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.6)]',
                            ].map((color, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${color}`}
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-slate-500 text-sm tracking-widest uppercase"
                        >
                            Chargement...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
