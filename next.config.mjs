/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wixafbbadrjlqppqupbt.supabase.co'],
    remotePatterns: [{ hostname: 'raw.githubusercontent.com' }]
  }
};

export default nextConfig;
