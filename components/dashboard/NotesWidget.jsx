import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NotesWidget() {
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

    return (
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
                            aria-label="Supprimer la note"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {notes.length === 0 && <p className="text-gray-400 text-center italic col-span-full">Pas de notes.</p>}
            </div>
        </motion.div>
    );
}
