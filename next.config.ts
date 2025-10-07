import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://9z0vlysskl.execute-api.ap-southeast-2.amazonaws.com/default/:path*",
      },
    ];
  },
};

export default nextConfig;
