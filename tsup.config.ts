import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  // ponytail: Tailwind v4 compiles CSS via its own CLI; chain it here instead of a postcss loader.
  onSuccess: "tailwindcss -i ./src/styles.css -o ./dist/styles.css --minify",
});
