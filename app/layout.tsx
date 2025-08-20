import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Setup from './_components/Setup';
import TopNav from './_components/navigation/TopNav';
import LeftNav from './_components/navigation/LeftNav';

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
				<Setup>
					<div className='min-h-screen bg-grayOne relative lg:grid lg:grid-rows-[auto_1fr] lg:ml-16'>
						<TopNav />
						<LeftNav />
						<div className='min-h-full'>{children}</div>
					</div>
				</Setup>
			</body>
		</html>
	);
}
