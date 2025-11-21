import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
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

function DashboardPage() {
  const { user } = useUser();

  // --- 1. Tâches (Persistance LocalStorage) ---
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

  // --- 2. Notes (Persistance LocalStorage) ---
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };

  const removeNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  // --- 3. Météo (OpenMeteo API) ---
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Default: Paris. Could be dynamic.
    fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
      .catch(err => console.error("Weather error:", err));
  }, []);

  // --- 4. GitHub Stats (API GitHub) ---
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Mastr00")
      .then(res => res.json())
      .then(data => setGithubUser(data))
      .catch(err => console.error("GitHub error:", err));
  }, []);

  // --- 5. Citation du jour ---
  const [quote, setQuote] = useState("Chaque jour est une nouvelle chance !");
  const quotes = [
    "Travaille dur en silence, laisse ton succès faire du bruit.",
    "N’arrête jamais d’apprendre 🚀",
    "La persévérance bat le talent.",
    "Le meilleur moyen de prévoir le futur, c'est de le créer.",
    "Fais de ta vie un rêve, et d'un rêve, une réalité."
  ];

  const newQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header / Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bonjour, {user ? user.name : "Mehdi"} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Voici ton tableau de bord personnel.</p>
          </div>
          {user && user.picture && (
            <img src={user.picture} alt="Profile" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* 🌤 Météo */}
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow text-white">
            <h2 className="text-lg font-semibold opacity-90 mb-2">Météo (Paris)</h2>
            {weather ? (
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{weather.temperature}°C</span>
                <div className="text-right">
                  <p className="text-sm opacity-80">Vent: {weather.windspeed} km/h</p>
                  <p className="text-xs opacity-70">Code: {weather.weathercode}</p>
                </div>
              </div>
            ) : (
              <p className="animate-pulse">Chargement...</p>
            )}
          </motion.div>

          {/* 🐙 GitHub Stats */}
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gray-800 text-white rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              GitHub <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">@Mastr00</span>
            </h2>
            {githubUser ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Repos publics</span>
                  <span className="font-bold">{githubUser.public_repos}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Followers</span>
                  <span className="font-bold">{githubUser.followers}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{githubUser.bio}</p>
              </div>
            ) : (
              <p className="animate-pulse">Chargement...</p>
            )}
          </motion.div>

          {/* 💡 Citation */}
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-indigo-600 text-white rounded-2xl shadow md:col-span-2 lg:col-span-2 flex flex-col justify-center items-center text-center">
            <p className="text-xl italic font-medium mb-4">“{quote}”</p>
            <button onClick={newQuote} className="px-4 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition">
              Nouvelle citation
            </button>
          </motion.div>

          {/* ✅ Tâches */}
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
                  <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="text-red-400 hover:text-red-600 text-sm">
                    ✕
                  </button>
                </li>
              ))}
              {tasks.length === 0 && <p className="text-gray-400 text-center italic">Aucune tâche pour le moment.</p>}
            </ul>
          </motion.div>

          {/* 📝 Notes */}
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Notes Rapides</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addNote(); }}
                className="flex-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Écris une note..."
              />
              <button onClick={addNote} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Ajouter</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {notes.map((n, i) => (
                <div key={i} className="relative p-3 bg-yellow-50 dark:bg-gray-700 rounded border border-yellow-100 dark:border-gray-600 group">
                  <p className="text-gray-800 dark:text-gray-200 text-sm break-words">{n}</p>
                  <button
                    onClick={() => removeNote(i)}
                    className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {notes.length === 0 && <p className="text-gray-400 text-center italic col-span-full">Pas de notes.</p>}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// ⚡ Fix Auth0: forcer SSR
export const getServerSideProps = withPageAuthRequired();

export default DashboardPage;
