import { StockDetails } from '@/app/_actions/stockActions';
import { useState } from 'react';
import {
	useRetrieveStockHistoricalPriceQuery,
	useRetrieveStockPricePerformanceQuery,
} from '@/app/_redux/features/marketApiSlice';
import PeriodSelect from '../../PeriodSelect';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import SimpleChart from '../SimpleChart';
import NoData from '../../NoData';

interface StockPriceSectionProps {
	stockDetails: StockDetails;
}

export default function StockPriceSection({
	stockDetails,
}: StockPriceSectionProps) {
	const [period, setPeriod] = useState<string>('1w');
	const { data: stockPricePerformance, isLoading: isAssetsPerformanceLoading } =
		useRetrieveStockPricePerformanceQuery({
			stock_symbol: stockDetails.symbol,
		});
	const {
		data: historicalData,
		isFetching: isHistoricalDataFetching,
		isLoading: isHistoricalDataLoading,
	} = useRetrieveStockHistoricalPriceQuery(
		{
			stock_symbol: stockDetails.symbol,
			period,
		},
		{
			pollingInterval: 600000,
		}
	);

	const minPrice =
		historicalData && Math.min(...historicalData.map((data) => data.low_price));
	const maxPrice =
		historicalData &&
		Math.max(...historicalData.map((data) => data.high_price));
	const pricePercent =
		minPrice &&
		maxPrice &&
		stockPricePerformance &&
		((stockPricePerformance?.price - minPrice) / (maxPrice - minPrice)) * 100;

	return (
		<div className='flex flex-col gap-5 rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5 overflow-hidden'>
			<p className='flex flex-row gap-2 items-center '>
				<span
					className={`flex items-center justify-center w-7 h-7 aspect-square bg-main text-white rounded-full`}
				>
					{stockDetails?.name.trimStart().charAt(0).toUpperCase()}
				</span>
				<span className='text-gray-600 text-sm'>{stockDetails?.name} Cena</span>
			</p>
			<p className='text-2xl sm:text-3xl font-medium'>
				{isAssetsPerformanceLoading ? (
					<span className='inline-block h-6 w-24 rounded shimmer' />
				) : stockPricePerformance?.price ? (
					<>
						<span>{stockDetails?.currency}</span>{' '}
						{formatFullPrice(stockPricePerformance?.price)}
					</>
				) : (
					<NoData />
				)}
			</p>

			{(historicalData ||
				isAssetsPerformanceLoading ||
				isHistoricalDataFetching ||
				isHistoricalDataLoading) && (
				<div className='grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr_auto] gap-1 sm:gap-2 md:gap-3 items-center text-xs lg:text-sm '>
					<p className='sm:order-1 '>
						{isAssetsPerformanceLoading ||
						isHistoricalDataFetching ||
						isHistoricalDataLoading ? (
							<span className='block h-6 w-24 rounded shimmer' />
						) : (
							<>
								<span className='hidden sm:inline text-gray-500'>Minimum</span>{' '}
								<span className='font-medium text-gray-500 sm:text-black'>
									{formatFullPrice(minPrice)} {stockDetails?.currency}
								</span>
							</>
						)}
					</p>

					<p className='sm:order-3 text-right'>
						{isAssetsPerformanceLoading ||
						isHistoricalDataFetching ||
						isHistoricalDataLoading ? (
							<span className='block place-self-end h-6 w-24 rounded shimmer' />
						) : (
							<>
								<span className='hidden sm:inline text-gray-500'>Maksimum</span>{' '}
								<span className='font-medium text-gray-500 sm:text-black'>
									{formatFullPrice(maxPrice)} {stockDetails?.currency}
								</span>
							</>
						)}
					</p>

					<div className='sm:order-2 col-span-2 sm:col-span-1 w-full relative bg-grayOne border border-grayThird h-2 rounded-lg overflow-hidden'>
						{isAssetsPerformanceLoading ||
						isHistoricalDataFetching ||
						isHistoricalDataLoading ? (
							<span className='absolute left-0 top-0 h-full w-full rounded shimmer' />
						) : (
							<div
								className='absolute h-full transition-all duration-300 ease-in-out'
								style={{
									width: `${pricePercent}%`,
									background:
										'linear-gradient(to right, #add7f6, #2520e3, #3c37ff)',
								}}
							></div>
						)}
					</div>
				</div>
			)}

			{isAssetsPerformanceLoading ? (
				<div className='h-[38px] w-full rounded shimmer' />
			) : (
				<PeriodSelect range={period} setRange={setPeriod} />
			)}
			{isHistoricalDataFetching || isHistoricalDataLoading ? (
				<div className='h-full min-h-[300px] w-full rounded shimmer' />
			) : !historicalData || historicalData[0].period !== period ? (
				<div className='h-full min-h-[300px] flex items-center justify-center'>
					<NoData message='Brak danych do wykresu' />
				</div>
			) : (
				<SimpleChart historicalData={historicalData} />
			)}
		</div>
	);
}
