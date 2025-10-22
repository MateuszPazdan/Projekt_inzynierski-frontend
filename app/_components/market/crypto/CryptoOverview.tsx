'use client';

import { useRetrieveAssetsPerformanceQuery } from '@/app/_redux/features/marketApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import AssetListCard from '../AssetListCard';
import NoData from '../../NoData';
import InfoCard from '../../InfoCard';

export default function CryptoOverview() {
	const { data: assetsPerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveAssetsPerformanceQuery();

	console.log(assetsPerformance?.global_crypto_data.top_gainers_24h);
	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
			<div className={`grid grid-row-2 gap-3`}>
				<InfoCard
					title='Kapitalizacja rynku'
					isLoading={isAssetsPerformanceLoading}
				>
					<p>
						{formatFullPrice(
							assetsPerformance?.global_crypto_data.total_market_cap
						) ?? ''}
						{!assetsPerformance && <NoData />}
					</p>
				</InfoCard>
				<InfoCard
					title='Wolumen 24 godzinny'
					isLoading={isAssetsPerformanceLoading}
				>
					<p>
						{formatFullPrice(
							assetsPerformance?.global_crypto_data.total_volume_24h
						)}
						{!assetsPerformance && <NoData />}
					</p>
				</InfoCard>
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
