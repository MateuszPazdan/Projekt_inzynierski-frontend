'use client';

import {
	useRetrieveAssetsPerformanceQuery,
	useRetrieveCryptoHistoricalPriceQuery,
} from '@/app/_redux/features/marketApiSlice';
import { useEffect, useState } from 'react';
import SimpleChart from '../SimpleChart';
import PeriodSelect from '../../PeriodSelect';
import Image from 'next/image';
import PercentageChange from '../PercentageChange';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import NoData from '../../NoData';

export default function CryptoOverviewChart() {
	const { data: assetsPerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveAssetsPerformanceQuery();
	const [period, setPeriod] = useState<string>('1w');
	const [symbol, setSymbol] = useState<string>(
		assetsPerformance?.global_crypto_data.top_market_cap_rank[0].symbol ?? ''
	);
	const {
		data: historicalData,
		isFetching: isHistoricalDataFetching,
		isLoading: isHistoricalDataLoading,
	} = useRetrieveCryptoHistoricalPriceQuery(
		{
			crypto_symbol: symbol,
			period,
		},
		{
			pollingInterval: 600000,
		}
	);

	useEffect(() => {
		setSymbol(
			assetsPerformance?.global_crypto_data.top_market_cap_rank[0].symbol ?? ''
		);
	}, [assetsPerformance]);

	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-3 space-y-3'>
			{isAssetsPerformanceLoading ? (
				<div className='flex flex-col items-stretch md:flex-row gap-3'>
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
					{assetsPerformance?.global_crypto_data.top_market_cap_rank?.map(
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
								<Image src={item.icon} alt={item.name} width={24} height={24} />
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
	);
}
