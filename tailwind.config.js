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
        primary: {
          DEFAULT: '#6366F1', // indigo-500
          dark: '#4F46E5'
        }
      }
    },
  },
  plugins: [],
};

// The provided "Code Edit" appears to be for a `next.config.js` file,
// not for the `tailwind.config.js` file that was provided as the initial document.
// Adding `next.config.js` content directly into `tailwind.config.js` would result in a syntactically incorrect file.
// If you intended to create a new `next.config.js` file or modify an existing one,
// please provide that file's content or clarify the instruction.
// For now, the `tailwind.config.js` file remains unchanged as the requested edit
// cannot be applied to it in a syntactically correct manner.