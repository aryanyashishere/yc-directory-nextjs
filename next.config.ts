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
  },
  experimental:{
ppr: 'incremental'    
  },
  devIndicators:{
    appIsrStatus : true, 
    buildActivity: true,
    buildActivityPosition: "bottom-right"
  },
};

export default nextConfig;
