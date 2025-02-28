import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import CustomProvider from './_redux/Provider';

export const metadata: Metadata = {
	title: 'Asset Flow',
	description: 'Aplikacja do kontroli finansów',
};

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pl'>
			<CustomProvider>
				<body className={roboto.className}>{children}</body>
			</CustomProvider>
		</html>
	);
}
