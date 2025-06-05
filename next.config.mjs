// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         appDir: true,
//     },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         appDir: true,
//     },
//     reactStrictMode: false, // غیرفعال کردن StrictMode
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@/graphql/server/graphql': false,
            };
        }
        return config;
    },

    outputFileTracingExcludes: {
        '*': [
            'src/graphql/server/graphql.js',
        ],
    },
};

export default nextConfig;