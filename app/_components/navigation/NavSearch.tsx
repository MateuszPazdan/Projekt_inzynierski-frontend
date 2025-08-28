import { PiMagnifyingGlass } from 'react-icons/pi';

export default function NavSearch() {
	return (
		<div className='relative w-full max-w-[400px] mx-auto lg:mx-0'>
			<span className='absolute text-2xl left-2 top-1/2 -translate-y-1/2'>
				<PiMagnifyingGlass />
			</span>
			<input
				type='text'
				className=' border-grayThird bg-grayOne border rounded-lg focus:outline-none focus focus:border-main p-2 pl-10 w-full transition-colors duration-300'
				placeholder='Szukaj'
			/>
		</div>
	);
}
