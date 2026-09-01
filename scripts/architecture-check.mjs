import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter((file) => file && existsSync(file));
const violations = [];

for (const file of files) {
  if (/^src\/.*\.jsx?$/.test(file)) {
    violations.push(`${file}: application source must use TypeScript`);
  }
  if (/^\.env($|\.)/.test(file) && file !== ".env.example") {
    violations.push(`${file}: environment files must not be committed`);
  }
  if (/^src\/.*\.(ts|tsx)$/.test(file)) {
    const source = readFileSync(file, "utf8");
    if (/api\.(openrouter\.ai|elevenlabs\.io)/i.test(source)) {
      violations.push(`${file}: client code must not call AI providers directly`);
    }
    if (/VITE_(OPENROUTER|ELEVENLABS|GROQ|TWILIO).*(KEY|SECRET|TOKEN)/i.test(source)) {
      violations.push(`${file}: provider credentials must not use public Vite variables`);
    }
  }
}

if (violations.length) {
  console.error("Architecture policy violations:\n" + violations.join("\n"));
  process.exit(1);
}

console.log("QubeSight architecture policies passed.");
