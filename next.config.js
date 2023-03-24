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
      },
      {
        source:"/sitemap.xml",
        destination:"https://schildscans.pythonanywhere.com/sitemapes.xml"
      }
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ]
}
module.exports = nextConfig
