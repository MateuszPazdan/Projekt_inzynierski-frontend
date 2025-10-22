'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import AssetListCard from '../AssetListCard';
import { useRetrieveAssetsPerformanceQuery } from '@/app/_redux/features/marketApiSlice';
import NoData from '../../NoData';
import InfoCard from '../../InfoCard';

export default function StockOverview() {
	const { data: assetsPerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveAssetsPerformanceQuery();

	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
			<div className={`grid grid-row-2 gap-3`}>
				<InfoCard
					isLoading={isAssetsPerformanceLoading}
					title='Kapitalizacja rynku'
				>
					<p>
						{assetsPerformance?.global_stock_data.total_market_cap
							? formatFullPrice(
									assetsPerformance?.global_stock_data.total_market_cap
							  )
							: ''}
						{!assetsPerformance && <NoData />}
					</p>
				</InfoCard>
				<InfoCard
					isLoading={isAssetsPerformanceLoading}
					title='Wolumen 24 godzinny'
				>
					<p>
						{assetsPerformance?.global_stock_data.total_volume_24h
							? formatFullPrice(
									assetsPerformance?.global_stock_data.total_volume_24h
							  )
							: ''}
						{!assetsPerformance && <NoData />}
					</p>
				</InfoCard>
			</div>
			<AssetListCard
				assetList={assetsPerformance?.global_stock_data.top_gainers_24h}
				title='Trendujące'
				limit={3}
				isLoading={isAssetsPerformanceLoading}
				assetType='stock'
			/>
			<AssetListCard
				assetList={assetsPerformance?.global_stock_data.top_losers_24h}
				title='Największe spadki'
				limit={3}
				isLoading={isAssetsPerformanceLoading}
				assetType='stock'
			/>
		</div>
	);
}
