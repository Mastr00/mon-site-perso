import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Image from "next/image";
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

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header / Welcome */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bonjour, {user ? user.name : "Mehdi"} 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Voici ton tableau de bord personnel.</p>
            </div>
            {user && user.picture && (
              <Image
                src={user.picture}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full border-2 border-indigo-500"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <WeatherWidget />
            <GithubWidget />
            <QuoteWidget />
            <TasksWidget />
            <NotesWidget />
          </div>
        </div>
      </div>
    </>
  );
}

// ⚡ Fix Auth0: forcer SSR
export const getServerSideProps = withPageAuthRequired();

export default DashboardPage;

