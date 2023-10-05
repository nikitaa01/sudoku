import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'modal-bg-appear': 'modal-bg-appear 0.2s ease-in-out',
        'modal-bg-disappear': 'modal-bg-disappear 0.2s ease-in-out',
        'modal-content-appear': 'modal-content-appear 0.2s ease-in-out',
        'modal-content-disappear': 'modal-content-disappear 0.2s ease-in-out',
        'message-appear': 'message-appear 0.2s ease-in-out',
        'message-disappear': 'message-disappear 0.2s ease-in-out',
      },
      keyframes: {
        'message-appear': {
          '0%': {
            "opacity": "0",
            "transform": "translateY(-1rem)",
          },
          '100%': {
            "opacity": "1",
            "transform": "translateY(0)",
          },
        },
        'message-disappear': {
          '0%': {
            "opacity": "1",
            "transform": "translateY(0)",
          },
          '100%': {
            "opacity": "0",
            "transform": "translateY(-1.5rem)",
          },
        },
        'modal-bg-appear': {
          '0%': {
            "backdrop-filter": "blur(0px)",
          },
          '100%': {
            "backdrop-filter": 'blur(2px)',
            "background-color": "rgba(0, 0, 0, 0.3)",
          },
        },
        'modal-bg-disappear': {
          '0%': {
            "backdrop-filter": 'blur(2px)',
          },
          '100%': {
            "backdrop-filter": 'blur(0px)',
            "background-color": "rgba(0, 0, 0, 0)",
          },
        },
        "modal-content-appear": {
          "0%": {
            "scale": ".2",
            "transform": "translateY(4rem)",
          },
          "100%": {
            "scale": "1",
            "transform": "translateY(0)",
          },
        },
        "modal-content-disappear": {
          "0%": {
            "scale": "1",
            "transform": "translateY(0)",
          },
          "100%": {
            "scale": ".2",
            "transform": "translateY(4rem)",
          },
        },
      }
    },
  },
  plugins: [],
}
export default config
