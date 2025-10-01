import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";
import { useState } from "react";

function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finir le projet ESP32", done: false },
    { id: 2, text: "Préparer le cours de réseau", done: true },
    { id: 3, text: "Avancer le site perso", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          👋 Bienvenue Mehdi !
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Voici ton tableau de bord perso : tâches, notes, stats et plus.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* To-do list */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            ✅ Tâches
          </h2>
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

        {/* Stats */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            📊 Statistiques
          </h2>
          <div className="h-32 flex items-center justify-center text-gray-400 dark:text-gray-500">
            (Graphique à intégrer avec Recharts ou Chart.js)
          </div>
        </motion.div>

        {/* Horloge / météo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            ⏰ Aujourd’hui
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Heure locale : {new Date().toLocaleTimeString()}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">🌤️ Météo : Ensoleillé (demo)</p>
        </motion.div>

        {/* Bloc Notes */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow md:col-span-3"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            📝 Notes
          </h2>
          <textarea
            className="w-full h-32 p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white"
            placeholder="Écris tes idées, rappels ou brouillons ici..."
          ></textarea>
        </motion.div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(DashboardPage);
