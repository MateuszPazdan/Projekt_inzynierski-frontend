import {
	WatchedCryptoDetails,
	WatchedStockDetails,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface SummaryTopGainerProps {
	topGainer?: WatchedCryptoDetails | WatchedStockDetails;
	isLoading?: boolean;
}

export default function SummaryTopGainer({
	topGainer,
	isLoading,
}: SummaryTopGainerProps) {
	if (!topGainer && !isLoading)
		return <InfoCard title='Największy zysk' text='-'></InfoCard>;

	return (
		<InfoCard
			title='Największy zysk'
			additionalInfo={
				<PercentageChange change={topGainer?.price_change_percentage_24h} />
			}
			isLoading={isLoading}
		>
			{topGainer ? (
				<div className='grid grid-cols-[1fr_auto] items-center gap-1'>
					{'icon' in topGainer ? (
						<div className='flex flex-row items-center gap-2'>
							<Image
								src={`${topGainer.icon}`}
								alt={`${topGainer.name}-icon`}
								width={24}
								height={24}
							/>
							<p className='font-medium text-xl truncate'>{topGainer.name}</p>
						</div>
					) : (
						<div className='flex flex-row items-center gap-2'>
							<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
								{topGainer?.name?.trimStart().charAt(0).toUpperCase()}
							</p>
							<p className='font-medium text-xl truncate'>{topGainer?.name}</p>
						</div>
					)}

					<div
						className={`flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse ${
							topGainer && topGainer?.price_change_percentage_24h < 0
								? 'text-red-500'
								: topGainer && topGainer?.price_change_percentage_24h > 0
								? 'text-green-500'
								: ''
						}`}
					>
						<p>
							{topGainer && topGainer?.price_change_percentage_24h > 0 && '+'}
							{formatFullPrice(topGainer?.price_change_percentage_24h)}
						</p>
					</div>
				</div>
			) : (
				<p>-</p>
			)}
		</InfoCard>
	);
}
