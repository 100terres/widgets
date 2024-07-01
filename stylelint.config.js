/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-html/html", "stylelint-config-html/astro"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "error",
      },
    ],
  },
};
