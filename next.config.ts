import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {


//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   reactStrictMode: false,
//   // Optimize images where possible
//   images: {
//     unoptimized: true, // required for static export
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
//   // Compress output
//   compress: true,
//   // Production optimizations
//   poweredByHeader: false,
// };

// export default nextConfig;