'use client';

import { useRetrieveStockPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import PortfolioOverview from '../PortfolioOverview';
import { notFound } from 'next/navigation';
import PortfolioOverviewCharts from '../PortfolioOverviewCharts';
import PortfolioWatchedList from '../PortfolioWatchedList';

interface CryptoPortfolioDetailsProps {
	portfolioId: string;
}

export default function StockPortfolioDetails({
	portfolioId,
}: CryptoPortfolioDetailsProps) {
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveStockPortfolioDetailsQuery(portfolioId);

	if (!portfolioDetails && !isPortfolioDetailsLoading) return notFound();

	return (
		<>
			<PortfolioOverview
				portfolioDetails={portfolioDetails}
				isLoading={isPortfolioDetailsLoading}
				assetType='stocks'
			/>
			<PortfolioOverviewCharts
				portfolioDetails={portfolioDetails}
				isLoading={isPortfolioDetailsLoading}
			/>
			<PortfolioWatchedList
				portfolioDetails={portfolioDetails}
				isLoading={isPortfolioDetailsLoading}
			/>
		</>
	);
}
