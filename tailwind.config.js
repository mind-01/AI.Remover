/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'selector', // Using 'selector' strategy for manual toggling
    theme: {
        extend: {},
    },
    plugins: [],
}
