// Prettier configuration
// https://prettier.io/docs/en/configuration.html
module.exports = {
  bracketSameLine: true,
  maxLineLength: 80,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: ["prettier-plugin-astro"],
  singleQuote: true,
};
