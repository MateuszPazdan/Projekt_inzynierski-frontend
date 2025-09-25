'use client';

import {
	useRetrieveAssetsPerformanceQuery,
	useRetrieveStockHistoricalPriceQuery,
} from '@/app/_redux/features/marketApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { useEffect, useState } from 'react';
import PercentageChange from '../PercentageChange';
import SimpleChart from '../SimpleChart';
import PeriodSelect from '../../PeriodSelect';
import NoData from '../../NoData';
import InfoCard from '../../InfoCard';

export default function StockOverviewChart() {
	const { data: assetsPerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveAssetsPerformanceQuery();
	const [period, setPeriod] = useState<string>('1w');
	const [symbol, setSymbol] = useState<string>(
		assetsPerformance?.global_stock_data.top_market_cap_rank[0]?.symbol ?? ''
	);
	const {
		data: historicalData,
		isFetching: isHistoricalDataFetching,
		isLoading: isHistoricalDataLoading,
	} = useRetrieveStockHistoricalPriceQuery(
		{
			stock_symbol: symbol,
			period,
		},
		{
			pollingInterval: 600000,
		}
	);

	useEffect(() => {
		setSymbol(
			assetsPerformance?.global_stock_data.top_market_cap_rank[0]?.symbol ?? ''
		);
	}, [assetsPerformance]);

	return (
		<InfoCard title='Popularne akcje'>
			<div className='space-y-3 pt-2'>
				{isAssetsPerformanceLoading ? (
					<div className='flex flex-col items-stretch md:flex-row gap-3'>
						<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
						<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
						<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
						{assetsPerformance?.global_stock_data.top_market_cap_rank?.map(
							(item) => (
								<button
									onClick={() => setSymbol(item.symbol)}
									className={`flex flex-row items-center  gap-2 p-2 rounded-md text-sm border hover:bg-graySecond transition-colors duration-300 ${
										symbol === item.symbol
											? 'bg-grayOne border-grayThird'
											: 'border-transparent'
									} `}
									key={item.symbol}
								>
									<p
										className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
									>
										{item?.name.trimStart().charAt(0).toUpperCase()}
									</p>
									<p className='flex flex-col justify-start'>
										<span className='truncate font-medium text-start'>
											{item.name}
										</span>
										<span className='flex flex-row gap-1'>
											<span className=''>{formatFullPrice(item.price)}</span>
											<PercentageChange
												change={item.price_change_percentage_24h}
											/>
										</span>
									</p>
								</button>
							)
						)}
					</div>
				)}

				{isHistoricalDataFetching || isHistoricalDataLoading ? (
					<div className='h-[300px] w-full rounded shimmer' />
				) : !historicalData || historicalData[0].period !== period ? (
					<div className='h-[300px] flex items-center justify-center'>
						<NoData message='Brak danych do wykresu' />
					</div>
				) : (
					<SimpleChart historicalData={historicalData} />
				)}
				{isAssetsPerformanceLoading ? (
					<div className='h-[38px] w-full rounded shimmer' />
				) : (
					<PeriodSelect range={period} setRange={setPeriod} />
				)}
			</div>
		</InfoCard>
	);
}
