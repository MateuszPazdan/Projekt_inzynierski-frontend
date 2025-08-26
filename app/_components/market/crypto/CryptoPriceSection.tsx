import PeriodSelect from '../../PeriodSelect';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import SimpleChart from '../SimpleChart';
import NoData from '../../NoData';
import { CryptoDetails } from '@/app/_actions/cryptoActions';
import {
	useRetrieveCryptoHistoricalPriceQuery,
	useRetrieveCryptoPricePerformanceQuery,
} from '@/app/_redux/features/marketApiSlice';
import { useState } from 'react';
import Image from 'next/image';

interface StockPriceSectionProps {
	cryptoDetails: CryptoDetails;
}

export default function CryptoPriceSection({
	cryptoDetails,
}: StockPriceSectionProps) {
	const [period, setPeriod] = useState<string>('1w');
	const {
		data: cryptoPricePerformance,
		isLoading: isCryptoPerformanceLoading,
	} = useRetrieveCryptoPricePerformanceQuery({
		crypto_symbol: cryptoDetails.symbol,
	});
	const {
		data: historicalData,
		isFetching: isHistoricalDataFetching,
		isLoading: isHistoricalDataLoading,
	} = useRetrieveCryptoHistoricalPriceQuery(
		{
			crypto_symbol: cryptoDetails.symbol,
			period,
		},
		{
			pollingInterval: 900000,
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
		cryptoPricePerformance &&
		((cryptoPricePerformance?.price - minPrice) / (maxPrice - minPrice)) * 100;

	return (
		<div className='flex flex-col gap-5 rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5 overflow-hidden'>
			<p className='flex flex-row gap-2 items-center '>
				<Image
					alt={`${cryptoDetails.name}-logo`}
					src={`${cryptoDetails.icon}`}
					width={28}
					height={28}
				/>
				<span className='text-gray-600 text-sm'>
					{cryptoDetails?.name} Cena
				</span>
			</p>
			<p className='text-2xl sm:text-3xl font-medium'>
				{isCryptoPerformanceLoading ? (
					<span className='inline-block h-6 w-24 rounded shimmer' />
				) : cryptoPricePerformance?.price ? (
					<>
						<span>{cryptoDetails?.currency}</span>{' '}
						{formatFullPrice(cryptoPricePerformance?.price)}
					</>
				) : (
					<NoData />
				)}
			</p>

			{(historicalData ||
				isCryptoPerformanceLoading ||
				isHistoricalDataFetching ||
				isHistoricalDataLoading) && (
				<div className='grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr_auto] gap-1 sm:gap-2 md:gap-3 items-center text-xs lg:text-sm '>
					<p className='sm:order-1 '>
						{isCryptoPerformanceLoading ||
						isHistoricalDataFetching ||
						isHistoricalDataLoading ? (
							<span className='block h-6 w-24 rounded shimmer' />
						) : (
							<>
								<span className='hidden sm:inline text-gray-500'>Minimum</span>{' '}
								<span className='font-medium text-gray-500 sm:text-black'>
									{formatFullPrice(minPrice)} {cryptoDetails?.currency}
								</span>
							</>
						)}
					</p>

					<p className='sm:order-3 text-right'>
						{isCryptoPerformanceLoading ||
						isHistoricalDataFetching ||
						isHistoricalDataLoading ? (
							<span className='block place-self-end h-6 w-24 rounded shimmer' />
						) : (
							<>
								<span className='hidden sm:inline text-gray-500'>Maksimum</span>{' '}
								<span className='font-medium text-gray-500 sm:text-black'>
									{formatFullPrice(maxPrice)} {cryptoDetails?.currency}
								</span>
							</>
						)}
					</p>

					<div className='sm:order-2 col-span-2 sm:col-span-1 w-full relative bg-grayOne border border-grayThird h-2 rounded-lg overflow-hidden'>
						{isCryptoPerformanceLoading ||
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

			{isCryptoPerformanceLoading ? (
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
				<SimpleChart historicalData={historicalData} horizontalCartesianGrid />
			)}
		</div>
	);
}
