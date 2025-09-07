import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface TopGainerProps {
	amount?: number;
	percentage?: number;
	assetName?: string;
	icon?: string;
	isLoading?: boolean;
}

export default function TopGainer({
	amount,
	percentage,
	assetName,
	icon,
	isLoading,
}: TopGainerProps) {
	return (
		<InfoCard
			title='Największy zysk'
			additionalInfo={<PercentageChange change={percentage} />}
			isLoading={isLoading}
		>
			{amount && assetName ? (
				<div className='grid grid-cols-[1fr_auto] items-center gap-1'>
					<div className='flex flex-row items-center gap-2'>
						{icon ? (
							<Image src={`${icon}`} alt={assetName} width={28} height={28} />
						) : (
							<p
								className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
							>
								{assetName && assetName.trimStart().charAt(0).toUpperCase()}
							</p>
						)}
						<p className='font-medium text-xl truncate'>{assetName}</p>
					</div>

					<div
						className={`flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse ${
							amount < 0 ? 'text-red-500' : amount > 0 ? 'text-green-500' : ''
						}`}
					>
						<p>
							{amount > 0 && '+'}
							{formatFullPrice(amount)}
						</p>
					</div>
				</div>
			) : (
				<p>Brak danych</p>
			)}
		</InfoCard>
	);
}
