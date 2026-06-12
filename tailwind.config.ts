import type { Config } from "tailwindcss";

/**
 * HHL design tokens — single source of truth for color, type, and spacing.
 * Derived from the HHL website design specification (Part 3).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        warmwhite: "#FAF8F4",
        paper: "#FFFFFF",
        stone: "#ECE7DF",
        concrete: "#D8D4CD",
        mist: "#A9A49C",
        greytext: "#6E6962",
        charcoal: "#2B2724",
        graphite: "#191714",
        accent: "#9A4A2E",
      },
      fontFamily: {
        // When licensed fonts are added (see README), drop the files into
        // /public/fonts and register @font-face in globals.css — these
        // family names are already first in the stack.
        sans: [
          '"Suisse Intl"',
          '"Neue Haas Grotesk"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: ['"Canela"', '"Tiempos Text"', "Georgia", '"Times New Roman"', "serif"],
      },
      letterSpacing: {
        label: "0.02em",
        caption: "0.04em",
        wordmark: "0.06em",
      },
      maxWidth: {
        site: "1680px",
        measure: "68ch",
      },
      transitionTimingFunction: {
        architectural: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
