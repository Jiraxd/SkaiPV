/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crafatar.com'
            },
            {
                protocol: 'https',
                hostname: 'mc-heads.net'
            },
            {
                hostname: "s.namemc.com",
                protocol: 'https',
            }
        ],
    },
};
