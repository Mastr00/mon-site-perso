import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mehdi – Étudiant & Développeur</title>
        <meta name="description" content="Portfolio de Mehdi, étudiant en électronique et cybersécurité. Découvrez mes projets et compétences." />
        <meta property="og:title" content="Mehdi – Étudiant & Développeur" />
        <meta property="og:description" content="Portfolio de Mehdi, étudiant en électronique et cybersécurité." />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">

        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-400/30 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[30%] w-96 h-96 bg-pink-400/30 dark:bg-pink-900/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 backdrop-blur-sm bg-white/30 dark:bg-black/20 p-12 rounded-3xl border border-white/40 dark:border-white/10 shadow-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 drop-shadow-sm">
              Salut, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">Mehdi</span> <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Étudiant en <span className="font-semibold text-indigo-700 dark:text-indigo-300">électronique</span> & <span className="font-semibold text-purple-700 dark:text-purple-300">cybersécurité</span>.
            <br className="hidden md:block" />
            Passionné par l'<span className="font-medium text-pink-600 dark:text-pink-400">IoT</span>, l'embarqué et le web moderne.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Voir mes Projets 🚀
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white border border-white/50 dark:border-gray-600 rounded-2xl font-bold text-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Me contacter 📩
            </Link>
          </motion.div>
        </div>

        <style jsx global>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 10s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes wave {
            0% { transform: rotate(0.0deg) }
            10% { transform: rotate(14.0deg) }  
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate(0.0deg) } 
            100% { transform: rotate(0.0deg) }
          }
          .animate-wave {
            animation-name: wave;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
            transform-origin: 70% 70%;
            display: inline-block;
          }
        `}</style>
      </div>
    </>
  );
}