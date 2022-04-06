module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'manrope': ['Manrope', 'sans-serif']
    },
    fontSize: {
      '2xl': '1.75rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'light-cyan': '	#cee3e9',
      'neon-green': '	#52ffa8',
      'grayish-blue': '#4e5d73',
      'dark-grayish-blue': '#323a49',
      'dark-blue': '#1f2632',
    },
    extend: {},
  },
  plugins: [],
}