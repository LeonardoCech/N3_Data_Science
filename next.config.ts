import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy",
        destination:
          "https://api.langflow.astra.datastax.com/lf/e1868f5c-c34f-4234-8438-9a355bab9568/api/v1/run/7132e069-bad9-417e-afe1-534680eded56?stream=false",
      },
    ];
  },
};

export default nextConfig;
