const fs = require("node:fs");
const path = require("node:path");

const envFile = path.resolve(__dirname, "../.env.local");

if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;

    const value = match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_, doubleQuoted, singleQuoted) =>
      doubleQuoted ?? singleQuoted
    );
    process.env[match[1]] = value;
  }
}

module.exports = process.env;
