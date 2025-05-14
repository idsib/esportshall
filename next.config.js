/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don't run ESLint during build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // Para imágenes de Google
      'avatars.githubusercontent.com', // Para imágenes de GitHub
      'platform-lookaside.fbsbx.com', // Para imágenes de Facebook
    ],
  },
}

module.exports = nextConfig