import CurrentBalance from '@/app/_components/invest/CurrentBalance';
import HoldingsChangeChart from '@/app/_components/invest/HoldingsChangeChart';
import PortfolioChange from '@/app/_components/invest/PortfolioChange';
import TopGainter from '@/app/_components/invest/TopGainer';
import TotalHoldingsChart from '@/app/_components/invest/TotalHoldingsChart';
import TotalPortfolioChange from '@/app/_components/invest/TotalPortfolioChange';
import SectionHeader from '@/app/_components/SectionHeader';

export default function page() {
	const totalInvestmentAmount = 123456.78;
	const totalInvestmentChange24h = {
		amount: -1234.56,
		percentage: 2.34,
	};
	const totalInvestmentProfitLoss = {
		amount: 56789.01,
		percentage: 4.56,
	};
	const largestInvestmentProfit = {
		amount: 12345.67,
		percentage: 3.21,
		assetName: 'BTC',
		icon: '/bitcoin-logo-svgrepo-com.svg',
	};
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-10'>
			<div>
				<SectionHeader title='Przegląd inwestycji' description='dsadsad' />
			</div>
			<div className='flex flex-col gap-3'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
					<CurrentBalance balance={totalInvestmentAmount} />
					<PortfolioChange investmentChange={totalInvestmentChange24h} />
					<TotalPortfolioChange investmentChange={totalInvestmentProfitLoss} />
					<TopGainter topGainer={largestInvestmentProfit} />
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
					<TotalHoldingsChart />
					<HoldingsChangeChart />
				</div>
			</div>
		</div>
	);
}
