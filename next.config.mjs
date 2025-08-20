/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost'],
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
