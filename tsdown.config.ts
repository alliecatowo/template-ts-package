import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["esm"],
  target: "node24",
  dts: true,
  fixedExtension: false, // emit .js and .d.ts, matching package.json (type: module)
  clean: true,
  sourcemap: true,
});
