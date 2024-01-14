/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'pg-header':'2.1rem',
        'pg-title':'1.8rem',
        'base':'1.2rem',
        'pg-header-m':'1.6rem',
        'pg-title-m':'1.4rem',
        'base-m':'1rem'
      },
    },
  },
  plugins: [],
}
