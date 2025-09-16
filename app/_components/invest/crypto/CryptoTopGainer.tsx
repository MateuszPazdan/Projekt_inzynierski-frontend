import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import InfoCard from '../../InfoCard';
import PercentageChange from '../../market/PercentageChange';
import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';

interface CryptoTopGainerProps {
	portfolioDetails?: CryptoPortfolioDetails;
	isLoading?: boolean;
}

export default function CryptoTopGainer({
	portfolioDetails,
	isLoading,
}: CryptoTopGainerProps) {
	if (
		portfolioDetails &&
		portfolioDetails?.watched_cryptos.length === 0 &&
		!isLoading
	)
		return <InfoCard title='Największy zysk' text='-'></InfoCard>;

	const topGainerCrypto = portfolioDetails?.watched_cryptos?.reduce(
		(max, curr) =>
			curr.profit_loss_percentage > max.profit_loss_percentage ? curr : max
	);

	return (
		<InfoCard
			title='Największy zysk'
			additionalInfo={
				<PercentageChange change={topGainerCrypto?.profit_loss_percentage} />
			}
			isLoading={isLoading}
		>
			{portfolioDetails && portfolioDetails.total_transactions !== 0 ? (
				<div className='grid grid-cols-[1fr_auto] items-center gap-1'>
					<div className='flex flex-row items-center gap-2'>
						<Image
							src={`${topGainerCrypto?.crypto.icon}`}
							alt={`${topGainerCrypto?.crypto.name}-icon`}
							width={24}
							height={24}
						/>
						<p className='font-medium text-xl truncate'>
							{topGainerCrypto?.crypto.name}
						</p>
					</div>

					<div
						className={`flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse ${
							topGainerCrypto && topGainerCrypto?.profit_loss < 0
								? 'text-red-500'
								: topGainerCrypto && topGainerCrypto?.profit_loss > 0
								? 'text-green-500'
								: ''
						}`}
					>
						<p>
							{topGainerCrypto && topGainerCrypto?.profit_loss > 0 && '+'}
							{formatFullPrice(topGainerCrypto?.profit_loss)}
						</p>
					</div>
				</div>
			) : (
				<p>-</p>
			)}
		</InfoCard>
	);
}
