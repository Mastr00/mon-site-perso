import { useState, useEffect } from "react";
import { Smile, Frown, Meh, Heart, Zap, Coffee } from "lucide-react";

const moods = [
    { emoji: "😊", label: "Super", icon: Smile, color: "bg-green-500" },
    { emoji: "😐", label: "OK", icon: Meh, color: "bg-yellow-500" },
    { emoji: "😔", label: "Bof", icon: Frown, color: "bg-red-500" },
    { emoji: "💪", label: "Motivé", icon: Zap, color: "bg-purple-500" },
    { emoji: "☕", label: "Fatigué", icon: Coffee, color: "bg-orange-500" },
    { emoji: "❤️", label: "In love", icon: Heart, color: "bg-pink-500" },
];

export default function MoodWidget() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("moodData");
        if (saved) {
            const data = JSON.parse(saved);
            const today = new Date().toDateString();
            if (data.lastDate === today) {
                setSelectedMood(data.mood);
            }
            setStreak(data.streak || 0);
        }
    }, []);

    const selectMood = (mood) => {
        const today = new Date().toDateString();
        const saved = localStorage.getItem("moodData");
        let newStreak = 1;

        if (saved) {
            const data = JSON.parse(saved);
            const lastDate = new Date(data.lastDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate.toDateString() === yesterday.toDateString()) {
                newStreak = (data.streak || 0) + 1;
            } else if (lastDate.toDateString() === today) {
                newStreak = data.streak || 1;
            }
        }

        setSelectedMood(mood);
        setStreak(newStreak);
        localStorage.setItem("moodData", JSON.stringify({
            mood,
            lastDate: today,
            streak: newStreak,
        }));
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                    <Smile size={20} /> Comment tu te sens ?
                </h3>
                {streak > 1 && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        🔥 {streak} jours
                    </span>
                )}
            </div>

            <div className="flex-grow flex flex-col justify-center">
                {selectedMood ? (
                    <div className="text-center">
                        <span className="text-6xl block mb-2">{moods.find(m => m.label === selectedMood)?.emoji}</span>
                        <p className="text-lg font-medium">{selectedMood}</p>
                        <button
                            onClick={() => setSelectedMood(null)}
                            className="mt-4 text-sm opacity-70 hover:opacity-100 underline"
                        >
                            Changer
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3">
                        {moods.map((mood) => (
                            <button
                                key={mood.label}
                                onClick={() => selectMood(mood.label)}
                                className="flex flex-col items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all hover:scale-105"
                            >
                                <span className="text-2xl mb-1">{mood.emoji}</span>
                                <span className="text-xs">{mood.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
