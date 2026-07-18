import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#059669',   // Main Emerald
                    600: '#047857',
                    700: '#065f46',
                    800: '#064e3b',
                    900: '#022c22',
                },
                secondary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#0D9488',   // Teal
                    600: '#0F766E',
                    700: '#115E59',
                    800: '#134E4A',
                    900: '#0F3D3A',
                },
                accent: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#F59E0B',   // Amber
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],
                '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em' }],
                '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.03em' }],
                '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.04em' }],
            },
            animation: {
                shimmer: 'shimmer 2s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-up': 'fadeUp 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'slide-in-right': 'slideInRight 0.5s ease-out',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            boxShadow: {
                'emerald-sm': '0 2px 8px rgba(5, 150, 105, 0.08)',
                'emerald-md': '0 4px 16px rgba(5, 150, 105, 0.12)',
                'emerald-lg': '0 8px 32px rgba(5, 150, 105, 0.16)',
                'emerald-xl': '0 16px 48px rgba(5, 150, 105, 0.2)',
                'teal-sm': '0 2px 8px rgba(13, 148, 136, 0.08)',
                'teal-md': '0 4px 16px rgba(13, 148, 136, 0.12)',
            },
            backgroundImage: {
                'emerald-gradient': 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
                'emerald-gradient-light': 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
                'hero-pattern': 'linear-gradient(rgba(5,150,105,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.03) 1px, transparent 1px)',
            },
            backgroundSize: {
                'hero-grid': '64px 64px',
            },
        },
    },
    plugins: [],
};
export default config;