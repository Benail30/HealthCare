/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['s3-alpha-sig.figma.com', 'as2.ftcdn.net', 'i.ibb.co', 'as1.ftcdn.net'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
