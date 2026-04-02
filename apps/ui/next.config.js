import { withSerwist } from "@serwist/turbopack";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default withSerwist(nextConfig);
