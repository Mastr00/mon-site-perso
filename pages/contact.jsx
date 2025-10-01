import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",     // ⚡️ à remplacer par ton ID
        "YOUR_TEMPLATE_ID",    // ⚡️ à remplacer par ton ID
        e.target,
        "YOUR_USER_ID"         // ⚡️ à remplacer par ton ID (clé publique)
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          e.target.reset();
        },
        () => {
          setLoading(false);
          setSuccess(false);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Contactez-moi 📩
      </h1>

      <form
        onSubmit={sendEmail}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Votre nom</span>
          <input
            type="text"
            name="user_name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Votre email</span>
          <input
            type="email"
            name="user_email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Message</span>
          <textarea
            name="message"
            rows="4"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>

        {success === true && (
          <p className="mt-4 text-green-500">✅ Message envoyé avec succès !</p>
        )}
        {success === false && (
          <p className="mt-4 text-red-500">❌ Une erreur est survenue.</p>
        )}
      </form>
    </div>
  );
}
