import CurrentStockPortfolioOverview from '@/app/_components/invest/stock/CurrentStockPortfolioOverview';
import CurrentStockPortfolioTransactions from '@/app/_components/invest/stock/CurrentStockPortfolioTransactions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Crypto | Portfolio | Asset Flow',
	description: 'Zarządzaj transakcjami w swoim portfelu.',
};

export default function page({
	params,
}: {
	params: { portfolioId: string; stockSymbol: string };
}) {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-3'>
			<CurrentStockPortfolioOverview
				portfolioId={params.portfolioId}
				stockSymbol={params.stockSymbol}
			/>

			<CurrentStockPortfolioTransactions
				portfolioId={params.portfolioId}
				stockSymbol={params.stockSymbol}
			/>
		</div>
	);
}
