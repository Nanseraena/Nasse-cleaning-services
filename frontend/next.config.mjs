/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    if (!process.env.BACKEND_URL) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*/`,
      },
    ];
  },
};

export default nextConfig;