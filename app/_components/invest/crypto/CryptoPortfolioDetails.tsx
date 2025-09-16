'use client';

import { useRetrieveCryptoPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { notFound } from 'next/navigation';
import PortfolioOverview from '../PortfolioOverview';
import PortfolioOverviewCharts from '../PortfolioOverviewCharts';
import PortfolioWatchedList from './PortfolioWatchedCryptoList';

interface CryptoPortfolioDetailsProps {
	portfolioId: string;
}

export default function CryptoPortfolioDetails({
	portfolioId,
}: CryptoPortfolioDetailsProps) {
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveCryptoPortfolioDetailsQuery(portfolioId);

	if (!portfolioDetails && !isPortfolioDetailsLoading) return notFound();

	return (
		<>
			<PortfolioOverview
				portfolioDetails={portfolioDetails}
				isLoading={isPortfolioDetailsLoading}
				assetType='crypto'
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
