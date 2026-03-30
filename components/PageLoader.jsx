import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [filledBlocks, setFilledBlocks] = useState(0);
    const totalBlocks = 20;

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            setFilledBlocks(totalBlocks);
            setLoading(false);
            return;
        }

        if (filledBlocks < totalBlocks) {
            const timer = setTimeout(() => {
                setFilledBlocks(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setLoading(false), 300);
            return () => clearTimeout(timer);
        }
    }, [filledBlocks]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[9999] bg-cyber-50 dark:bg-cyber-950 flex items-center justify-center font-mono"
                    style={{ fontFamily: "'Press Start 2P', system-ui" }}
                >
                    <Head>
                        <style>{`
                            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                        `}</style>
                    </Head>
                    
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span className="text-[48px] md:text-[64px] text-cyber-accent">
                            M
                        </span>
                        
                        <p className="text-[12px] text-cyber-accent uppercase tracking-widest">
                            Chargement...
                        </p>
                        
                        {/* Terminal loading bar */}
                        <div className="w-[240px] h-[20px] border-2 border-cyber-accent rounded-none p-[2px] flex gap-[2px]">
                            {Array.from({ length: totalBlocks }).map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-[8px] h-full bg-green-600 dark:bg-green-500 transition-opacity duration-75"
                                    style={{
                                        opacity: i < filledBlocks ? 1 : 0
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
