import { useLogout } from '@/app/_hook/useLogout';
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
import Button from '../Button';
import NavElement from './NavElement';
import NotLoggedIn from './NotLoggedIn';

interface Props {
	isMobileNavOpen: boolean;
	isAuthenticated: boolean;
}

export default function MobileNav({ isMobileNavOpen, isAuthenticated }: Props) {
	const { logoutHookFn } = useLogout();
	return (
		<div
			className={`lg:hidden absolute right-0 top-16 h-[calc(100vh-64px)] sm600:w-96 w-full overflow-y-auto p-2 grid grid-rows-[auto_1fr_auto] grid-cols-1 justify-between bg-white border-l-[2px] border-grayOne transition-transform duration-300 z-50  ${
				isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div>
				{/* TODO - add components if user is logged in */}
				{isAuthenticated && (
					<div>
						<p>Tutaj dane użytkownika</p>
					</div>
				)}
			</div>
			<div>
				<NavElement title='Budżet' icon={<FaWallet />} href='/app/budget' />
				<NavElement title='Inwestycje' icon={<FaCoins />} href='/app/invest'>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/app/invest/crypto'
					/>
					<NavElement
						title='Akcje'
						icon={<FaChartArea />}
						href='/app/invest/stocks'
					/>
				</NavElement>
				<NavElement title='Rynek' icon={<FaChartBar />} href='/app/invest'>
					<NavElement
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/crypto'
					/>
					<NavElement title='Akcje' icon={<FaChartArea />} href='/stocks' />
				</NavElement>
				<NavElement title='Raporty' icon={<FaNewspaper />} href='/' />
				<NavElement title='Konwerter' icon={<SiBetfair />} href='/' />
				<NavElement title='Obserwowane' icon={<FaEye />} href='/' />
			</div>
			<div className='px-2 sm600:px-5 py-2 sm600:py-5'>
				{!isAuthenticated ? (
					<NotLoggedIn size='large' stretchButtons={true} />
				) : (
					<Button onClick={() => logoutHookFn()} stretch={true}>
						Wyloguj się
					</Button>
				)}
			</div>
		</div>
	);
}
