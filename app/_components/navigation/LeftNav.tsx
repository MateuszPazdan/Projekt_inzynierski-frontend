'use client';

import { useState } from 'react';
import Logo from './Logo';
import UserNavElement from './UserNavElement';
import { CiBitcoin } from 'react-icons/ci';

export default function LeftNav() {
	const [isNavExtended, setIsNavExtented] = useState(false);
	return (
		<nav
			onMouseEnter={() => setIsNavExtented(true)}
			onMouseLeave={() => setIsNavExtented(false)}
			className={`hidden overflow-hidden lg:flex flex-col items-center absolute left-0 top-0 h-screen transition-all duration-300  ${
				isNavExtended ? 'w-64' : 'w-16 '
			} bg-white border-r-[2px] border-grayOne`}
		>
			<div className='h-16 flex items-center self-start pl-2 pr-3'>
				<Logo isTextHidden={false} />
			</div>
			<div className=' w-full p-2'>
				<UserNavElement title='Kryptowaluty' icon={<CiBitcoin />} href='/' />
				<UserNavElement title='Akcje' icon={<CiBitcoin />} href='/' />
				<UserNavElement title='Konwerter' icon={<CiBitcoin />} href='/' />
				<UserNavElement title='Portfel' icon={<CiBitcoin />} href='/' />
				<UserNavElement title='Obserwowane' icon={<CiBitcoin />} href='/' />
			</div>
		</nav>
	);
}
