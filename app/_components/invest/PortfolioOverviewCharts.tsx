import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import EmptyList from '../EmptyList';
import InfoCard from '../InfoCard';
import HoldingsChangeChart from './HoldingsChangeChart';
import TotalHoldingsChart from './TotalHoldingsChart';

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

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
			{!portfolioDetails || portfolioDetails.current_value === 0 ? (
				<InfoCard title='Całkowite udziały'>
					<div className='h-[400px] flex items-center justify-center'>
						<EmptyList
							title='Brak danych do wykresu'
							description='Dodaj transakcje do portfolio, aby zobaczyć statystki.'
						/>
					</div>
				</InfoCard>
			) : (
				<TotalHoldingsChart
					cryptosPercentageHoldings={
						portfolioDetails.cryptos_percentage_holdings
					}
				/>
			)}

			{!portfolioDetails || portfolioDetails.total_transactions === 0 ? (
				<InfoCard title='Całkowita zmiana'>
					<div className='h-[400px] flex items-center justify-center'>
						<EmptyList
							title='Brak danych do wykresu'
							description='Dodaj aktywa do portfolio, aby zobaczyć statystki.'
						/>
					</div>
				</InfoCard>
			) : (
				<HoldingsChangeChart chartData={portfolioDetails.historical_value_1m} />
			)}
		</div>
	);
}
