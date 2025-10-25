import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next Image to load images from Supabase storage buckets.
  // We permit any subdomain under supabase.co for the storage/v1 path.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/**",
      },
    ],
  },
};

export default nextConfig;
