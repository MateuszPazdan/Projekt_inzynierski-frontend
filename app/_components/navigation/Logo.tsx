import { Gemunu_Libre } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const gemunu = Gemunu_Libre({
	subsets: ['latin'],
	weight: ['400'],
});

export default function Logo() {
	return (
		<div className='flex flex-row gap-2 items-center lg:hidden'>
			<Link href={'/'} className='relative h-12 w-12'>
				<Image
					src={'/logo.png'}
					alt={'Logo aplikacji Asset Flow'}
					fill
					className='aspect-square '
				/>
			</Link>
			<p className={`${gemunu.className} text-4xl text-main hidden`}>
				Asset Flow
			</p>
		</div>
	);
}
