import {
	CryptoTopGainer,
	StockTopGainer,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface SummaryTopGainerProps {
	topGainer?: CryptoTopGainer | StockTopGainer;
	isLoading?: boolean;
}

export default function SummaryTopGainer({
	topGainer,
	isLoading,
}: SummaryTopGainerProps) {
	if (!topGainer && !isLoading)
		return <InfoCard title='Największy zysk' text='-'></InfoCard>;

	const topGainerAsset =
		topGainer &&
		('crypto' in topGainer ? { ...topGainer.crypto } : { ...topGainer.stock });

	return (
		<InfoCard
			title={`${
				topGainer && topGainer?.profit_loss > 0
					? 'Największy zysk'
					: 'Najmniejsza strata'
			}`}
			additionalInfo={
				<PercentageChange change={topGainer?.profit_loss_percentage} />
			}
			isLoading={isLoading}
		>
			{topGainer && topGainerAsset ? (
				<div className='grid grid-cols-[1fr_auto] items-center gap-1'>
					{'icon' in topGainerAsset ? (
						<div className='flex flex-row items-center gap-2'>
							<Image
								src={`${topGainerAsset.icon}`}
								alt={`${topGainerAsset.name}-icon`}
								width={24}
								height={24}
							/>
							<p className='font-medium text-xl truncate'>
								{topGainerAsset.name}
							</p>
						</div>
					) : (
						<div className='flex flex-row items-center gap-2'>
							<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
								{topGainerAsset?.name?.trimStart().charAt(0).toUpperCase()}
							</p>
							<p className='font-medium text-xl truncate'>
								{topGainerAsset?.name}
							</p>
						</div>
					)}

					<div
						className={`flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse ${
							topGainer && topGainer?.profit_loss_percentage < 0
								? 'text-red-500'
								: topGainer && topGainer?.profit_loss_percentage > 0
								? 'text-green-500'
								: ''
						}`}
					>
						<p>
							{topGainer && topGainer?.profit_loss_percentage > 0 && '+'}
							{formatFullPrice(topGainer?.profit_loss)}
						</p>
					</div>
				</div>
			) : (
				<p>-</p>
			)}
		</InfoCard>
	);
}
