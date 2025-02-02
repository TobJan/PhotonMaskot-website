/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'vercel.com', // Add any external image domains you use
    ],
    unoptimized: false,
  },
  // Enable static exports if you're using static site generation
  // output: 'export', // Uncomment only if you need static export
  
  // Add rewrites/redirects if needed
  async redirects() {
    return [
      // Add any redirects here
    ]
  },

  // Add headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 