import { withSerwist } from "@serwist/turbopack";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: resolve(__dirname, "../../"),
  },
  outputFileTracingRoot: resolve(__dirname, "../../"),
  experimental: {
    turbopackUseSystemTlsCerts: true,
    outputFileTracingRoot: resolve(__dirname, "../../"),
  },
};

export default withSerwist(nextConfig);
