import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Fraunces", "serif"],
        wordmark: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "30%": { transform: "translate(3%,2%)" },
          "50%": { transform: "translate(-1%,4%)" },
          "70%": { transform: "translate(2%,-2%)" },
          "90%": { transform: "translate(-3%,1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "draw-line": "draw-line 1.2s cubic-bezier(0.65,0,0.35,1) forwards",
        marquee: "marquee 22s linear infinite",
        grain: "grain 1.2s steps(6) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
