/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_URL_Local: process.env.BACKEND_URL_Local
  }
}

module.exports = nextConfig
