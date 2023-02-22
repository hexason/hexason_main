/** @type {import('next').NextConfig} */
require("dotenv-mono").load();
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.alicdn.com'],
  }
}

module.exports = nextConfig
