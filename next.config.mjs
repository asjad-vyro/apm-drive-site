import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `STATIC_EXPORT=1 pnpm build` writes a plain static copy to out/ (source for static/).
  ...(process.env.STATIC_EXPORT ? { output: "export" } : {}),
  // Pin the workspace root so a package.json in a parent directory can't
  // confuse output file tracing.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
