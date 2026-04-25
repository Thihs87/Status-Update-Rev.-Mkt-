import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gupy: {
          'azul-escuro': '#00122f',
          'anil':        '#003cfd',
          'anil-claro':  '#5174fe',
          'verde':       '#cdff82',
          'verde-escuro':'#82c500',
          'verde-claro': '#e6ffac',
          'lilas':       '#9e88ff',
          'laranja':     '#ff5c1d',
          'laranja-escuro': '#db4d23',
          'laranja-claro':  '#fe9d81',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}

export default config
