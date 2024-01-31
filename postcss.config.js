import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
export default {
  syntax: 'postcss-scss',
  plugins: { autoprefixer, cssnanoPlugin },
};
