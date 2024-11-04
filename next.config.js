/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'michaelsnook.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'snook.pub',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'i.picsum.photos',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'hmpueymmlhhphzvebjku.supabase.co',
				port: '',
			},
		],
	},
}
