import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// A richly featured personal dashboard inspired by the user's MyLifeDashboard.
// This page is protected by Auth0 and will only render for authenticated users.
// It includes interactive widgets for a to‑do list, a simple pomodoro timer,
// quick notes, budget tracking with a bar chart, statistics about task progress
// and a random quote generator. Dark mode styles are automatically applied
// thanks to Tailwind's `darkMode: 'class'` configuration.

function Dashboard() {
  // --- To‑do list state ---
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finir le projet ESP32", done: false },
    { id: 2, text: "Préparer le cours de réseau", done: true },
    { id: 3, text: "Avancer le site perso", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id) => {
    setTasks((ts) =>
      ts.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks((ts) => ts.filter((t) => t.id !== id));
  };

  // --- Task statistics for chart ---
  const completedCount = tasks.filter((t) => t.done).length;
  const remainingCount = tasks.length - completedCount;
  const statsData = [
    { name: "Terminées", value: completedCount },
    { name: "Restantes", value: remainingCount },
  ];

  // --- Pomodoro timer state ---
  // 1500 seconds = 25 minutes
  const defaultTimer = 1500;
  const [secondsLeft, setSecondsLeft] = useState(defaultTimer);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => (sec > 0 ? sec - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const startPauseTimer = () => {
    setTimerRunning((run) => !run);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(defaultTimer);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // --- Quick notes state ---
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setNotes((ns) => [...ns, noteInput.trim()]);
    setNoteInput("");
  };

  const deleteNote = (idx) => {
    setNotes((ns) => ns.filter((_, i) => i !== idx));
  };

  // --- Budget data for bar chart ---
  const budgetData = [
    { category: "Alimentation", dépensé: 150, budget: 200 },
    { category: "Transport", dépensé: 80, budget: 120 },
    { category: "Logement", dépensé: 400, budget: 450 },
    { category: "Loisirs", dépensé: 90, budget: 100 },
    { category: "Épargne", dépensé: 200, budget: 250 },
  ];

  // --- Quote of the day ---
  const quotes = [
    "Le succès est la somme de petits efforts répétés jour après jour.",
    "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
    "La persévérance n'est pas une longue course; c'est de nombreuses courtes courses l'une après l'autre.",
    "Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours.",
    "Le futur appartient à ceux qui croient en la beauté de leurs rêves.",
  ];
  const [quote, setQuote] = useState(() => {
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
  });
  const newQuote = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[idx]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Ton espace de vie
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Organise ta journée, suis tes dépenses, prends des notes et reste motivé depuis un seul endroit.
        </p>
      </motion.div>

      {/* Dashboard grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tasks Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Tâches</h2>
          <form onSubmit={addTask} className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nouvelle tâche..."
              className="flex-grow mr-2 px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Ajouter
            </button>
          </form>
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2 form-checkbox h-4 w-4 text-indigo-600 dark:text-indigo-400"
                  />
                  <span className={task.done ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-200"}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Supprimer la tâche"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Task Statistics Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Progression</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis allowDecimals={false} stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366F1" name="Nombre" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pomodoro Timer Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⏰ Focus Timer</h2>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-mono text-gray-800 dark:text-gray-100 mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="space-x-4">
              <button
                onClick={startPauseTimer}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                {timerRunning ? "Pause" : "Démarrer"}
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Notes Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Notes rapides</h2>
          <form onSubmit={addNote} className="mb-4 flex">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Écris une note..."
              className="flex-grow mr-2 px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Ajouter
            </button>
          </form>
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {notes.map((note, idx) => (
              <li key={idx} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                <span className="text-gray-800 dark:text-gray-200">
                  {note}
                </span>
                <button
                  onClick={() => deleteNote(idx)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Supprimer la note"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Budget Tracker Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💶 Budget</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="dépensé" fill="#EF4444" name="Dépensé" />
              <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💡 Citation du jour</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
            « {quote} »
          </p>
          <button
            onClick={newQuote}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Nouvelle citation
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Dashboard);