/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          violet: '#8B5CF6',
          magenta: '#D946EF',
          cyan: '#22D3EE',
          pink: '#F472B6',
        },
        dark: {
          DEFAULT: '#020617',
          card: '#0F172A',
          elevated: '#1E293B',
        }
      },
      boxShadow: {
        'neon': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(217, 70, 239, 0.2)',
        'neon-lg': '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(217, 70, 239, 0.3)',
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(217, 70, 239, 0.3)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      }
    },
  },
  plugins: [],
};