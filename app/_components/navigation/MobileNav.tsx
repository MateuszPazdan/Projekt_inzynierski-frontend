import { useLogout } from '@/app/_hook/useLogout';
import { useRetrieveUserQuery } from '@/app/_redux/features/authApiSlice';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { CiSettings } from 'react-icons/ci';
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
import UserInfo from './UserInfo';

interface Props {
	isMobileNavOpen: boolean;
	isAuthenticated: boolean;
	setIsMobileNavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNav({
	isMobileNavOpen,
	isAuthenticated,
	setIsMobileNavOpen,
}: Props) {
	const { logoutHookFn } = useLogout();
	const { data: user } = useRetrieveUserQuery();

	const handleCloseNav = () => {
		setIsMobileNavOpen(false);
	};

	const handleLogout = () => {
		handleCloseNav();
		logoutHookFn();
	};
	return (
		<div
			className={`lg:hidden absolute right-0 top-16 h-[calc(100vh-64px)] sm600:w-96 w-full overflow-y-auto p-2 grid grid-rows-[auto_1fr_auto] grid-cols-1 justify-between bg-white border-l border-grayThird transition-transform duration-300 z-50  ${
				isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<Link
				href={'/settings'}
				onClick={handleCloseNav}
				className='flex flex-row justify-between items-center hover:bg-grayOne rounded-lg duration-300 transition-colors group'
			>
				{isAuthenticated && (
					<>
						<UserInfo
							email={user?.email}
							username={user?.username}
							imageUrl={user?.avatar_image}
						/>
						<CiSettings className='text-3xl mr-5 group-hover:text-main transition-colors duration-300' />
					</>
				)}
			</Link>

			<div>
				<NavElement
					onClick={handleCloseNav}
					title='Budżet'
					icon={<FaWallet />}
					href='/app/budget'
				/>
				<NavElement
					onClick={handleCloseNav}
					isExtended={isMobileNavOpen}
					title='Inwestycje'
					icon={<FaCoins />}
					href='/app/invest'
				>
					<NavElement
						onClick={handleCloseNav}
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/app/invest/crypto'
					/>
					<NavElement
						onClick={handleCloseNav}
						title='Akcje'
						icon={<FaChartArea />}
						href='/app/invest/stocks'
					/>
				</NavElement>
				<NavElement
					onClick={handleCloseNav}
					isExtended={isMobileNavOpen}
					title='Rynek'
					icon={<FaChartBar />}
					href='/market'
				>
					<NavElement
						onClick={handleCloseNav}
						title='Kryptowaluty'
						icon={<FaBitcoin />}
						href='/market/crypto'
					/>
					<NavElement
						onClick={handleCloseNav}
						title='Akcje'
						icon={<FaChartArea />}
						href='/market/stocks'
					/>
				</NavElement>
				<NavElement
					onClick={handleCloseNav}
					title='Raporty'
					icon={<FaNewspaper />}
					href='/app/raport'
				/>
				<NavElement
					onClick={handleCloseNav}
					title='Konwerter'
					icon={<SiBetfair />}
					href='/convert'
				/>
				<NavElement
					onClick={handleCloseNav}
					title='Obserwowane'
					icon={<FaEye />}
					href='/watchlist'
				/>
			</div>
			<div className='px-2 sm600:px-5 py-2 sm600:py-5'>
				{!isAuthenticated ? (
					<NotLoggedIn
						size='large'
						stretchButtons={true}
						additionalFuntcion={handleCloseNav}
					/>
				) : (
					<Button onClick={handleLogout} stretch={true}>
						Wyloguj się
					</Button>
				)}
			</div>
		</div>
	);
}
