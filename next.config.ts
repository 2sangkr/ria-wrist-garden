import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mymomo.gallery' }],
        destination: 'https://mymomo.gallery/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
