const fs = require("node:fs");
const { parseArgs } = require("node:util");
const { build, context } = require("esbuild");
const esbuildPluginPino = require("esbuild-plugin-pino");

const isProduction =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "preview";

/** @type import("esbuild").BuildOptions **/
const opts = {
  outdir: "dist/",
  entryPoints: [{ in: "app.ts", out: "server" }],
  bundle: true,
  platform: "node",
  format: "cjs",
  minify: false,
  sourcemap: true,
  logLevel: "info",

  plugins: [
    esbuildPluginPino({
      transports: isProduction ? undefined : ["pino-pretty"],
    }),
  ],
};

build(opts);
