/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "7xl": "90rem",
      },
      colors: {
        cleenzo: {
          DEFAULT: "#0A3D91",
          dark: "#072d6b",
          light: "#1565c0",
          deep: "#002b5b",
          deeper: "#001a38",
          sky: "#7ec8e3",
          "sky-light": "#dbeafe",
          pale: "#eef4fc",
          "pale-bg": "#f8fbff",
        },
      },
    },
  },
  plugins: [],
};
