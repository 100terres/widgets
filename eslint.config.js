// @ts-check
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginCompat from "eslint-plugin-compat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "**/.astro",
      "**/.types",
      "**/.wrangler",
      "**/dist",
      "**/node_modules",
      "worker-configuration.d.ts",
    ],
  },

  // JavaScript
  eslint.configs.recommended,

  // TypeScript
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Astro
  eslintPluginAstro.configs["flat/recommended"],
  eslintPluginAstro.configs["flat/jsx-a11y-strict"],
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
  {
    files: [
      "**/*.astro/*.js",
      "*.astro/*.js",
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    ...eslintPluginCompat.configs["flat/recommended"],
  },

  // Prettier
  eslintPluginPrettierRecommended,
  {
    files: [
      "**/*.astro/*.js",
      "*.astro/*.js",
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    rules: {
      "prettier/prettier": "off",
    },
  },

  // Rules overrides
  {
    rules: {
      "astro/jsx-a11y/no-redundant-roles": [
        "error",
        {
          // We allow explicit role on ul and ol elements, because we assume that we should remove
          // the default styles.
          ol: ["list"],
          ul: ["list"],
        },
      ],
    },
  },
);
