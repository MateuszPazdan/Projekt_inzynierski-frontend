import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import CurrentBalance from './CurrentBalance';
import PortfolioChange from './PortfolioChange';
import TopGainer from './TopGainer';
import TotalPortfolioChange from './TotalPortfolioChange';

interface PortfolioOverviewProps {
	portfolioDetails?: CryptoPortfolioDetails;
	isLoading?: boolean;
}

export default function PortfolioOverview({
	portfolioDetails,
	isLoading,
}: PortfolioOverviewProps) {
	const topGainerCrypto = portfolioDetails?.watched_cryptos?.reduce(
		(max, curr) =>
			Math.abs(curr.profit_loss_percentage) >
			Math.abs(max.profit_loss_percentage)
				? curr
				: max
	);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
			<CurrentBalance
				balance={portfolioDetails?.total_investment}
				isLoading={isLoading}
			/>
			<PortfolioChange
				profit_loss={portfolioDetails?.profit_loss_24h}
				profit_loss_percentage={portfolioDetails?.percentage_profit_loss_24h}
				isLoading={isLoading}
			/>
			<TotalPortfolioChange
				profit_loss={portfolioDetails?.profit_loss}
				profit_loss_percentage={portfolioDetails?.profit_loss_percentage}
				isLoading={isLoading}
			/>
			<TopGainer
				assetName={topGainerCrypto?.crypto.name}
				amount={topGainerCrypto?.profit_loss}
				percentage={topGainerCrypto?.profit_loss_percentage}
				icon={topGainerCrypto?.crypto.icon}
				isLoading={isLoading}
			/>
		</div>
	);
}
