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

export default function LeftNav() {
	const [isNavExtended, setIsNavExtented] = useState(false);
	return (
		<nav
			onMouseEnter={() => setIsNavExtented(true)}
			onMouseLeave={() => setIsNavExtented(false)}
			className={`hidden overflow-hidden lg:flex flex-col items-center fixed left-0 top-0 h-screen transition-all duration-300  ${
				isNavExtended ? 'w-64' : 'w-16 '
			} bg-white border-r-[2px] border-grayOne overflow-y-auto z-50`}
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
				/>
				<NavElement
					title='Inwestycje'
					icon={<FaCoins />}
					href='/app/invest'
					isExtended={isNavExtended}
				>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/app/invest/crypto'
						isExtended={isNavExtended}
					/>
					<NavElement
						title='Akcje'
						icon={<FaChartArea />}
						href='/app/invest/stocks'
						isExtended={isNavExtended}
					/>
				</NavElement>
				<NavElement
					title='Rynek'
					icon={<FaChartBar />}
					href='/market'
					isExtended={isNavExtended}
				>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/market/crypto'
						isExtended={isNavExtended}
					/>
					<NavElement
						title='Akcje'
						icon={<FaChartArea />}
						href='/market/stocks'
						isExtended={isNavExtended}
					/>
				</NavElement>
				<NavElement
					title='Raporty'
					icon={<FaNewspaper />}
					href='/app/raport'
					isExtended={isNavExtended}
				/>
				<NavElement
					title='Konwerter'
					icon={<SiBetfair />}
					href='/convert'
					isExtended={isNavExtended}
				/>

				<NavElement
					title='Obserwowane'
					icon={<FaEye />}
					href='/watchlist'
					isExtended={isNavExtended}
				/>
			</div>
		</nav>
	);
}
