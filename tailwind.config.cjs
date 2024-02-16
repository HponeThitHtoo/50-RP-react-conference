/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: 'Montserrat, Helvetica, Arial, sans-serif',
        lato: 'Lato, arial, sans-serif',
      },
      colors: {
        mossgreen: '#949D6A',
        plum: '#D68FD6',
        darkDashboard: '#1F2937',
        darkDashboardNav: '#111827',
      },
    },
  },
  plugins: [],
};
