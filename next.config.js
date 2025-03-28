/** @type {import('next').NextConfig} */
devIndicators: false
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // Para imágenes de Google
      'avatars.githubusercontent.com', // Para imágenes de GitHub
      'platform-lookaside.fbsbx.com', // Para imágenes de Facebook
    ],
  },
}

module.exports = nextConfig