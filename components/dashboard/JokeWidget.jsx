import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSquare, RefreshCw, Loader2 } from 'lucide-react';

export default function JokeWidget() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      // Fetching a safe programming joke
      const res = await fetch(
        'https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single,twopart'
      );
      const data = await res.json();

      if (data.type === 'single') {
        setJoke({ setup: data.joke, punchline: null });
      } else {
        setJoke({ setup: data.setup, punchline: data.delivery });
      }
    } catch (err) {
      console.error('Joke API Error:', err);
      setJoke({
        setup: 'Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?',
        punchline: 'Parce que sinon ils tombent dans le bateau.',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full p-6 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-500/20 rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(56,189,248,0.1)] flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4 border-b border-cyber-100 dark:border-cyber-900 pb-3">
        <h2 className="text-lg font-bold text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
          <TerminalSquare className="text-cyber-500" size={20} /> Dev Jokes
        </h2>
        <button
          onClick={fetchJoke}
          disabled={loading}
          className="p-1.5 bg-cyber-100 dark:bg-cyber-900 rounded-lg hover:bg-cyber-500/20 text-cyber-500 hover:text-cyber-500 transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-cyber-500' : ''} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[100px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center text-cyber-500"
            >
              <Loader2 className="animate-spin" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key={joke?.setup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-sm font-medium text-cyber-800 dark:text-cyber-50 leading-relaxed">
                {joke?.setup}
              </p>
              {joke?.punchline && (
                <p className="text-sm font-bold text-cyber-500 bg-cyber-500/10 p-3 rounded-xl border border-cyber-500/20">
                  {joke.punchline}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
