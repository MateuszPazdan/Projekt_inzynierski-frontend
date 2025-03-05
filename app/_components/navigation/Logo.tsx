import { Gemunu_Libre } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const gemunu = Gemunu_Libre({
	subsets: ['latin'],
	weight: ['400'],
});

interface LogoProps {
	isTextHidden?: boolean;
}

export default function Logo({ isTextHidden = true }: LogoProps) {
	return (
		<Link href={'/'} className='flex flex-row gap-2 items-center'>
			<div className='relative h-12 w-12'>
				<Image
					src={'/logo.png'}
					alt={'Logo aplikacji Asset Flow'}
					fill
					className='aspect-square '
				/>
			</div>
			<p
				className={`${gemunu.className} text-nowrap text-4xl text-main ${
					isTextHidden && 'hidden'
				}`}
			>
				Asset Flow
			</p>
		</Link>
	);
}
