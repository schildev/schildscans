/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'schildscans.pythonanywhere.com',
        port: ''
      },
      {
        protocol:"https",
        hostname:"raw.githubusercontent.com"
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'https://schildscans.pythonanywhere.com/api/:path/'
      }
    ]
  }
}
module.exports = nextConfig
