/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch of Care palette - mere iøjenfaldende
        cream: {
          50: "#faf9f7",
          100: "#f5f3ef",
          200: "#ebe7e0",
        },
        beige: {
          100: "#e8e2d8",
          200: "#d4c9b9",
          300: "#c4b5a0",
        },
        rose: {
          100: "#f5e8e6",
          200: "#e8d4d1",
          300: "#d4b5b0",
          400: "#c49a94",
          500: "#b87d75",
        },
        sage: {
          100: "#e8ebe6",
          200: "#d4dccf",
          300: "#b8c4ab",
          400: "#9aaa8f",
          500: "#7a8f6d",
        },
        charcoal: {
          400: "#6b6b6b",
          600: "#4a4a4a",
          800: "#2d2d2d",
          900: "#1a1a1a",
        },
        // Danske farver - rød/hvid/blå accent
        danish: {
          red: "#C8102E",
          blue: "#004F9F",
        },
        // Mørk grøn accent fra logo
        forest: {
          700: "#2d3a2d",
          800: "#1f2a1f",
          900: "#151a15",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
