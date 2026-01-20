import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Trash2 } from "lucide-react";

export default function TasksWidget() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

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

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([{ id: Date.now(), text: newTask, done: false }, ...tasks]);
        setNewTask("");
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2 flex flex-col h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="p-1.5 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg">✅</span>
                    Mes Tâches
                </h2>
                <span className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300">
                    {tasks.filter(t => t.done).length} / {tasks.length}
                </span>
            </div>

            <div className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Ajouter une tâche..."
                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white"
                        onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
                    />
                    <button
                        onClick={addTask}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <ul className="space-y-3 overflow-y-auto pr-1 custom-scrollbar max-h-60">
                <AnimatePresence>
                    {tasks.map(task => (
                        <motion.li
                            key={task.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, x: -20 }}
                            className={`flex items-center p-3 rounded-xl border transition-all ${task.done
                                    ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-sm"
                                }`}
                        >
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${task.done
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-300 dark:border-gray-500 hover:border-green-500 text-transparent"
                                    }`}
                            >
                                <Check size={12} />
                            </button>

                            <span className={`flex-1 font-medium text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200"}`}>
                                {task.text}
                            </span>

                            <button
                                onClick={() => removeTask(task.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                aria-label="Supprimer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
                {tasks.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <span className="text-4xl mb-2">🏝️</span>
                        <p className="text-sm">Rien à faire... Profite !</p>
                    </motion.div>
                )}
            </ul>
        </motion.div>
    );
}
