import withNextIntl from "next-intl/plugin";

export default withNextIntl("./i18n.ts")({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.awareness-profiling.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
});
