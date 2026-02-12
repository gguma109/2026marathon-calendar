/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                road: {
                    primary: '#3b82f6', // blue-500
                    secondary: '#60a5fa', // blue-400
                    bg: '#eff6ff', // blue-50
                },
                trail: {
                    primary: '#10b981', // emerald-500
                    secondary: '#34d399', // emerald-400
                    bg: '#ecfdf5', // emerald-50
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
