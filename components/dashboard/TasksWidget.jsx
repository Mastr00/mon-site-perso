import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TasksWidget() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("dashboard_tasks");
        if (saved) setTasks(JSON.parse(saved));
        else setTasks([
            { id: 1, text: "Finir le projet ESP32", done: false },
            { id: 2, text: "Préparer le cours de réseau", done: true },
        ]);
    }, []);

    useEffect(() => {
        localStorage.setItem("dashboard_tasks", JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTask = (text) => {
        if (!text.trim()) return;
        setTasks([...tasks, { id: Date.now(), text, done: false }]);
    };

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">✅ Tâches</h2>
                <span className="text-xs text-gray-400">{tasks.filter(t => t.done).length}/{tasks.length} faites</span>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Nouvelle tâche..."
                    className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onKeyDown={(e) => { if (e.key === 'Enter') { addTask(e.target.value); e.target.value = ''; } }}
                />
            </div>

            <ul className="space-y-2 max-h-60 overflow-y-auto">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded transition">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
                        />
                        <span className={`flex-1 ${task.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200"}`}>
                            {task.text}
                        </span>
                        <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="text-red-400 hover:text-red-600 text-sm" aria-label="Supprimer la tâche">
                            ✕
                        </button>
                    </li>
                ))}
                {tasks.length === 0 && <p className="text-gray-400 text-center italic">Aucune tâche pour le moment.</p>}
            </ul>
        </motion.div>
    );
}
