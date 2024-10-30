import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    dangerouslyAllowSVG: true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  }
};

export default nextConfig;
