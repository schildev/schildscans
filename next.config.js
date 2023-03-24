/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'schildscans.pythonanywhere.com',
        port: ''
      }
    ],
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
            value: 'SAMEORIGIN'
          }
        ],
      },
    ]
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
  }
}
module.exports = nextConfig
