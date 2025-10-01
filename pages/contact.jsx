
export default function Contact() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contact 📩</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        Tu peux m'écrire directement par email. Je réponds rapidement !
      </p>
      <a
        href="mailto:mehdimamdouh20@gmail.com"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Écrire à mehdimamdouh20@gmail.com
      </a>
    </div>
  );
}
