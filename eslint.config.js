// @ts-check
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginCompat from "eslint-plugin-compat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [
      "**/*.js",
      "**/*.cjs",

      // FIXME: We need to disable type checked rules on TypeScript inside Astro's <script /> tag
      //        because of a bug or an error of configuration on my side.
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    ...tseslint.configs.disableTypeChecked,
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: [
      "**/*.astro/*.js",
      "*.astro/*.js",
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    ...eslintPluginCompat.configs["flat/recommended"],
  },
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
  eslintPluginPrettierRecommended,
);
