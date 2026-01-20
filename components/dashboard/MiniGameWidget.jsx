import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, RotateCcw } from "lucide-react";

export default function MiniGameWidget() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const [timeLeft, setTimeLeft] = useState(15);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("clickGameHighScore");
        if (saved) setHighScore(parseInt(saved));
    }, []);

    useEffect(() => {
        if (isPlaying && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && isPlaying) {
            setIsPlaying(false);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("clickGameHighScore", score.toString());
            }
        }
    }, [isPlaying, timeLeft, score, highScore]);

    const handleClick = () => {
        if (!isPlaying) return;
        setScore(s => s + 1);
        setTargetPosition({
            x: Math.random() * 70 + 10,
            y: Math.random() * 60 + 20,
        });
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(15);
        setIsPlaying(true);
        setTargetPosition({ x: 50, y: 50 });
    };

    return (
        <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-2xl p-6 text-white h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                    <Gamepad2 size={20} /> Click Game
                </h3>
                <div className="flex items-center gap-2 text-sm">
                    <Trophy size={16} />
                    <span>Record: {highScore}</span>
                </div>
            </div>

            {!isPlaying ? (
                <div className="flex-grow flex flex-col items-center justify-center">
                    {timeLeft === 0 && (
                        <div className="text-center mb-4">
                            <p className="text-3xl font-bold">🎉 Score: {score}</p>
                            {score >= highScore && score > 0 && (
                                <p className="text-sm mt-1">Nouveau record !</p>
                            )}
                        </div>
                    )}
                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-white text-pink-600 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        {timeLeft === 0 ? <RotateCcw size={18} /> : null}
                        {timeLeft === 0 ? "Rejouer" : "Jouer !"}
                    </button>
                    <p className="text-xs mt-3 opacity-80">Clique sur la cible le plus vite possible !</p>
                </div>
            ) : (
                <div className="flex-grow relative bg-white/20 rounded-xl overflow-hidden">
                    {/* Timer & Score */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between text-sm font-bold">
                        <span>⏱️ {timeLeft}s</span>
                        <span>🎯 {score}</span>
                    </div>

                    {/* Target */}
                    <motion.button
                        onClick={handleClick}
                        className="absolute w-12 h-12 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                        style={{
                            left: `${targetPosition.x}%`,
                            top: `${targetPosition.y}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    >
                        🎯
                    </motion.button>
                </div>
            )}
        </div>
    );
}
