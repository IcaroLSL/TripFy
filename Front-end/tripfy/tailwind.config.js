/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1E6B5E',
        secondary: '#F4A623',
        surface: '#F7F5F0',
        card: '#FFFFFF',
        text: '#1A1A2E',
        muted: '#6B7280',
        error: '#D94F4F',
        success: '#2E9E6B',
        border: '#E5E7EB',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['28px', { lineHeight: '36px' }],
        heading: ['20px', { lineHeight: '28px' }],
        body: ['15px', { lineHeight: '22px' }],
        label: ['13px', { lineHeight: '18px' }],
        caption: ['11px', { lineHeight: '16px' }],
        code: ['14px', { lineHeight: '20px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        modal: '0 8px 32px rgba(0,0,0,0.16)',
      },
    },
  },
  plugins: [],
};