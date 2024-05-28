import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        'blue-custom': '#712f64', 
        'orange-custom': '#fec637',
        'violet-custom': '#8b269e',
        'red-custom': '#fb311a',
      },
      backgroundImage: {
        'custom-bg': "url('/images/bg.jpg')",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [nextui()],
};
export default config;