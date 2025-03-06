'use client';

import { useState } from 'react';
import Logo from './Logo';
import NavElement from './NavElement';
import {
	FaBitcoin,
	FaChartArea,
	FaEye,
	FaNewspaper,
	FaWallet,
} from 'react-icons/fa';
import { SiBetfair } from 'react-icons/si';

export default function LeftNav() {
	const [isNavExtended, setIsNavExtented] = useState(false);
	return (
		<nav
			onMouseEnter={() => setIsNavExtented(true)}
			onMouseLeave={() => setIsNavExtented(false)}
			className={`hidden overflow-hidden lg:flex flex-col items-center fixed left-0 top-0 h-screen transition-all duration-300  ${
				isNavExtended ? 'w-64' : 'w-16 '
			} bg-white border-r-[2px] border-grayOne`}
		>
			<div className='h-16 flex items-center self-start pl-2 pr-3'>
				<Logo isTextHidden={false} />
			</div>
			<div className='w-full p-2'>
				<NavElement
					title='Budżet'
					icon={<FaWallet />}
					href='/'
					isExtended={isNavExtended}
				/>
				<NavElement
					title='Kryptowaluty'
					icon={<FaBitcoin />}
					href='/'
					isExtended={isNavExtended}
				/>
				<NavElement
					title='Akcje'
					icon={<FaChartArea />}
					href='/'
					isExtended={isNavExtended}
				/>
				<NavElement
					title='Raporty'
					icon={<FaNewspaper />}
					href='/'
					isExtended={isNavExtended}
				/>
				<NavElement
					title='Konwerter'
					icon={<SiBetfair />}
					href='/'
					isExtended={isNavExtended}
				/>

				<NavElement
					title='Obserwowane'
					icon={<FaEye />}
					href='/'
					isExtended={isNavExtended}
				/>
			</div>
		</nav>
	);
}
