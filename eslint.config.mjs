import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/node_modules/", ".dist/"], // Exclude these directories
    parserOptions: {
      sourceType: "module", // Specify ES modules
      ecmaVersion: "latest", // Use latest ECMAScript version
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    rules: {
      // No need to add "@typescript-eslint/no-unused-vars" here
      "no-unused-expressions": "error", // Enable errors for unused expressions
      "prefer-const": "error", // Enable errors for using `let` when `const` can be used
      "no-console": "warn", // Enable warnings for using `console` statements
      "no-undef": "error", // Enable errors for using undefined variables
    },
  },

  pluginJs.configs.recommended, // Extend with recommended JS rules
  ...tseslint.configs.recommended, // Extend with recommended TS rules
];
