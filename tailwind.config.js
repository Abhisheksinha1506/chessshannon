/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chess: {
          bg: {
            primary: '#020617', // slate-950
            secondary: '#0f172a', // slate-900
            tertiary: '#1e293b', // slate-800
            card: 'rgba(30, 41, 59, 0.7)', // Glassmorphism base
          },
          accent: {
            primary: '#8b5cf6', // violet-500
            secondary: '#ec4899', // pink-500
            glow: 'rgba(139, 92, 246, 0.5)',
          },
          text: {
            primary: '#f8fafc', // slate-50
            secondary: '#94a3b8', // slate-400
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-strong': '0 0 30px rgba(236, 72, 153, 0.4)',
      },
      animation: {
        'float-slow': 'float 25s ease-in-out infinite',
        'float-upward': 'float-upward 10s linear infinite',
        'rotate-king-3d': 'rotate-y 12s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-20px)' },
        },
        'float-upward': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100vh) scale(1.2)', opacity: '0' },
        },
        'rotate-y': {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
