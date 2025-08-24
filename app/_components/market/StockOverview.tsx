'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import AssetListCard from './AssetListCard';
import { useRetrieveStocksQuery } from '@/app/_redux/features/marketApiSlice';

export default function StockOverview() {
	const { data: stocks, isLoading: isStocksLoading } = useRetrieveStocksQuery(
		{}
	);
	const market_cap = 4060245814285.23;
	const volume_24h = 101353305484.42;
	const topStocks = stocks?.items?.slice().sort((a, b) => b.price - a.price);
	const lowStocks = stocks?.items?.slice().sort((a, b) => a.price - b.price);
	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
			<div className={`grid grid-row-2 gap-3`}>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Kapitalizacja rynkowa</p>
					<p className='font-semibold text-xl'>{formatFullPrice(market_cap)}</p>
				</div>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Wolumen 24 godzinny</p>
					<p className='font-semibold text-xl'>{formatFullPrice(volume_24h)}</p>
				</div>
			</div>
			<AssetListCard
				assetList={topStocks}
				title='Trendujące'
				limit={3}
				isLoading={isStocksLoading}
				assetType='stock'
			/>
			<AssetListCard
				assetList={lowStocks}
				title='Największe spadki'
				limit={3}
				isLoading={isStocksLoading}
				assetType='stock'
			/>
		</div>
	);
}
