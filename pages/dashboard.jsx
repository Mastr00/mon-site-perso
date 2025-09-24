import { useUser } from "@auth0/nextjs-auth0/client";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">👤 Mon Dashboard</h1>

      {user ? (
        <div className="bg-white shadow p-6 rounded-xl">
          <div className="flex items-center gap-6">
            <img src={user.picture} alt="Avatar" className="w-20 h-20 rounded-full border" />
            <div>
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Infos utilisateur</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Tu dois être connecté pour voir ton dashboard.</p>
      )}
    </div>
  );
}
