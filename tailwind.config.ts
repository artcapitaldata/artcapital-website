import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#F8F7F4',
        border: '#E5E5E5',
        accent: '#C9A84C',
        'accent-light': '#E8D48B',
        'accent-dark': '#A08530',
        positive: '#2D8C4E',
        negative: '#C62828',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        editorial: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
