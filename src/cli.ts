#!/usr/bin/env node
import { greet } from "./index.js";

try {
  console.log(greet(process.argv[2] ?? "world"));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
