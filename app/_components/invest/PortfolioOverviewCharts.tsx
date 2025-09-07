import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import HoldingsChangeChart from './HoldingsChangeChart';
import TotalHoldingsChart from './TotalHoldingsChart';
import InfoCard from '../InfoCard';
import NoData from '../NoData';

interface PortfolioOverviewChartsProps {
	portfolioDetails?: CryptoPortfolioDetails;
	isLoading?: boolean;
}

export default function PortfolioOverviewCharts({
	portfolioDetails,
	isLoading,
}: PortfolioOverviewChartsProps) {
	if (isLoading)
		return (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<InfoCard title='Całkowite udziały'>
					<div className='h-[400px] w-full rounded shimmer' />
				</InfoCard>
				<InfoCard title='Całkowita zmiana'>
					<div className='h-[400px] w-full rounded shimmer' />
				</InfoCard>
			</div>
		);

	if (!portfolioDetails)
		return (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<InfoCard title='Całkowite udziały'>
					<div className='h-[400px] flex items-center justify-center'>
						<NoData message='Brak danych do wykresu' />
					</div>
				</InfoCard>
				<InfoCard title='Całkowita zmiana'>
					<div className='h-[400px] flex items-center justify-center'>
						<NoData message='Brak danych do wykresu' />
					</div>
				</InfoCard>
			</div>
		);

	const sortedWatchedAsset = portfolioDetails?.watched_cryptos
		.slice()
		.sort((a, b) => b.current_value - a.current_value);

	const portfolioTotalValue =
		sortedWatchedAsset?.reduce((sum, curr) => (sum += curr.current_value), 0) ||
		0;

	const chartData = sortedWatchedAsset
		?.filter(asset => asset.current_value > 0)
		.map((asset) => {
			const portfolioPercentage = Number(
				((asset.current_value / portfolioTotalValue) * 100).toFixed(2)
			);
			return {
				...asset,
				portfolio_percentage: portfolioPercentage,
			};
		});

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
			<TotalHoldingsChart chartData={chartData} />
			<HoldingsChangeChart />
		</div>
	);
}
