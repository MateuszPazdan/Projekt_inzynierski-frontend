'use client';

import {
	CryptoPortfolioDetails,
	PortfolioSummary,
} from '@/app/_redux/features/portfiolioApiSlice';
import EmptyList from '../EmptyList';
import InfoCard from '../InfoCard';
import HoldingsChangeChart from './HoldingsChangeChart';
import TotalHoldingsChart from './TotalHoldingsChart';
import PeriodSelect from '../PeriodSelect';
import { useState } from 'react';

interface PortfolioOverviewChartsProps {
	portfolioDetails?: CryptoPortfolioDetails | PortfolioSummary;
	isLoading?: boolean;
}

type PeriodKey = keyof Pick<
	CryptoPortfolioDetails,
	'historical_value_7d' | 'historical_value_1m' | 'historical_value_1y'
>;

const periods = [
	{ value: 'historical_value_7d', label: '1w' },
	{ value: 'historical_value_1m', label: '1m' },
	{ value: 'historical_value_1y', label: '1y' },
];

export default function PortfolioOverviewCharts({
	portfolioDetails,
	isLoading,
}: PortfolioOverviewChartsProps) {
	const [range, setRange] = useState<PeriodKey>('historical_value_1m');

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
				<InfoCard title='Zmiana wartości'>
					<HoldingsChangeChart chartData={portfolioDetails?.[range]} />
					<PeriodSelect
						periods={periods}
						range={range}
						setRange={setRange as (val: string) => void}
					/>
				</InfoCard>
			)}
		</div>
	);
}
