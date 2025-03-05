import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Setup from './_components/Setup';
import Nav from './_components/navigation/Nav';

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
					<div className='min-h-screen grid grid-rows-[auto_1fr]'>
						<Nav />
						<div className='min-h-full'>{children}</div>
						<div className='flex justify-center items-center py-5 border-t-[2px] border-grayOne'>
							{new Date().getFullYear()} Asset Flow 
						</div>
					</div>
				</Setup>
			</body>
		</html>
	);
}
