import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  },
  images: {
    domains: ["media.api-sports.io"],
  },
};

export default nextConfig;
