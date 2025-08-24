/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'coin-images.coingecko.com',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/market',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
