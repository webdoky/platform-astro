import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import tailwindcss from 'tailwindcss';

export default {
  syntax: 'postcss-scss',
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
    cssnanoPlugin({ preset: 'advanced' }),
  ],
};
