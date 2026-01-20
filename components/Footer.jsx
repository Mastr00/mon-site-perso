import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand / Copyright */}
                    <div className="text-center md:text-left">
                        <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                            Mehdi<span className="text-gray-600 dark:text-gray-400">.dev</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            © {new Date().getFullYear()} {t.footer.rights}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/Mastr00"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:mehdimamdouh20@gmail.com"
                            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={24} />
                        </a>
                    </div>

                    {/* Quick message */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{t.footer.madeWith}</span>
                        <Heart size={16} className="text-red-500 fill-red-500" />
                        <span>{t.footer.by} Mehdi</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
