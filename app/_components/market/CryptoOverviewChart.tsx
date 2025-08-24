'use client';

import {
	useRetrieveCryptosQuery,
	useRetrieveStockHistoricalPriceQuery,
} from '@/app/_redux/features/marketApiSlice';
import { useState } from 'react';
import SimpleChart from './SimpleChart';
import PeriodSelect from '../PeriodSelect';
import Image from 'next/image';
import PriceChange from './PriceChange';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';

export default function CryptoOverviewChart() {
	const [period, setPeriod] = useState<string>('1m');
	const [symbol, setSymbol] = useState<string>('btc');
	const {
		data: historicalData,
		isFetching: isHistoricalDataFetching,
		isLoading: isHistoricalDataLoading,
	} = useRetrieveStockHistoricalPriceQuery(
		{
			stock_symbol: 'LPP.WA',
			period,
		},
		{
			pollingInterval: 900000,
		}
	);

	const { data: cryptos, isLoading } = useRetrieveCryptosQuery({});
	if (!historicalData)
		return (
			<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-3 space-y-3'>
				<div className='flex flex-col items-stretch md:flex-row gap-3'>
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
					<div className='h-[58px] md:w-1/3 rounded shimmer w-full' />
				</div>
				<div className='h-[300px] w-full rounded shimmer' />
				<div className='h-[38px] w-full rounded shimmer' />
			</div>
		);

	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-3 space-y-3'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
				{cryptos?.items.slice(0, 3).map((item) => (
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
								<span className=''>{formatFullPrice(item.price, 2)}</span>
								<PriceChange change={item.price_change_percentage_24h} />
							</span>
						</p>
					</button>
				))}
			</div>
			<SimpleChart historicalData={historicalData} />
			<PeriodSelect range={period} setRange={setPeriod} />
		</div>
	);
}
