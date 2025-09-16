import { StockPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../../InfoCard';
import PercentageChange from '../../market/PercentageChange';

interface StockTopGainerProps {
	portfolioDetails?: StockPortfolioDetails;
	isLoading?: boolean;
}

export default function StockTopGainer({
	portfolioDetails,
	isLoading,
}: StockTopGainerProps) {
	if (
		portfolioDetails &&
		portfolioDetails?.watched_stocks.length === 0 &&
		!isLoading
	)
		return <InfoCard title='Największy zysk' text='-'></InfoCard>;

	const topGainerStock = portfolioDetails?.watched_stocks?.reduce((max, curr) =>
		curr.profit_loss_percentage > max.profit_loss_percentage ? curr : max
	);

	return (
		<InfoCard
			title='Największy zysk'
			additionalInfo={
				<PercentageChange change={topGainerStock?.profit_loss_percentage} />
			}
			isLoading={isLoading}
		>
			{portfolioDetails && portfolioDetails.total_transactions !== 0 ? (
				<div className='grid grid-cols-[1fr_auto] items-center gap-1'>
					<div className='flex flex-row items-center gap-2'>
						<p
							className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
						>
							{topGainerStock?.stock.name.trimStart().charAt(0).toUpperCase()}
						</p>
						<p className='font-medium text-xl truncate'>
							{topGainerStock?.stock.name}
						</p>
					</div>

					<div
						className={`flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse ${
							topGainerStock && topGainerStock?.profit_loss < 0
								? 'text-red-500'
								: topGainerStock && topGainerStock?.profit_loss > 0
								? 'text-green-500'
								: ''
						}`}
					>
						<p>
							{topGainerStock && topGainerStock?.profit_loss > 0 && '+'}
							{formatFullPrice(topGainerStock?.profit_loss)}
						</p>
					</div>
				</div>
			) : (
				<p>-</p>
			)}
		</InfoCard>
	);
}
