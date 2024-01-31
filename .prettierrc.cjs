// Prettier configuration
// https://prettier.io/docs/en/configuration.html
module.exports = {
  bracketSameLine: true,
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
