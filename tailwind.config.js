/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px", // Small screens (default)
      md: "768px", // Medium screens
      lg: "1024px", // Large screens
      xl: "1280px", // Extra large screens
      "2xl": "1536px", // 2 Extra large screens
    },
  },
  plugins: [],
};
