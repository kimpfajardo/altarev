import { readFileSync, writeFileSync } from "node:fs";

const DIRECTIVE = '"use client";\n';

for (const file of ["dist/index.js", "dist/index.cjs"]) {
  const src = readFileSync(file, "utf8");
  if (!src.startsWith(DIRECTIVE)) writeFileSync(file, DIRECTIVE + src);
}
