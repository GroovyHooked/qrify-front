/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:id',
  //       destination: '/:id',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
