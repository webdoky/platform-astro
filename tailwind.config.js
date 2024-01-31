import tailwindCssTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ui: {
          background: 'var(--color-ui-background)',
          sidebar: 'var(--color-ui-sidebar)',
          typo: 'var(--color-ui-typo)',
          primary: 'var(--color-ui-primary)',
          border: 'var(--color-ui-border)',
          footer: 'var(--color-ui-footer)',
        },
      },
      spacing: {
        sm: '24rem',
      },
      screens: {
        xxl: '1400px',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [
    tailwindCssTypography,
    // ...
  ],
};
