import CryptoPortfoliosSummary from '@/app/_components/invest/crypto/CryptoPortfoliosSummary';
import StockPortfolioSummary from '@/app/_components/invest/stock/StockPortfolioSummary';
import SectionHeader from '@/app/_components/SectionHeader';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-10'>
			<SectionHeader
				title='Przegląd inwestycji'
				description='Śledź swoje inwestycje w kryptowaluty i akcje w jednym miejscu.'
			/>

			{/* <PortfolioOverview /> */}
			<div className='space-y-3'>
				<Link
					href={'/app/invest/crypto'}
					className='text-2xl flex flex-row w-fit items-center gap-1 hover:text-second transition-colors duration-300'
				>
					<span className='font-medium'>Kryptowaluty</span>
					<FaAngleRight className='text-xl' />
				</Link>
				<CryptoPortfoliosSummary />
			</div>
			<div className='space-y-3'>
				<Link
					href={'/app/invest/stocks'}
					className='text-2xl flex flex-row w-fit items-center gap-1 hover:text-second transition-colors duration-300'
				>
					<span className='font-medium'>Akcje</span>
					<FaAngleRight className='text-xl' />
				</Link>
				<StockPortfolioSummary />
			</div>
		</div>
	);
}
