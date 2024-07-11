/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  daisyui: {
    themes: false,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
