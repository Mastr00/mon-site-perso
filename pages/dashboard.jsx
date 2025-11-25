import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import WeatherWidget from "../components/dashboard/WeatherWidget";
import GithubWidget from "../components/dashboard/GithubWidget";
import QuoteWidget from "../components/dashboard/QuoteWidget";
import TasksWidget from "../components/dashboard/TasksWidget";
import NotesWidget from "../components/dashboard/NotesWidget";

function DashboardPage() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Dashboard – Mehdi</title>
        <meta name="description" content="Mon tableau de bord personnel" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header / Welcome */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bonjour, <span className="text-indigo-600 dark:text-indigo-400">{user ? user.name : "Mehdi"}</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Voici ton tableau de bord personnel.</p>
            </div>
            {user && user.picture && (
              <Image
                src={user.picture}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full border-4 border-indigo-100 dark:border-indigo-900/50 shadow-md"
              />
            )}
          </motion.div>

          {/* Grid Layout - Responsive Fix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Wrapper pour les widgets avec animation */}
            {[WeatherWidget, GithubWidget, QuoteWidget, TasksWidget, NotesWidget].map((Widget, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="h-full"
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/50">
                  <Widget />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ⚡ Fix Auth0: forcer SSR
export const getServerSideProps = withPageAuthRequired();

export default DashboardPage;

