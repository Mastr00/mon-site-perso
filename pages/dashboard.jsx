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

function DashboardPage() {
  // ✅ Exemple de tâches
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finir le projet ESP32", done: false },
    { id: 2, text: "Préparer le cours de réseau", done: true },
    { id: 3, text: "Avancer le site perso", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // ✅ Exemple de notes
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };

  const removeNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  // ✅ Exemple de données pour stats
  const data = [
    { name: "Lun", value: 3 },
    { name: "Mar", value: 5 },
    { name: "Mer", value: 2 },
    { name: "Jeu", value: 6 },
    { name: "Ven", value: 4 },
    { name: "Sam", value: 7 },
    { name: "Dim", value: 5 },
  ];

  // ✅ Exemple de timer (pomodoro)
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ✅ Citation du jour
  const [quote, setQuote] = useState("Chaque jour est une nouvelle chance !");
  const quotes = [
    "Travaille dur en silence, laisse ton succès faire du bruit.",
    "N’arrête jamais d’apprendre 🚀",
    "La persévérance bat le talent.",
  ];
  const newQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ✅ Tâches */}
        <motion.div whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">✅ Tâches</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <span className={task.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200"}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ✅ Stats */}
        <motion.div whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">📊 Statistiques</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ✅ Timer */}
        <motion.div whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">⏰ Timer</h2>
          <p className="text-2xl font-mono">{formatTime(seconds)}</p>
          <div className="mt-3 space-x-2">
            <button onClick={() => setRunning(true)} className="px-3 py-1 bg-green-500 text-white rounded">Start</button>
            <button onClick={() => setRunning(false)} className="px-3 py-1 bg-yellow-500 text-white rounded">Pause</button>
            <button onClick={() => { setRunning(false); setSeconds(0); }} className="px-3 py-1 bg-red-500 text-white rounded">Reset</button>
          </div>
        </motion.div>

        {/* ✅ Notes */}
        <motion.div whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">📝 Notes</h2>
          <div className="flex gap-2 mb-3">
            <input
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
              placeholder="Écris une note..."
            />
            <button onClick={addNote} className="px-4 py-2 bg-indigo-600 text-white rounded">Ajouter</button>
          </div>
          <ul>
            {notes.map((n, i) => (
              <li key={i} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded mb-2">
                <span>{n}</span>
                <button onClick={() => removeNote(i)} className="text-red-500">X</button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ✅ Citation */}
        <motion.div whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Citation du jour</h2>
          <p className="italic text-gray-600 dark:text-gray-300">“{quote}”</p>
          <button onClick={newQuote} className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">Nouvelle citation</button>
        </motion.div>

      </div>
    </div>
  );
}

// ⚡ Fix Auth0: forcer SSR
export const getServerSideProps = withPageAuthRequired();

export default DashboardPage;
