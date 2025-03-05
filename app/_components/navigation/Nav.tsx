'use client';

import Burger from './Burger';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import useVerify from '@/app/_hook/useVerify';
import { useAppSelector } from '@/app/_redux/hooks';
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './LoggedIn';
import Logo from './Logo';

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useVerify();
	return (
		<div className='h-16 sticky top-0 bg-white border-b-[2px] border-l-grayOne'>
			<div className='max-w-[1800px] h-full mx-auto grid grid-cols-[auto_1fr_auto] lg:flex flex-row lg:justify-between items-center gap-5 px-2 sm:px-5 '>
				<Logo />
				<div className='relative w-full max-w-[400px] mx-auto lg:mx-0'>
					<span className='absolute text-2xl left-2 top-1/2 -translate-y-1/2'>
						<PiMagnifyingGlass />
					</span>
					<input
						type='text'
						className=' bg-grayOne rounded-lg p-2 pl-10 w-full'
						placeholder='Szukaj...'
					/>
				</div>
				<div className='lg:hidden'>
					<Burger
						isOpen={isOpen}
						onClick={() => {
							setIsOpen((isOpen) => !isOpen);
						}}
					/>
				</div>
				<div className='hidden lg:block'>
					{isAuthenticated ? <LoggedIn /> : <NotLoggedIn />}
				</div>
			</div>
		</div>
	);
}
