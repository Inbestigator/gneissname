/** @type {import('next').NextConfig} */
export default {
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
    ];
  },
};
