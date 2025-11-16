/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    USERNAME: process.env.NEXT_PUBLIC_USERNAME,
  },
};

module.exports = nextConfig;
