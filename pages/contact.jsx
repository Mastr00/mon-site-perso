import Head from 'next/head';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle, Loader2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

// Toast component
function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
      <div className="bg-[#0F172A] border border-neon-cyan/30 rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center gap-3 max-w-sm">
        <div className="bg-neon-cyan/10 p-1.5 rounded-full">
          <CheckCircle size={20} className="text-neon-cyan" />
        </div>
        <p className="text-white text-sm font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [state, handleSubmit] = useForm("xzddapgr");
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });

  // Show toast on success
  useEffect(() => {
    if (state.succeeded) {
      setShowToast(true);
    }
  }, [state.succeeded]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const getFieldState = (field) => {
    if (!touched[field]) return 'default';
    if (!values[field] || values[field].trim() === '') return 'error';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field])) return 'error';
    return 'valid';
  };

  const fieldClasses = (field) => {
    const fieldState = getFieldState(field);
    const base = "w-full px-4 py-3 rounded-xl bg-[#1E293B] text-white outline-none transition-all placeholder-slate-500 border";
    if (fieldState === 'error') return `${base} border-red-500/50 focus:ring-2 focus:ring-red-500/30 focus:border-red-500`;
    if (fieldState === 'valid') return `${base} border-green-500/50 focus:ring-2 focus:ring-green-500/30 focus:border-green-500`;
    return `${base} border-neon-violet/20 focus:ring-2 focus:ring-neon-cyan/30 focus:border-neon-cyan`;
  };

  if (state.succeeded) {
    return (
      <>
        <Toast message={t.contact.successTitle} show={showToast} onClose={() => setShowToast(false)} />
        <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
          <div className="bg-[#0F172A] border border-neon-violet/20 p-8 rounded-2xl shadow-neon text-center max-w-md w-full">
            <div className="mx-auto bg-neon-cyan/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-neon-cyan/30">
              <CheckCircle size={32} className="text-neon-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.contact.successTitle}</h2>
            <p className="text-slate-400 mb-8">{t.contact.successText}</p>
            <a href="/" className="px-6 py-2 bg-gradient-to-r from-neon-violet to-neon-magenta text-white rounded-lg hover:shadow-neon transition-all">
              {t.contact.backHome}
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.nav.contact} – Mehdi Mamdouh</title>
      </Head>

      <Toast message={t.contact.successTitle} show={showToast} onClose={() => setShowToast(false)} />

      <div className="min-h-screen py-20 px-4 sm:px-6 bg-[#020617] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#0F172A] rounded-3xl shadow-neon overflow-hidden border border-neon-violet/20">

          {/* Left Side: Info */}
          <div className="bg-gradient-to-br from-neon-violet to-neon-magenta p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(34,211,238,0.2)_0%,transparent_70%)]"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-6">{t.contact.title}</h1>
              <p className="text-violet-100 text-lg leading-relaxed mb-8">{t.contact.subtitle}</p>
            </div>
            <div className="space-y-4 text-violet-100 relative z-10">
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
          <div className="p-10 bg-[#0F172A]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
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
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
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
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
                {getFieldState('email') === 'error' && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.emailInvalid}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
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
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={fieldClasses('message') + ' resize-none'}
                  placeholder={t.contact.messagePlaceholder}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
                {getFieldState('message') === 'error' && (
                  <p className="text-red-400 text-xs mt-1">{t.contact.messageRequired}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-neon-violet to-neon-magenta hover:shadow-neon text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
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

        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}