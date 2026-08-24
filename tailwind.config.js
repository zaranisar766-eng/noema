/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#05070A',
        carbon:   '#0D1116',
        graphite: '#151A21',
        bone:     '#F2EDE3',
        ash:      '#8C939E',
        aurum:    { DEFAULT: '#E9B872', deep: '#C9964F' },
        verdant:  { DEFAULT: '#1E6A5C', lit: '#3FA890' },
        pulse:    '#FF6F4E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'd-xl': ['clamp(3.1rem,10.5vw,10rem)',  { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'd-lg': ['clamp(2.6rem,6.6vw,5.6rem)',  { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'd-md': ['clamp(2rem,4.2vw,3.4rem)',    { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'd-sm': ['clamp(1.5rem,2.6vw,2.15rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      borderColor:     { DEFAULT: 'rgba(242,237,227,.09)', strong: 'rgba(242,237,227,.16)' },
      backgroundImage: { 'aurum-sheen': 'linear-gradient(105deg,#E9B872,#F6D9A6 55%,#C9964F)' },
      transitionTimingFunction: { brand: 'cubic-bezier(.22,1,.36,1)' },
      maxWidth: { shell: '1440px' },
      keyframes: {
        slide:  { to: { transform: 'translateX(-50%)' } },
        ping:   { '0%':{boxShadow:'0 0 0 0 rgba(63,168,144,.55)'}, '70%':{boxShadow:'0 0 0 9px rgba(63,168,144,0)'}, '100%':{boxShadow:'0 0 0 0 rgba(63,168,144,0)'} },
        cue:    { '0%':{transform:'scaleY(0)',transformOrigin:'top'}, '45%':{transform:'scaleY(1)',transformOrigin:'top'}, '55%':{transform:'scaleY(1)',transformOrigin:'bottom'}, '100%':{transform:'scaleY(0)',transformOrigin:'bottom'} },
      },
      animation: { slide: 'slide 42s linear infinite', ping: 'ping 2.4s infinite', cue: 'cue 2.2s cubic-bezier(.65,0,.35,1) infinite' },
    },
  },
  plugins: [],
};
