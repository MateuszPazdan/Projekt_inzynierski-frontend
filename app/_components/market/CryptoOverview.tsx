'use client';

import { useRetrieveCryptosQuery } from '@/app/_redux/features/marketApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import AssetListCard from './AssetListCard';

export default function CryptoOverview() {
	const { data: cryptos, isLoading } = useRetrieveCryptosQuery({});

	const market_cap = 4060245814285.23;
	const volume_24h = 101353305484.42;
	const topCryptos = cryptos?.items?.slice().sort((a, b) => b.price - a.price);
	const lowCryptos = cryptos?.items?.slice().sort((a, b) => a.price - b.price);
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
				assetList={topCryptos}
				title='Trendujące'
				limit={3}
				isLoading={isLoading}
				assetType='crypto'
			/>
			<AssetListCard
				assetList={lowCryptos}
				title='Największe spadki'
				limit={3}
				isLoading={isLoading}
				assetType='crypto'
			/>
		</div>
	);
}
