'use client';

import { useRetrieveCryptoPortfoliosSummaryQuery } from '@/app/_redux/features/portfiolioApiSlice';
import CurrentBalance from '../CurrentBalance';
import PortfolioChange from '../PortfolioChange';
import TotalPortfolioChange from '../TotalPortfolioChange';
import PortfolioOverviewCharts from '../PortfolioOverviewCharts';
import SummaryTopGainer from '../SummaryTopGainer';

export default function CryptoPortfoliosSummary() {
	const { data: portfolioSummary, isLoading: isCryptoPortfolioSummaryLoading } =
		useRetrieveCryptoPortfoliosSummaryQuery();

	return (
		<div className='flex flex-col gap-3'>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
				<CurrentBalance
					balance={portfolioSummary?.current_value}
					isLoading={isCryptoPortfolioSummaryLoading}
				/>
				<PortfolioChange
					profit_loss={portfolioSummary?.total_profit_loss_24h}
					profit_loss_percentage={
						portfolioSummary?.total_percentage_profit_loss_24h
					}
					isLoading={isCryptoPortfolioSummaryLoading}
				/>
				<TotalPortfolioChange
					profit_loss={portfolioSummary?.total_profit_loss}
					profit_loss_percentage={0}
					isLoading={isCryptoPortfolioSummaryLoading}
				/>

				<SummaryTopGainer
					topGainer={portfolioSummary?.top_gainer_24h}
					isLoading={isCryptoPortfolioSummaryLoading}
				/>
			</div>
			<PortfolioOverviewCharts
				isLoading={isCryptoPortfolioSummaryLoading}
				portfolioDetails={portfolioSummary}
			/>
		</div>
	);
}
