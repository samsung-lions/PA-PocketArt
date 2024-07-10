/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'raw.githubusercontent.com' }, { hostname: 'wixafbbadrjlqppqupbt.supabase.co' }]
  }
};

export default nextConfig;
