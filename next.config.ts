import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
    ],
  },
  rewrites: () => [{ source: "/server-map", destination: "/server-map/unmined.index.html" }],
};

export default config;
