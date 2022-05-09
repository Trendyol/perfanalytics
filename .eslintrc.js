module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "src/*/tsconfig.json",
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "src/*/tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint", "jsx-a11y", "import", "jest"],
  rules: {
    "no-unused-vars": "off",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "class-methods-use-this": "off",
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/require-default-props": "off",
    "react/function-component-definition": [
      2,
      { unnamedComponents: "arrow-function", namedComponents: "arrow-function" },
    ],
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-implied-eval": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/return-await": "off",
  },
};
