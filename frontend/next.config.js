/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    USERNAME: process.env.NEXT_PUBLIC_USERNAME,
  },
};

module.exports = nextConfig;
