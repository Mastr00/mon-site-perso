import Head from 'next/head';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [state, handleSubmit] = useForm("xzddapgr"); // Placeholder/Demo ID. User should replace this.

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="mx-auto bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message reçu !</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Merci de m'avoir contacté. Je vous répondrai dès que possible.
          </p>
          <a href="/" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact – Mehdi Mamdouh</title>
      </Head>

      <div className="min-h-screen py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">

          {/* Left Side: Info */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-6">Discutons de votre projet 🚀</h1>
              <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                Vous avez une idée en tête, une question sur mes compétences ou simplement envie de dire bonjour ? Remplissez le formulaire et je vous répondrai rapidement.
              </p>
            </div>
            <div className="space-y-4 text-indigo-100">
              <p className="flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-full">📧</span>
                mehdimamdouh20@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-full">📍</span>
                Nice, France
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="votre@email.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Votre Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Bonjour Mehdi, j'aimerais échanger à propos de..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? 'Envoi en cours...' : (
                  <>
                    Envoyer le message <Send size={18} />
                  </>
                )}
              </button>
              {state.errors && (
                <p className="text-red-500 text-center text-sm">Une erreur est survenue. Veuillez réessayer.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </>
  );
}