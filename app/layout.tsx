import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Asset Flow',
	description: 'Aplikacja do kontroli finansów',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pl'>
			<body className={``}>{children}</body>
		</html>
	);
}
