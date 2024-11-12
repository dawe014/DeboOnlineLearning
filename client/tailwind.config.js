import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure Tailwind scans all JS, JSX, TS, and TSX files in the src directory
    flowbite.content(),
  ],
  theme: {
    extend: {
      color: {
        primary: '#021122',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Added Poppins font family
        montserrat: ['Montserrat', 'sans-serif'], // Added Montserrat font family
      },
      container: {
        center: true, // Center the container
        padding: '2rem', // Add default padding
        screens: {
          sm: '640px',
          md: '768px', // Custom width for md
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
    plugins: [flowbite.plugin()],
  },
};
