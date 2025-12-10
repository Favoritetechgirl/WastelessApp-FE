/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // WasteLess Brand Colors - Full 10-Point Shade System
      colors: {
        // Brand Green (Primary)
        brand: {
          50: '#EAF6EC',
          100: '#BCE4C5',
          200: '#9CD7A9',
          300: '#6FC482',
          400: '#53B96A',
          500: '#28A745',
          600: '#24983F',
          700: '#1C7731',
          800: '#165C26',
          900: '#11461D',
        },
        // Dark Slate (Text/Primary UI)
        slate: {
          50: '#EAEBED',
          100: '#BEC1C6',
          200: '#9EA3AB',
          300: '#727984',
          400: '#575F6D',
          500: '#2D3748',
          600: '#293242',
          700: '#202733',
          800: '#191E28',
          900: '#13171E',
        },
        // Danger Red (Warning/Negative Action)
        danger: {
          50: '#FCEBEC',
          100: '#F4C0C5',
          200: '#EFA2A9',
          300: '#E87882',
          400: '#E35D6A',
          500: '#DC3545',
          600: '#C8303F',
          700: '#9C2631',
          800: '#791D26',
          900: '#5C161D',
        },
        // Alert Yellow (Secondary Warning/Attention)
        alert: {
          50: '#FFF9E6',
          100: '#FFECB2',
          200: '#FFE28D',
          300: '#FFD559',
          400: '#FFCD39',
          500: '#FFC107',
          600: '#E8B006',
          700: '#B58905',
          800: '#8C6A04',
          900: '#6B5103',
        },
        // Impact Blue (Data/Informational)
        impact: {
          50: '#E6F2FF',
          100: '#B0D6FF',
          200: '#8AC2FF',
          300: '#54A7FF',
          400: '#3395FF',
          500: '#007BFF',
          600: '#0070E8',
          700: '#0057B5',
          800: '#00448C',
          900: '#00346B',
        },
        // Bright Coral (Accent/Celebration)
        coral: {
          50: '#FFF2E8',
          100: '#FED7B6',
          200: '#FEC493',
          300: '#FEA962',
          400: '#FD9843',
          500: '#FD7E14',
          600: '#E67312',
          700: '#B4590E',
          800: '#8B450B',
          900: '#6A3508',
        },
        // App Background (Surface)
        surface: {
          bg: '#FFFFFF',
          accent: '#F8F9FA',
        },
        // Utility Colors
        utility: {
          border: '#E2E8F0',
          text: '#6C757D',
        },
      },

      // Typography - Poppins & Inter
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      // Mobile Typography Scale
      fontSize: {
        // Mobile
        'mobile-h1': ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'mobile-h2': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'mobile-h3': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'mobile-metric': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'mobile-body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'mobile-body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'mobile-button': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'mobile-caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'mobile-caption-light': ['10px', { lineHeight: '16px', fontWeight: '300' }],
        'mobile-tab': ['10px', { lineHeight: '16px', fontWeight: '500' }],

        // Desktop
        'desktop-h1': ['56px', { lineHeight: '70px', fontWeight: '500' }],
        'desktop-h2': ['30px', { lineHeight: '38px', fontWeight: '500' }],
        'desktop-h3': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'desktop-metric': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'desktop-body': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'desktop-body-sm': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'desktop-button': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'desktop-caption': ['12px', { lineHeight: '20px', fontWeight: '400' }],
        'desktop-caption-light': ['10px', { lineHeight: '18px', fontWeight: '300' }],
        'desktop-tab': ['10px', { lineHeight: '18px', fontWeight: '500' }],

        // Landing Page
        'lp-hero-desktop': ['96px', { lineHeight: '110px', fontWeight: '700' }],
        'lp-subhead-desktop': ['56px', { lineHeight: '70px', fontWeight: '500' }],
        'lp-body-desktop': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'lp-cta-desktop': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'lp-hero-mobile': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'lp-subhead-mobile': ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'lp-body-mobile': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'lp-cta-mobile': ['16px', { lineHeight: '24px', fontWeight: '500' }],
      },

      // Border Radius - Rounded corners for friendly aesthetic
      borderRadius: {
        'wasteless': '12px',
        'wasteless-sm': '8px',
        'wasteless-lg': '16px',
        'wasteless-xl': '24px',
      },

      // Box Shadows - Consistent elevation
      boxShadow: {
        'wasteless': '0 2px 8px rgba(45, 55, 72, 0.08)',
        'wasteless-md': '0 4px 12px rgba(45, 55, 72, 0.12)',
        'wasteless-lg': '0 8px 24px rgba(45, 55, 72, 0.16)',
        'wasteless-xl': '0 12px 32px rgba(45, 55, 72, 0.20)',
      },

      // Spacing - Additional custom spacing if needed
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
    },
  },
  plugins: [],
}
