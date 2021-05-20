module.exports = {
  root: true,
  extends: ["@byloth/eslint-config"],
  env: { jest: true },
  parser: "@babel/eslint-parser",
  ignorePatterns: ["*.json"]
};
