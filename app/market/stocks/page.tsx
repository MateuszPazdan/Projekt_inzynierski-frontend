import StockList from '@/app/_components/market/stock/StockList';
import StockOverview from '@/app/_components/market/stock/StockOverview';
import SectionHeader from '@/app/_components/SectionHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Kursy akcji',
	description:
		'Śledź aktualne kursy akcji polskich spółek, analizuj wykresy i sprawdzaj dane historyczne.',
};

export default async function page() {
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 gap-3 py-10 max-w-[1800px] w-full mx-auto flex flex-col'>
			<div className='pb-2'>
				<SectionHeader
					title='Rynek akcji'
					description='Śledź aktualne dane giełdowe i podstawowe informacje o notowanych
				spółkach.'
				/>
			</div>
			<StockOverview />
			<StockList />
		</div>
	);
}
