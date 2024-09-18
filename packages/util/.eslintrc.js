/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [".eslintrc.js"],
  extends: ["@repo/eslint-config/util.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
