import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react-day-picker"],

  onSuccess:
    "tailwindcss -i ./src/styles.css -o ./dist/styles.css --minify && node scripts/add-use-client.mjs",
});
