import { Metadata } from 'next';
import CryptoOverview from '../_components/market/crypto/CryptoOverview';
import CryptoOverviewChart from '../_components/market/crypto/CryptoOverviewChart';
import StockOverview from '../_components/market/stock/StockOverview';
import StockOverviewChart from '../_components/market/stock/StockOverviewChart';
import PageLink from '../_components/PageLink';
import SectionHeader from '../_components/SectionHeader';

export const metadata: Metadata = {
	title: 'Kursy kryptowalut i akcji polskich',
};

export default function page() {
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col gap-10'>
			<SectionHeader
				title='Przegląd rynków'
				description='Aktualne informacje o kryptowalutach i polskich akcjach. Odkryj dane rynkowe i trendy w jednym miejscu.'
			/>

			<div className='space-y-3'>
				<PageLink href='/market/crypto' title='Kryptowaluty' />
				<CryptoOverview />
				<CryptoOverviewChart />
			</div>
			<div className='space-y-3'>
				<PageLink href='/market/stocks' title='Akcje' />
				<StockOverview />
				<StockOverviewChart />
			</div>
		</div>
	);
}
