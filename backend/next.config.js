/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // Use pages directory
  },
  // Disable static optimization for API routes
  output: 'standalone',
}

module.exports = nextConfig