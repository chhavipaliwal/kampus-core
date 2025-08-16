/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
    webpackMemoryOptimizations: true
  }
};

export default nextConfig;
