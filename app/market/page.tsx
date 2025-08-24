import Link from 'next/link';
import SectionHeader from '../_components/SectionHeader';
import CryptoOverview from '../_components/market/CryptoOverview';
import { FaAngleRight } from 'react-icons/fa6';
import StockOverview from '../_components/market/StockOverview';
import CryptoOverviewChart from '../_components/market/CryptoOverviewChart';

export default function page() {
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col gap-10'>
			<div>
				<SectionHeader
					title='Przegląd rynków'
					description='Aktualne informacje o kryptowalutach i polskich akcjach. Odkryj dane rynkowe i trendy w jednym miejscu.'
				/>
			</div>

			<div className='space-y-3'>
				<Link
					href={'/market/crypto'}
					className='text-2xl flex flex-row w-fit items-center gap-1 hover:text-second transition-colors duration-300'
				>
					<span className='font-medium'>Kryptowaluty</span>
					<FaAngleRight className='text-xl' />
				</Link>
				<CryptoOverview />
				<CryptoOverviewChart />
			</div>
			<div className='space-y-3'>
				<Link
					href={'/market/stocks'}
					className='text-2xl flex flex-row w-fit items-center gap-1 hover:text-second transition-colors duration-300'
				>
					<span className='font-medium'>Akcje</span>
					<FaAngleRight className='text-xl' />
				</Link>
				<StockOverview />
			</div>
		</div>
	);
}
