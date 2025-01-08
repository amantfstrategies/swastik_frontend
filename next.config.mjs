/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '**', // Allow all hostnames over HTTP
        },
        {
          protocol: 'https',
          hostname: '**', // Allow all hostnames over HTTPS
        },
      ],
    },
  };
  
  export default nextConfig;
  