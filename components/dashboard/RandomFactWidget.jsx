import { useState } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";

const facts = [
    "🐙 Une pieuvre a trois cœurs et du sang bleu.",
    "🍯 Le miel ne périme jamais. On en a retrouvé dans des tombes égyptiennes, encore comestible !",
    "🦴 Un être humain a plus d'os à la naissance (300) qu'à l'âge adulte (206).",
    "🌍 La Terre n'est pas parfaitement ronde, elle est légèrement aplatie aux pôles.",
    "🧠 Ton cerveau utilise environ 20% de l'énergie de ton corps.",
    "🐌 Un escargot peut dormir pendant 3 ans.",
    "⚡ Un éclair contient assez d'énergie pour griller 100 000 tranches de pain.",
    "🦈 Les requins existent depuis plus longtemps que les arbres.",
    "🌙 Sur la Lune, tes empreintes de pas resteraient là pendant des millions d'années.",
    "🐬 Les dauphins donnent des noms à leurs amis (des sifflements uniques).",
    "🔥 La température au cœur du Soleil est d'environ 15 millions de degrés Celsius.",
    "🦷 Les dents d'un éléphant peuvent peser jusqu'à 4 kg chacune.",
    "🎮 Le premier jeu vidéo a été créé en 1958 (Tennis for Two).",
    "🌊 L'océan Pacifique est plus grand que toutes les terres émergées réunies.",
    "🐝 Une abeille visite environ 5 000 fleurs par jour.",
];

export default function RandomFactWidget() {
    const [currentFact, setCurrentFact] = useState(facts[Math.floor(Math.random() * facts.length)]);
    const [isSpinning, setIsSpinning] = useState(false);

    const getNewFact = () => {
        setIsSpinning(true);
        setTimeout(() => {
            let newFact;
            do {
                newFact = facts[Math.floor(Math.random() * facts.length)];
            } while (newFact === currentFact && facts.length > 1);
            setCurrentFact(newFact);
            setIsSpinning(false);
        }, 300);
    };

    return (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-slate-900 dark:text-white h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                    <Lightbulb size={20} /> Le savais-tu ?
                </h3>
                <button
                    onClick={getNewFact}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    disabled={isSpinning}
                >
                    <RefreshCw size={16} className={isSpinning ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <p className="text-lg text-center leading-relaxed font-medium">
                    {currentFact}
                </p>
            </div>
        </div>
    );
}
