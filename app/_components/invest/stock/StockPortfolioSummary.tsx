'use client';

import { useRetrieveStockPortfoliosSummaryQuery } from '@/app/_redux/features/portfiolioApiSlice';
import CurrentBalance from '../CurrentBalance';
import PortfolioChange from '../PortfolioChange';
import PortfolioOverviewCharts from '../PortfolioOverviewCharts';
import TotalPortfolioChange from '../TotalPortfolioChange';

export default function StockPortfolioSummary() {
	const { data: portfolioSummary, isLoading: isStockPortfolioSummaryLoading } =
		useRetrieveStockPortfoliosSummaryQuery();
	return (
		<div className='flex flex-col gap-3'>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
				<CurrentBalance
					balance={portfolioSummary?.current_value}
					isLoading={isStockPortfolioSummaryLoading}
				/>
				<PortfolioChange
					profit_loss={portfolioSummary?.total_profit_loss_24h}
					profit_loss_percentage={
						portfolioSummary?.total_percentage_profit_loss_24h
					}
					isLoading={isStockPortfolioSummaryLoading}
				/>
				<TotalPortfolioChange
					profit_loss={portfolioSummary?.total_profit_loss}
					profit_loss_percentage={0}
					isLoading={isStockPortfolioSummaryLoading}
				/>
				<TotalPortfolioChange
					profit_loss={portfolioSummary?.total_profit_loss}
					profit_loss_percentage={0}
					isLoading={isStockPortfolioSummaryLoading}
				/>
				{/* <TopGainer
                    portfolioDetails={portfolioSummary}
                    isLoading={isStockPortfolioSummaryLoading}
                /> */}
			</div>
			<PortfolioOverviewCharts
				isLoading={isStockPortfolioSummaryLoading}
				portfolioDetails={portfolioSummary}
			/>
		</div>
	);
}
