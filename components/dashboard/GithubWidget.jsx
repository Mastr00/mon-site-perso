import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GithubWidget() {
    const [githubUser, setGithubUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://api.github.com/users/Mastr00")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => setGithubUser(data))
            .catch(err => {
                console.error("GitHub error:", err);
                setError(true);
            });
    }, []);

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-gray-800 text-white rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                GitHub <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">@Mastr00</span>
            </h2>
            {error ? (
                <p className="text-sm text-red-300">Erreur chargement GitHub.</p>
            ) : githubUser ? (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Repos publics</span>
                        <span className="font-bold">{githubUser.public_repos}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Followers</span>
                        <span className="font-bold">{githubUser.followers}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{githubUser.bio}</p>
                </div>
            ) : (
                <p className="animate-pulse">Chargement...</p>
            )}
        </motion.div>
    );
}
