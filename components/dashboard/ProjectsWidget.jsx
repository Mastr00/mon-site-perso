import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle, Package } from 'lucide-react';

export default function ProjectsWidget() {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  // Simuler une liste locale pour la démo dashboard (ne persiste pas entre les reloads dans ce mode simple)
  const [tempProjects, setTempProjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulation d'ajout
    setMessage('Projet ajouté (Simulation) !');
    const formData = new FormData(e.target);
    const newProject = {
      title: formData.get('title'),
      desc: formData.get('description'),
      id: Date.now(),
    };

    setTempProjects([newProject, ...tempProjects]);
    e.target.reset();

    setTimeout(() => {
      setMessage('');
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="bg-cyber-50 dark:bg-cyber-900 p-6 rounded-2xl shadow-sm h-full flex flex-col border border-cyber-200 dark:border-cyber-800 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Package size={100} />
      </div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-xl font-bold text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
          <span className="p-2 bg-cyber-accent/10 rounded-lg text-cyber-accent">🚀</span>
          Projets
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`p-2 rounded-xl transition-all duration-300 ${isAdding ? 'bg-red-100 text-red-500 rotate-45' : 'bg-cyber-100 dark:bg-cyber-800 text-cyber-500 hover:bg-cyber-accent/10 hover:text-cyber-accent'}`}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto relative z-10 scrollbar-hide">
        {!isAdding ? (
          <div className="flex flex-col gap-3">
            {tempProjects.length > 0 && (
              <div className="mb-4 space-y-2">
                <h3 className="text-xs font-semibold text-cyber-400 uppercase tracking-wider">
                  Nouveaux ajouts
                </h3>
                {tempProjects.map((p) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={p.id}
                    className="p-3 rounded-lg bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 flex items-center justify-between"
                  >
                    <span className="font-medium text-cyber-950 dark:text-cyber-100 text-sm truncate">
                      {p.title}
                    </span>
                    <CheckCircle size={14} className="text-green-500" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center text-cyber-500 dark:text-cyber-400 py-6 px-4 bg-cyber-100 dark:bg-cyber-800 rounded-xl border border-dashed border-cyber-200 dark:border-cyber-700">
              <p className="text-sm">Gérez vos projets portfolio ici.</p>
              <p className="text-xs mt-2 opacity-70">Mode simulation active (Front-only)</p>
            </div>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-cyber-500 uppercase mb-1 ml-1">
                Titre
              </label>
              <input
                required
                name="title"
                type="text"
                className="w-full px-4 py-2 text-sm rounded-xl bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 focus:ring-2 focus:ring-cyber-accent outline-none transition-all text-cyber-950 dark:text-cyber-100"
                placeholder="Nom du projet..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cyber-500 uppercase mb-1 ml-1">
                Description
              </label>
              <textarea
                required
                name="description"
                rows="2"
                className="w-full px-4 py-2 text-sm rounded-xl bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 focus:ring-2 focus:ring-cyber-accent outline-none transition-all resize-none text-cyber-950 dark:text-cyber-100"
                placeholder="Court résumé..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyber-cta hover:bg-cyber-accent text-white rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95"
            >
              Ajouter (Simulé)
            </button>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs text-center font-medium"
              >
                {message}
              </motion.div>
            )}
          </motion.form>
        )}
      </div>
    </div>
  );
}
