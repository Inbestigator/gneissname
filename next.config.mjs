/** @type {import('next').NextConfig} */
const nextConfig = {
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
  rewrites: async () => {
    return [
      {
        source: "/server-map",
        destination: "/server-map/unmined.index.html",
      },
    ]
  },
}

export default nextConfig
