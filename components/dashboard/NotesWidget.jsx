import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, StickyNote } from 'lucide-react';

export default function NotesWidget() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([noteInput, ...notes]);
      setNoteInput('');
    }
  };

  const removeNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-cyber-50 dark:bg-cyber-900 rounded-2xl shadow-sm border border-cyber-200 dark:border-cyber-800 md:col-span-2 flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
          <span className="p-1.5 bg-cyber-accent/10 text-cyber-accent rounded-lg">📝</span>
          Notes Rapides
        </h2>
        <div className="bg-cyber-accent/10 text-cyber-accent text-xs font-bold px-2 py-1 rounded-md">
          {notes.length}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-grow">
          <input
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addNote();
            }}
            className="w-full pl-4 pr-10 py-3 rounded-xl bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 focus:ring-2 focus:ring-cyber-accent focus:border-transparent outline-none transition-all text-cyber-950 dark:text-cyber-100"
            placeholder="Nouvelle idée..."
          />
          <button
            onClick={addNote}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyber-cta hover:bg-cyber-accent text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
        <AnimatePresence>
          {notes.map((n, i) => (
            <motion.div
              key={`${i}-${n.substring(0, 5)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative p-4 bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 rounded-xl group hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeNote(i)}
                  className="p-1 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-cyber-700 dark:text-cyber-200 text-sm font-medium break-words leading-relaxed pr-2">
                {n}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        {notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-8 text-gray-400"
          >
            <StickyNote size={32} className="mb-2 opacity-20" />
            <p className="text-sm">Aucune note pour l'instant.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
