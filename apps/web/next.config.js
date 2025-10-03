/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: "/web",
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "/:path*",
            },
            {
                source: "/demo-zone/:path*",
                destination: "http://localhost:3001/demo-zone/:path*",
            },
        ];
    },
};

export default nextConfig;
