import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'text-neon-cyan',
    'text-neon-purple',
    'text-neon-gold',
    'text-neon-pink',
    'border-neon-cyan',
    'border-neon-purple',
    'border-neon-gold',
    'border-neon-pink',
    'bg-neon-cyan',
    'bg-neon-purple',
    'bg-neon-gold',
    'bg-neon-pink',
    'border-neon-cyan/20',
    'border-neon-cyan/30',
    'border-neon-cyan/50',
    'border-neon-purple/20',
    'border-neon-purple/30',
    'border-neon-purple/50',
    'border-neon-gold/20',
    'border-neon-gold/30',
    'border-neon-gold/50',
    'border-neon-pink/20',
    'border-neon-pink/30',
    'border-neon-pink/50',
    'text-neon-cyan/90',
    'text-neon-purple/90',
    'text-neon-gold/90',
    'text-neon-pink/90',
    'bg-neon-cyan/20',
    'bg-neon-purple/20',
    'bg-neon-gold/20',
    'bg-neon-pink/20',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
        neon: {
          cyan: "hsl(var(--neon-cyan) / <alpha-value>)",
          purple: "hsl(var(--neon-purple) / <alpha-value>)",
          gold: "hsl(var(--neon-gold) / <alpha-value>)",
          pink: "hsl(var(--neon-pink) / <alpha-value>)",
        },
        deep: {
          purple: "hsl(var(--deep-purple) / <alpha-value>)",
        },
        midnight: {
          blue: "hsl(var(--midnight-blue) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(185 100% 50% / 0.3), 0 0 20px hsl(185 100% 50% / 0.2)",
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(185 100% 50% / 0.5), 0 0 40px hsl(185 100% 50% / 0.3)",
          },
        },
        "pulse-glow-purple": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(280 100% 60% / 0.3), 0 0 20px hsl(280 100% 60% / 0.2)",
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(280 100% 60% / 0.5), 0 0 40px hsl(280 100% 60% / 0.3)",
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rotate-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "particle-float": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.3",
          },
          "25%": { 
            transform: "translateY(-30px) translateX(10px)",
            opacity: "0.6",
          },
          "50%": { 
            transform: "translateY(-60px) translateX(-5px)",
            opacity: "0.4",
          },
          "75%": { 
            transform: "translateY(-30px) translateX(-15px)",
            opacity: "0.5",
          },
        },
        "orb-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.4",
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "0.6",
          },
        },
        "slide-up": {
          from: { 
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          from: { 
            opacity: "0",
            transform: "translateY(-30px)",
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: { 
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: { 
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "tilt-3d": {
          "0%, 100%": { transform: "rotateY(0deg) rotateX(0deg)" },
          "25%": { transform: "rotateY(5deg) rotateX(5deg)" },
          "50%": { transform: "rotateY(0deg) rotateX(-5deg)" },
          "75%": { transform: "rotateY(-5deg) rotateX(5deg)" },
        },
        "cube-rotate": {
          "0%": { transform: "rotateY(0deg) rotateX(0deg)" },
          "25%": { transform: "rotateY(90deg) rotateX(15deg)" },
          "50%": { transform: "rotateY(180deg) rotateX(0deg)" },
          "75%": { transform: "rotateY(270deg) rotateX(-15deg)" },
          "100%": { transform: "rotateY(360deg) rotateX(0deg)" },
        },
        "glow-line": {
          "0%": { left: "-100%", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { left: "200%", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-glow-purple": "pulse-glow-purple 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "rotate-reverse": "rotate-reverse 25s linear infinite",
        "particle-float": "particle-float 8s ease-in-out infinite",
        "orb-pulse": "orb-pulse 4s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-down": "slide-down 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "tilt-3d": "tilt-3d 10s ease-in-out infinite",
        "cube-rotate": "cube-rotate 20s ease-in-out infinite",
        "glow-line": "glow-line 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, hsl(185 100% 50% / 0.1) 50%, transparent 100%)",
      },
      perspective: {
        "1000": "1000px",
        "2000": "2000px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
