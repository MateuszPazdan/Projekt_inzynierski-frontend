import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Setup from './_components/Setup';

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
			<body className={roboto.className}>
				<Setup>{children}</Setup>
			</body>
		</html>
	);
}
