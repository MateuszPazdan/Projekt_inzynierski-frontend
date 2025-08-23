/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost', 'coin-images.coingecko.com'],
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
