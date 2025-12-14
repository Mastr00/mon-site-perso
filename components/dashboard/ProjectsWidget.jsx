
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2 } from 'lucide-react';

export default function ProjectsWidget() {
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(e.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            tags: formData.get('tags').split(',').map(t => t.trim()),
            image_url: formData.get('image_url'),
            repo_url: formData.get('repo_url'),
            demo_url: formData.get('demo_url'),
        };

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to add project');

            setMessage('Projet ajouté avec succès !');
            e.target.reset();
            setTimeout(() => setIsAdding(false), 2000);
        } catch (error) {
            setMessage('Erreur: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    🚀 Gestion Projets
                </h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                >
                    <Plus size={20} className={isAdding ? 'rotate-45 transition-transform' : 'transition-transform'} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto">
                {!isAdding ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <p>Cliquez sur + pour ajouter un nouveau projet à votre portfolio.</p>
                        <p className="text-xs mt-2 opacity-70">Les projets s'affichent automatiquement sur la page Portfolio.</p>
                    </div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
                            <input required name="title" type="text" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Mon Super Projet" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea required name="description" rows="2" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="Une brève description..." />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (séparés par virgule)</label>
                                <input name="tags" type="text" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="React, IoT, API" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                <input name="image_url" type="text" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="/images/..." />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Repo URL</label>
                                <input name="repo_url" type="url" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="https://github.com/..." />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
                                <input name="demo_url" type="url" className="w-full p-2 text-sm rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white" placeholder="https://..." />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Ajouter le projet'}
                        </button>

                        {message && (
                            <p className={`text-xs text-center ${message.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        )}
                    </motion.form>
                )}
            </div>
        </div>
    );
}
