import Head from 'next/head';
import Link from 'next/link';
import SEO from '../components/SEO';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle, Loader2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type ToastProps = { message: string; show: boolean; onClose: () => void };

function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
      <div className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-accent/30 rounded-sm px-5 py-4 shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center gap-3 max-w-sm">
        <div className="bg-cyber-accent/10 p-1.5 rounded-full">
          <CheckCircle size={20} className="text-cyber-accent" />
        </div>
        <p className="text-cyber-950 dark:text-cyber-100 text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-cyber-500 hover:text-cyber-950 dark:text-cyber-100 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

type ContactField = 'name' | 'email' | 'subject' | 'message';
type FieldValues = Record<ContactField, string>;
type TouchedFields = Partial<Record<ContactField, boolean>>;

export default function Contact() {
  const [state, handleSubmit] = useForm('xzddapgr');
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [values, setValues] = useState<FieldValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (state.succeeded) {
      setShowToast(true);
    }
  }, [state.succeeded]);

  const handleBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldState = (field: ContactField) => {
    if (!touched[field]) return 'default';
    if (!values[field] || values[field].trim() === '') return 'error';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field])) return 'error';
    return 'valid';
  };

  const fieldClasses = (field: ContactField) => {
    const fieldState = getFieldState(field);
    const base =
      'w-full px-4 py-3 rounded-sm bg-cyber-100 dark:bg-cyber-800 text-cyber-950 dark:text-cyber-100 outline-none transition-all duration-200 placeholder-cyber-400 border';
    if (fieldState === 'error')
      return `${base} border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]`;
    if (fieldState === 'valid')
      return `${base} border-green-500/50 focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)]`;
    return `${base} border-cyber-200 dark:border-cyber-700 focus:border-cyber-accent focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]`;
  };

  if (state.succeeded) {
    return (
      <>
        <Toast
          message={t.contact.successTitle}
          show={showToast}
          onClose={() => setShowToast(false)}
        />
        <div className="min-h-screen flex items-center justify-center bg-cyber-50 dark:bg-cyber-950 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 p-8 rounded-sm shadow-[0_0_15px_rgba(56,189,248,0.1)] text-center max-w-md w-full"
          >
            <div className="mx-auto bg-cyber-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-cyber-accent/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyber-accent"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  d="M20 6 9 17l-5-5"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-cyber-950 dark:text-cyber-100 mb-4 font-mono">
              {t.contact.successTitle}
            </h2>
            <p className="text-cyber-500 dark:text-cyber-400 mb-8">{t.contact.successText}</p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-cyber-cta text-white font-bold rounded-sm hover:bg-cyber-accent transition-colors w-full"
            >
              {t.contact.backHome}
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={`${t.nav.contact} – Mehdi Mamdouh`} description={t.contact.subtitle} />

      <Toast
        message={t.contact.successTitle}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="min-h-screen py-20 px-4 sm:px-6 bg-cyber-50 dark:bg-cyber-950 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-cyber-50 dark:bg-cyber-900 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden border border-cyber-200 dark:border-cyber-800"
        >
          {/* Left Side: Info */}
          <div className="bg-cyber-50 dark:bg-cyber-900 p-10 text-cyber-950 dark:text-cyber-100 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cyber-200 dark:border-cyber-800">
            <div>
              <h1 className="text-4xl font-bold mb-6 font-mono text-cyber-950 dark:text-cyber-100">
                <span className="text-cyber-accent">&gt;</span> {t.contact.title}
              </h1>
              <p className="text-cyber-500 dark:text-cyber-400 text-lg leading-relaxed mb-8">
                {t.contact.subtitle}
              </p>
            </div>
            <div className="space-y-4 text-cyber-700 dark:text-cyber-100 font-mono text-sm">
              <p className="flex items-center gap-3">
                <span className="bg-cyber-100 dark:bg-cyber-800 text-cyber-accent p-2.5 rounded-sm">
                  📧
                </span>
                mehdimamdouh20@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <span className="bg-cyber-100 dark:bg-cyber-800 text-cyber-accent p-2.5 rounded-sm">
                  📍
                </span>
                Nice, France
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 bg-cyber-50 dark:bg-cyber-900">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot anti-bot — invisible aux humains, piège les bots */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                }}
              />
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-cyber-700 dark:text-cyber-100 mb-2"
                >
                  {t.contact.nameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={fieldClasses('name')}
                  placeholder={t.contact.namePlaceholder}
                />
                {getFieldState('name') === 'error' && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.nameRequired}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-cyber-700 dark:text-cyber-100 mb-2"
                >
                  {t.contact.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={fieldClasses('email')}
                  placeholder="votre@email.com"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
                {getFieldState('email') === 'error' && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.emailInvalid}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-cyber-700 dark:text-cyber-100 mb-2"
                >
                  {t.contact.subjectLabel}
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  value={values.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  className={fieldClasses('subject')}
                  placeholder={t.contact.subjectPlaceholder}
                />
                {getFieldState('subject') === 'error' && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.subjectRequired}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-cyber-700 dark:text-cyber-100 mb-2"
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={fieldClasses('message') + ' resize-none'}
                  placeholder={t.contact.messagePlaceholder}
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
                {getFieldState('message') === 'error' && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.messageRequired}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-3 px-6 bg-cyber-cta hover:bg-cyber-accent text-white font-bold rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {state.submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    {t.contact.sendBtn} <Send size={18} />
                  </>
                )}
              </button>
              {state.errors && (
                <p className="text-red-400 text-center text-sm">{t.contact.error}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
