module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'zc-navy': '#3A4754',
        'zc-sand': '#E5C9A6',
        'zc-ink': '#1F2833',
        'zc-bg': '#FFFFFF',
        'zc-accent': '#FF8A3D',
        'zc-accent-alt': '#FFB662'
      },
      boxShadow: {
        soft: '0 4px 12px -2px rgba(31,40,51,.08),0 2px 4px -1px rgba(31,40,51,.06)',
        lift: '0 10px 22px -6px rgba(31,40,51,.18),0 4px 8px -2px rgba(31,40,51,.10)'
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.4,0,.2,1)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  safelist: [
    'text-zc-navy/80',
    'text-zc-navy/70',
    'shadow-soft',
    'hover:shadow-soft'
  ],
  plugins: []
};
