import { Gemunu_Libre } from 'next/font/google';
import Image from 'next/image';

const gemunu = Gemunu_Libre({
	subsets: ['latin'],
	weight: ['400'],
});

export default function Nav() {
	return (
		<div className='h-16 sticky top-0 bg-white border-b-[2px] border-l-grayOne'>
			<div className='max-w-[1800px] h-full mx-auto flex flex-row items-center px-5'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='relative h-12 w-12'>
						<Image
							src={'/logo.png'}
							alt={'Logo aplikacji Asset Flow'}
							fill
							className='aspect-square '
						/>
					</div>
					<p className={`${gemunu.className} text-4xl text-main`}>Asset Flow</p>
				</div>
			</div>
		</div>
	);
}
