import StockPortfolioHeader from '@/app/_components/invest/stock/StockPortfolioHeader';
import StockPortfolioList from '@/app/_components/invest/stock/StockPortfolioList';
import StockPortfolioSummary from '@/app/_components/invest/stock/StockPortfolioSummary';
import SectionHeader from '@/app/_components/SectionHeader';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-10'>
			<SectionHeader
				title='Inwestycje w akcje'
				description='Śledź swoje inwestycje w akcje.'
			/>
			<StockPortfolioSummary />
			<StockPortfolioHeader />
			<StockPortfolioList />
		</div>
	);
}
