import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mayuralounge.es",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});
export default withMDX(nextConfig);
