import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, Loader2 } from 'lucide-react';

export default function PetWidget() {
  const [petImage, setPetImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPet = async () => {
    setLoading(true);
    try {
      // Fetch random cute dog!
      const res = await fetch(
        'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg,png,gif'
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setPetImage(data[0].url);
      }
    } catch (err) {
      console.error('Pet API error:', err);
      // Default funny dog image fallback
      setPetImage('https://images.dog.ceo/breeds/shiba/shiba-13.jpg');
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    fetchPet();
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full p-6 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-green-500/20 rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(34,197,94,0.1)] flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4 border-b border-cyber-100 dark:border-cyber-900 pb-3">
        <h2 className="text-lg font-bold text-cyber-950 dark:text-cyber-100 flex items-center gap-2">
          <Camera className="text-green-500" size={20} /> Daily Smile
        </h2>
        <button
          onClick={fetchPet}
          className="p-1.5 bg-cyber-100 dark:bg-cyber-900 rounded-lg hover:bg-green-500/20 text-cyber-500 hover:text-green-500 transition-colors"
        >
          <RefreshCw
            size={16}
            className={loading && !petImage ? 'animate-spin text-green-500' : ''}
          />
        </button>
      </div>

      <div className="flex-1 min-h-[160px] max-h-[200px] w-full rounded-xl overflow-hidden relative group">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyber-100 dark:bg-cyber-900 z-10 text-green-500">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {petImage && (
          <img
            src={petImage}
            alt="Random Pet"
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-cyber-100 text-xs font-medium text-center">Trop mignon ! 🐶</p>
        </div>
      </div>
    </motion.div>
  );
}
