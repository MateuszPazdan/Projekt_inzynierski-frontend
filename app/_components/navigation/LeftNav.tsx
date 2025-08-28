'use client';

import { useState } from 'react';
import Logo from './Logo';
import NavElement from './NavElement';
import {
	FaBitcoin,
	FaChartArea,
	FaChartBar,
	FaCoins,
	FaEye,
	FaNewspaper,
	FaWallet,
} from 'react-icons/fa';
import { SiBetfair } from 'react-icons/si';
import { usePathname } from 'next/navigation';

export default function LeftNav() {
	const [isNavExtended, setIsNavExtented] = useState(false);
	const pathname = usePathname();

	return (
		<nav
			onMouseEnter={() => setIsNavExtented(true)}
			onMouseLeave={() => setIsNavExtented(false)}
			className={`hidden overflow-hidden lg:flex flex-col items-center fixed left-0 top-0 h-screen transition-all duration-300 w-16 hover:w-64  bg-white border-r border-graThird overflow-y-auto z-50 focus:w-64`}
		>
			<div className='h-16 flex items-center self-start pl-2 pr-3'>
				<Logo isTextHidden={false} />
			</div>
			<div className='w-full p-2'>
				<NavElement
					title='Budżet'
					icon={<FaWallet />}
					href='/app/budget'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/app/budget')}
				/>
				<NavElement
					title='Inwestycje'
					icon={<FaCoins />}
					href='/app/invest'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/app/invest')}
				>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/app/invest/crypto'
						isExtended={isNavExtended}
						isFocused={pathname.includes('/app/invest/crypto')}
					/>
					<NavElement
						title='Akcje'
						icon={<FaChartArea />}
						href='/app/invest/stocks'
						isExtended={isNavExtended}
						isFocused={pathname.includes('/app/invest/stocks')}
					/>
				</NavElement>
				<NavElement
					title='Rynek'
					icon={<FaChartBar />}
					href='/market'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/market')}
				>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/market/crypto'
						isExtended={isNavExtended}
						isFocused={pathname.includes('/market/crypto')}
					/>
					<NavElement
						title='Akcje'
						icon={<FaChartArea />}
						href='/market/stocks'
						isExtended={isNavExtended}
						isFocused={pathname.includes('/market/stocks')}
					/>
				</NavElement>
				<NavElement
					title='Raporty'
					icon={<FaNewspaper />}
					href='/app/raport'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/app/raport')}
				/>
				<NavElement
					title='Konwerter'
					icon={<SiBetfair />}
					href='/convert'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/convert')}
				/>

				<NavElement
					title='Obserwowane'
					icon={<FaEye />}
					href='/watchlist'
					isExtended={isNavExtended}
					isFocused={pathname.includes('/watchlist')}
				/>
			</div>
		</nav>
	);
}
