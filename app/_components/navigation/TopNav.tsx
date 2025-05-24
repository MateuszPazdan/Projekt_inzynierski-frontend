'use client';

import useVerify from '@/app/_hook/useVerify';
import { useAppSelector } from '@/app/_redux/hooks';
import { useState } from 'react';
import Burger from './Burger';
import LoggedIn from './LoggedIn';
import Logo from './Logo';
import MobileNav from './MobileNav';
import NavSearch from './NavSearch';
import NotLoggedIn from './NotLoggedIn';

export default function TopNav() {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useVerify();
	return (
		<div className='h-16 sticky top-0 bg-white border-b-[2px] border-grayOne overflow-x-clip z-50'>
			<div className='max-w-[1800px] h-full mx-auto grid grid-cols-[auto_1fr_auto] lg:flex flex-row lg:justify-between items-center gap-5 px-2 sm:px-5 lg:px-12 '>
				<div className='lg:hidden'>
					<Logo />
				</div>
				<NavSearch />
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
			<MobileNav
				isMobileNavOpen={isOpen}
				setIsMobileNavOpen={setIsOpen}
				isAuthenticated={isAuthenticated}
			/>
		</div>
	);
}
