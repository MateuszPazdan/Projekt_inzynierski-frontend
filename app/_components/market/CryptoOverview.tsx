'use client';

import { useRetrieveAssetsPerformanceQuery } from '@/app/_redux/features/marketApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import AssetListCard from './AssetListCard';

export default function CryptoOverview() {
	const { data: assetsPerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveAssetsPerformanceQuery();

	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
			<div className={`grid grid-row-2 gap-3`}>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Kapitalizacja rynkowa</p>
					{!isAssetsPerformanceLoading ? (
						<p className='font-semibold text-xl'>
							{formatFullPrice(
								assetsPerformance?.global_crypto_data.total_market_cap
							)}
						</p>
					) : (
						<div className='h-[30px] w-2/3 sm:w-1/3 rounded shimmer' />
					)}
				</div>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Wolumen 24 godzinny</p>
					{!isAssetsPerformanceLoading ? (
						<p className='font-semibold text-xl'>
							{formatFullPrice(
								assetsPerformance?.global_crypto_data.total_volume_24h
							)}
						</p>
					) : (
						<div className='h-[30px] w-2/3 sm:w-1/3 rounded shimmer' />
					)}
				</div>
			</div>
			<AssetListCard
				assetList={assetsPerformance?.global_crypto_data.top_gainers_24h}
				title='Trendujące'
				limit={3}
				isLoading={isAssetsPerformanceLoading}
				assetType='crypto'
			/>
			<AssetListCard
				assetList={assetsPerformance?.global_crypto_data.top_losers_24h}
				title='Największe spadki'
				limit={3}
				isLoading={isAssetsPerformanceLoading}
				assetType='crypto'
			/>
		</div>
	);
}
