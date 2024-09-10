/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/mails',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  publicRuntimeConfig: {
    docsDir: '/docs', // Path ke folder docs
  },
  trailingSlash: true,
};

module.exports = nextConfig;
