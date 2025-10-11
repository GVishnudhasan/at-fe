/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { ACTIVE_ENV } = process.env;

module.exports = withBundleAnalyzer({
  output: 'standalone',
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://dashboard-profile-pic.s3.ap-south-1.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
        port: '',
      },
    ],
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ACTIVE_ENV: ACTIVE_ENV,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // images: {
  //   unoptimized: true,
  // },
});
