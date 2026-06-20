import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import noComments from "eslint-plugin-no-comments";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  {
    plugins: { "no-comments": noComments },
    rules: { "no-comments/disallowComments": "error" },
  },
  prettier,
);
