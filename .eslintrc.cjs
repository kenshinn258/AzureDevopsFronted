module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    './.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    // [
    //   "error",
    //   {
    //     ignores: ["Index", "Login", "404"],
    //   },
    // ],
    'no-unused-vars': 'off',
    // [
    //   "error",
    //   {
    //     argsIgnorePattern: "^_",
    //     varsIgnorePattern: "^_",
    //     caughtErrors: "none",
    //   },
    // ],
  },
}
