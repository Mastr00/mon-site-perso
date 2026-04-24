import { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuoteWidget() {
  const [quote, setQuote] = useState('Chaque jour est une nouvelle chance !');
  const quotes = [
    'Travaille dur en silence, laisse ton succès faire du bruit.',
    'N’arrête jamais d’apprendre 🚀',
    'La persévérance bat le talent.',
    "Le meilleur moyen de prévoir le futur, c'est de le créer.",
    "Fais de ta vie un rêve, et d'un rêve, une réalité.",
  ];

  const newQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-indigo-600 text-cyber-950 dark:text-cyber-100 rounded-2xl shadow md:col-span-2 lg:col-span-2 flex flex-col justify-center items-center text-center"
    >
      <p className="text-xl italic font-medium mb-4">“{quote}”</p>
      <button
        onClick={newQuote}
        className="px-4 py-1 bg-cyber-50/20 hover:bg-cyber-50/30 rounded-full text-sm transition"
      >
        Nouvelle citation
      </button>
    </motion.div>
  );
}
