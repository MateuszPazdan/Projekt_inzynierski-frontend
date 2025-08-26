'use client';

import { useRetrieveCryptoPricePerformanceQuery } from '@/app/_redux/features/marketApiSlice';
import NoData from '../../NoData';
import { CryptoDetails } from '@/app/_actions/cryptoActions';
import CryptoPriceSection from './CryptoPriceSection';
import PerformanceBox from '../PerformanceBox';
import CryptoDetailsHeader from './CryptoDetailsHeader';

interface CryptoDetailsProps {
	cryptoDetails: CryptoDetails;
}

export default function CryptoDetailsCard({
	cryptoDetails,
}: CryptoDetailsProps) {
	const {
		data: cryptoPricePerformance,
		isLoading: isCryptoPricePerformanceLoading,
	} = useRetrieveCryptoPricePerformanceQuery({
		crypto_symbol: cryptoDetails.symbol,
	});

	return (
		<div className='flex flex-col gap-3'>
			<CryptoDetailsHeader cryptoDetails={cryptoDetails} />
			<div className='grid xl:grid-cols-[3fr_1fr] xl:grid-rows-[1fr_auto] h-fit gap-3'>
				<CryptoPriceSection cryptoDetails={cryptoDetails} />
				<div className='h-fit row-span-2 flex flex-col gap-5 rounded-lg border border-grayThird shadow-md  bg-white py-3 px-5 overflow-hidden'>
					<div>
						<span className='text-gray-600 text-sm font-medium mb-2 block'>
							Zmiana wartości
						</span>
						{isCryptoPricePerformanceLoading ? (
							<div className='grid grid-cols-3 gap-3 justify-between text-center'>
								<span className='block w-full h-[74px] rounded shimmer' />
								<span className='block w-full h-[74px] rounded shimmer' />
								<span className='block w-full h-[74px] rounded shimmer' />
								<span className='block w-full h-[74px] rounded shimmer' />
								<span className='block w-full h-[74px] rounded shimmer' />
								<span className='block w-full h-[74px] rounded shimmer' />
							</div>
						) : cryptoPricePerformance ? (
							<div className='grid grid-cols-3 gap-3 justify-between text-center'>
								<PerformanceBox
									label='1h'
									value={cryptoPricePerformance?.price_change_percentage_1h}
								/>
								<PerformanceBox
									label='24h'
									value={cryptoPricePerformance?.price_change_percentage_24h}
								/>
								<PerformanceBox
									label='7d'
									value={cryptoPricePerformance?.price_change_percentage_7d}
								/>
								<PerformanceBox
									label='1m'
									value={cryptoPricePerformance?.price_change_percentage_30d}
								/>
								<PerformanceBox
									label='1y'
									value={cryptoPricePerformance?.price_change_percentage_1y}
								/>
								<PerformanceBox
									label='Wszystko'
									value={cryptoPricePerformance?.price_change_percentage_max}
								/>
							</div>
						) : (
							<NoData />
						)}
					</div>
					<div className='grid sm:grid-cols-2 gap-4 xl:grid-cols-1 font-medium'>
						<InfoItem
							label='Wolumen 24h'
							value={cryptoDetails.volume_24h?.toLocaleString()}
						/>

						<InfoItem
							label='Kapitalizacja rynkowa'
							value={cryptoDetails.market_cap?.toLocaleString()}
						/>
						<InfoItem
							label='Dostępna podaż'
							value={cryptoDetails.circulating_supply?.toLocaleString()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

const InfoItem = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<div>
		<span className='text-gray-600 text-sm'>{label}</span>
		<p className='font-medium'>{value ?? '-'}</p>
	</div>
);
