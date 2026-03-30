import { motion } from "framer-motion";
import { Headphones, Radio } from "lucide-react";

export default function LofiWidget() {
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="h-full p-6 bg-cyber-950 border border-cyber-900 rounded-2xl shadow-xl flex flex-col justify-between"
        >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-cyber-900">
                <h2 className="text-lg font-bold text-cyber-100 flex items-center gap-2">
                    <Headphones className="text-cyber-accent" size={20} /> Lofi Radio
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-cyber-500 px-2 py-1 bg-cyber-500/10 rounded-full font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500"></span>
                    </span>
                    LIVE EN DIRECT
                </div>
            </div>

            <div className="flex-1 w-full relative rounded-xl overflow-hidden bg-black mt-2 shadow-inner border border-cyber-900">
                <div className="aspect-video w-full h-[160px] md:h-auto">
                    <iframe
                        className="absolute inset-0 w-full h-full rounded-xl"
                        src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1"
                        title="Lofi Girl Radio"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            
            <p className="text-xs text-cyber-500 mt-4 text-center">
                Beats to relax/study to.
            </p>
        </motion.div>
    );
}
