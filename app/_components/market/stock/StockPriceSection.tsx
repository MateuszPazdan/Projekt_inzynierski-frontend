import { StockDetails } from '@/app/_actions/stockActions';
import { useState } from 'react';
import {
	useRetrieveStockHistoricalPriceQuery,
	useRetrieveStockPricePerformanceQuery,
} from '@/app/_redux/features/marketApiSlice';
import PeriodSelect from '../../PeriodSelect';
import Spinner from '../../Spinner';
import EmptyList from '../../EmptyList';
import ChangeChart from '../../ChangeChart';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';

interface StockPriceSectionProps {
	stockDetails: StockDetails;
}

export default function StockPriceSection({
	stockDetails,
}: StockPriceSectionProps) {
	const [period, setPeriod] = useState<string>('1w');
	const { data: stockPricePerformance } = useRetrieveStockPricePerformanceQuery(
		{
			stock_symbol: stockDetails.symbol,
		}
	);
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
			pollingInterval: 900000,
		}
	);

	if (!stockPricePerformance) return;

	const minPrice =
		historicalData && Math.min(...historicalData.map((data) => data.low_price));
	const maxPrice =
		historicalData &&
		Math.max(...historicalData.map((data) => data.high_price));
	const pricePercent =
		minPrice &&
		maxPrice &&
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
				<span>{stockDetails?.currency}</span>{' '}
				{formatFullPrice(stockPricePerformance?.price)}{' '}
			</p>
			<div className='grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr_auto] gap-1 sm:gap-2 md:gap-3 items-center text-xs lg:text-sm '>
				<p className='sm:order-1 '>
					<span className='hidden sm:inline text-gray-500'>Minimum</span>{' '}
					<span className='font-medium text-gray-500 sm:text-black'>
						{formatFullPrice(minPrice)} {stockDetails?.currency}
					</span>
				</p>
				<p className='sm:order-3 text-right'>
					<span className='hidden sm:inline text-gray-500'>Maksimum</span>{' '}
					<span className='font-medium text-gray-500 sm:text-black'>
						{formatFullPrice(maxPrice)} {stockDetails?.currency}
					</span>
				</p>
				<div className='sm:order-2 col-span-2 sm:col-span-1 w-full relative bg-grayOne border border-grayThird h-2 rounded-lg overflow-hidden'>
					<div
						className='absolute h-full transition-all duration-300 ease-in-out'
						style={{
							width: `${pricePercent}%`,
							background:
								'linear-gradient(to right, #add7f6, #2520e3, #3c37ff)',
						}}
					></div>
				</div>
			</div>
			<PeriodSelect range={period} setRange={setPeriod} />
			{isHistoricalDataLoading ? (
				<span className='flex h-full min-h-[300px]'>
					<Spinner
						size='large'
						color='text-main'
						description='Ładowanie wykresu...'
					/>
				</span>
			) : !historicalData || historicalData?.length === 0 ? (
				<EmptyList description='Brak danych do wyświetlenia wykresu' />
			) : (
				<div className={`${isHistoricalDataFetching && 'opacity-50'} h-full`}>
					<ChangeChart historicalData={historicalData} />
				</div>
			)}
		</div>
	);
}
