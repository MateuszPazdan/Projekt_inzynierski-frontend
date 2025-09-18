import CryptoPortfoliosSummary from '@/app/_components/invest/crypto/CryptoPortfoliosSummary';
import StockPortfolioSummary from '@/app/_components/invest/stock/StockPortfolioSummary';
import PageLink from '@/app/_components/PageLink';
import SectionHeader from '@/app/_components/SectionHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Przegląd inwestycji',
};

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-10'>
			<SectionHeader
				title='Przegląd inwestycji'
				description='Śledź swoje inwestycje w kryptowaluty i akcje w jednym miejscu.'
			/>
			<div className='space-y-3'>
				<PageLink href='/app/invest/crypto' title='Kryptowaluty' />
				<CryptoPortfoliosSummary />
			</div>
			<div className='space-y-3'>
				<PageLink href='/app/invest/stocks' title='Akcje' />
				<StockPortfolioSummary />
			</div>
		</div>
	);
}
