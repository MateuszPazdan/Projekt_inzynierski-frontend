'use client';

import { useRetrieveStockPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { notFound } from 'next/navigation';
import PortfolioOverview from '../PortfolioOverview';
import PortfolioOverviewCharts from '../PortfolioOverviewCharts';
import PortfolioWatchedStockList from './PortfolioWatchedStockList';
import { useEffect } from 'react';

interface CryptoPortfolioDetailsProps {
	portfolioId: string;
}

export default function StockPortfolioDetails({
	portfolioId,
}: CryptoPortfolioDetailsProps) {
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveStockPortfolioDetailsQuery(portfolioId);

	useEffect(() => {
		document.title = `${
			portfolioDetails?.title || 'Przegląd portfela'
		} | Asset Flow`;
	}, [portfolioDetails]);

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
			<PortfolioWatchedStockList
				portfolioDetails={portfolioDetails}
				isLoading={isPortfolioDetailsLoading}
			/>
		</>
	);
}
